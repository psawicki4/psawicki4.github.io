import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { TranslatePipe } from "@ngx-translate/core";
import { CardComponent } from "../../components/card/card.component";
import { IsMobileService } from '../../services/is-mobile.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'psa-home',
  imports: [
    CardComponent,
    MatAnchor,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  isMobileService = inject(IsMobileService);
  canvas = viewChild<ElementRef>('canvas');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  fillLight = new THREE.DirectionalLight(0xffffff, 1);
  backLight = new THREE.DirectionalLight(0xffffff, 1);
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
    this.threeRenderer.shadowMap.enabled = true;
    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.threeRenderer.outputColorSpace = THREE.SRGBColorSpace;
    this.threeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.threeRenderer.toneMappingExposure = 1.0;

    const width = container.clientWidth;
    const height = container.clientHeight;
    this.updateSize(width, height);

    this.directionalLight.position.set(5, 5, 5);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;

    this.fillLight.position.set(-5, 3, -5);
    this.fillLight.castShadow = false

    this.backLight.position.set(0, -5, -5);
    this.backLight.castShadow = false;

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.scene.add(this.fillLight);
    this.scene.add(this.backLight);

    this.loadModel();
    this.camera.position.set(2, 2, 4);
    this.camera.lookAt(0, 0, 0);
    this.threeRenderer.setAnimationLoop(() => this.animate());
  }

  loadModel() {
    this.loader.load(`assets/models/peachy_balloon.glb`, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.setScalar(0.0008);
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


  get isMobile() {
    return this.isMobileService.isMobile();
  }
}
