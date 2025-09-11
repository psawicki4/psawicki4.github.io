import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, viewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'psa-home-three',
  imports: [],
  templateUrl: './home-three.component.html',
  styleUrl: './home-three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeThreeComponent implements OnInit, OnDestroy {

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

  ngOnInit(): void {
    this.initThree(this.canvas()?.nativeElement);
  }

  ngOnDestroy() {
    this.threeRenderer.dispose();
    this.mixer?.stopAllAction();
  }

  initThree(container: HTMLDivElement) {
    container.appendChild(this.threeRenderer.domElement);
    this.threeRenderer.shadowMap.enabled = true;
    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.threeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.threeRenderer.toneMappingExposure = 1.2;

    const width = container.clientWidth;
    const height = container.clientHeight;
    this.updateSize(width, height);

    this.initLights();
    this.loadModel();

    this.camera.position.set(2, 2, 4);
    this.camera.lookAt(0, 0, 0);
    this.threeRenderer.setAnimationLoop(() => this.animate());
  }

  initLights() {
    let ambientLight = new THREE.AmbientLight(0xfff4e6, 0.25);
    let directionalLight = new THREE.DirectionalLight(0xfff0dd, 2);
    let fillLight = new THREE.DirectionalLight(0xdde9ff, 0.5);
    let backLight = new THREE.DirectionalLight(0xffffff, 0.5);

    directionalLight.position.set(5, 6, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0005;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;

    fillLight.position.set(-4, 3, -4);
    backLight.position.set(0, 3, -5);

    // Tighten the orthographic shadow camera frustum
    const shadowCam = directionalLight.shadow.camera as THREE.OrthographicCamera;
    shadowCam.left = -2;
    shadowCam.right = 2;
    shadowCam.top = 2;
    shadowCam.bottom = -2;
    shadowCam.updateProjectionMatrix();

    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
    this.scene.add(fillLight);
    this.scene.add(backLight);
  }

  loadModel() {
    this.loader.load(`assets/models/stylized_hand_painted_scene.glb`, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.setScalar(0.015);
      this.model.position.y = -0.3;
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

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
      this.model.rotation.y += 0.001;
    }
    this.threeRenderer.render(this.scene, this.camera);
  }

}
