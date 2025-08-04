import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, viewChild, effect, inject, signal } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CardComponent } from "../../components/card/card.component";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderModule } from "@angular/material/slider";
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'psa-model-3d',
  imports: [
    CardComponent,
    TranslatePipe,
    MatButton,
    MatSlideToggle,
    MatSliderModule
  ],
  templateUrl: './model-3d.component.html',
  styleUrl: './model-3d.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Model3DComponent implements OnDestroy {

  translate = inject(TranslateService);
  canvas = viewChild<ElementRef>('canvas');
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  threeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  controls = new OrbitControls(this.camera, this.threeRenderer.domElement);
  model?: THREE.Group;
  mixer?: THREE.AnimationMixer; // Mixer do zarządzania animacjami
  clock = new THREE.Clock(); // Zegar do śledzenia czasu
  loader = new GLTFLoader();
  rotationSpeed = 0.01;
  credits: string = '';

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
    // Ustaw pozycję światła kierunkowego
    this.directionalLight.position.set(5, 5, 5);

    this.loadModel();
    this.camera.position.z = 5;
    this.threeRenderer.setAnimationLoop(() => this.animate());
  }

  loadModel(name: string = 'stylized_ww1_plane') {
    if (this.model) {
      this.scene.remove(this.model);
    }
    let scalar = 1;
    switch (name) {
      case 'butterfly':
        this.credits = this.translate.instant('MODEL_3D.butterfly__credits');
        scalar = 0.02;
        break;
      case 'stylized_ww1_plane':
        this.credits = this.translate.instant('MODEL_3D.plane__credits');
        scalar = 2;
        break;
      case "sea_turtle":
        this.credits = this.translate.instant('MODEL_3D.turtle__credits');
        break;
      default:
        this.credits = '';
        scalar = 1;
    }
    this.loader.load(`assets/models/${name}.glb`, (gltf) => {
      this.model = gltf.scene;
      this.model.scale.setScalar(scalar);

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
      this.model.rotation.y += this.rotationSpeed;
    }

    this.threeRenderer.render(this.scene, this.camera);
  }

  toggleRotation(e: MatSlideToggleChange) {
    this.rotationSpeed = e.checked ? 0.01 : 0;
  }
  changeLightIntensity(e: Event) {
    const value = (e.target as HTMLInputElement).valueAsNumber;
    this.directionalLight.intensity = value;
  }
}
