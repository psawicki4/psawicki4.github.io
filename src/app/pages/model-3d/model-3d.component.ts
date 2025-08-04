import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, viewChild, effect, inject } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CardComponent } from "../../components/card/card.component";
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'psa-model-3d',
  imports: [
    CardComponent,
    TranslatePipe,
    MatButton
  ],
  templateUrl: './model-3d.component.html',
  styleUrl: './model-3d.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Model3DComponent implements OnDestroy {

  canvas = viewChild<ElementRef>('canvas');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Światło otoczenia - zwiększone
  directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Światło kierunkowe - zwiększone
  pointLight = new THREE.PointLight(0xffffff, 0.8, 10); // Dodatkowe światło punktowe
  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4); // Światło półkuliste
  threeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  controls = new OrbitControls(this.camera, this.threeRenderer.domElement);
  model?: THREE.Group;
  mixer?: THREE.AnimationMixer; // Mixer do zarządzania animacjami
  clock = new THREE.Clock(); // Zegar do śledzenia czasu
  loader = new GLTFLoader();

  constructor() {
    effect(() => {
      this.initThree(this.canvas()?.nativeElement);
    });

  }

  ngOnDestroy() {
    this.threeRenderer.dispose();
    this.mixer?.stopAllAction(); // Zatrzymaj wszystkie animacje
  }

  private initThree(container: HTMLDivElement) {
    // Dodaj renderer do kontenera
    container.appendChild(this.threeRenderer.domElement);

    // Ustaw rozmiar na podstawie kontenera
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.updateSize(width, height);

    // Dodaj oświetlenie do sceny
    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.scene.add(this.pointLight);
    this.scene.add(this.hemisphereLight);

    // Ustaw pozycję światła kierunkowego
    this.directionalLight.position.set(5, 5, 5);
    this.directionalLight.castShadow = true;

    // Ustaw pozycję światła punktowego
    this.pointLight.position.set(-3, 3, 3);

    // Konfiguracja światła półkulistego
    this.hemisphereLight.position.set(0, 10, 0);

    // Włącz cienie w rendererze
    this.threeRenderer.shadowMap.enabled = true;
    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.loadModel();
    this.camera.position.z = 5;
    this.threeRenderer.setAnimationLoop(() => this.animate());
  }

  loadModel(name: string = 'bird_orange') {
    if (this.model) {
      this.scene.remove(this.model);
    }
    this.loader.load(`assets/models/${name}.glb`, (gltf) => {
      this.model = gltf.scene;

      // Włącz cienie dla wszystkich obiektów w modelu
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
    // Aktualizuj animacje
    if (this.mixer) {
      const delta = this.clock.getDelta();
      this.mixer.update(delta);
    }
    if (this.model) {
      this.model.rotation.y += 0.01;
    }

    this.threeRenderer.render(this.scene, this.camera);
  }
}
