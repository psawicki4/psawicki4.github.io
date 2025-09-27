import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'psa-home-three',
  imports: [],
  templateUrl: './home-three.component.html',
  styleUrl: './home-three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeThreeComponent implements AfterViewInit, OnDestroy {

  canvas = viewChild<ElementRef>('canvas');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  threeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  controls = new OrbitControls(this.camera, this.threeRenderer.domElement);
  model?: THREE.Group;
  mixer?: THREE.AnimationMixer;
  clock = new THREE.Clock();
  loader = new GLTFLoader();

  ngAfterViewInit(): void {
    this.initThree(this.canvas()?.nativeElement);
  }

  ngOnDestroy() {
    this.threeRenderer.dispose();
    this.mixer?.stopAllAction();
  }

  initThree(container: HTMLDivElement) {
    container.appendChild(this.threeRenderer.domElement);

    const width = container.clientWidth;
    const height = container.clientHeight;
    this.updateSize(width, height);
    this.loadModel();

    this.camera.position.set(1, 1, 4);
    this.camera.lookAt(0, 0, 0);

    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 10;

    this.threeRenderer.setAnimationLoop(() => this.animate());
  }

  loadModel() {
    this.loader.setMeshoptDecoder(MeshoptDecoder);
    this.loader.load(`assets/models/stylized_rock.glb`, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.setScalar(0.3);
      this.model.position.y = -1.3;
      this.scene.add(this.model);

      if (gltf.animations?.length) {
        this.mixer = new THREE.AnimationMixer(this.model);
        this.mixer.clipAction(gltf.animations[0]).play();
      }
    });
  }

  updateSize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.threeRenderer.setSize(width, height);
  }

  animate() {
    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }
    if (this.model) {
      this.model.rotation.y += 0.005;
    }
    this.controls.update(); // Update controls for smooth damping
    this.threeRenderer.render(this.scene, this.camera);
  }

}
