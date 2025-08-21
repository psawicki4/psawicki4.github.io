import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, viewChild, effect, inject, signal } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CardComponent } from "../../components/card/card.component";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderModule } from "@angular/material/slider";

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
  modelScalars = new Map<string, number>([
    ['hover_bike', 0.0045],
    ['stylized_ww1_plane', 2],
    ['sea_turtle', 1]
    ]);
  mixer?: THREE.AnimationMixer;
  clock = new THREE.Clock();
  loader = new GLTFLoader();

  loading = false;
  rotationSpeed = 0.01;
  modelAnimationEnabled = true;
  credits = signal('');

  constructor() {
    effect(() => {
      this.initThree(this.canvas()?.nativeElement);
    });

  }

  ngOnDestroy() {
    this.threeRenderer.dispose();
    this.mixer?.stopAllAction();
  }

  private initThree(container: HTMLDivElement) {
    container.appendChild(this.threeRenderer.domElement);

    const width = container.clientWidth;
    const height = container.clientHeight;
    this.updateSize(width, height);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.directionalLight.position.set(5, 5, 5);

    this.loadModel();
    this.camera.position.z = 5;
    this.threeRenderer.setAnimationLoop(() => this.animate());
  }

  loadModel(name: string = 'stylized_ww1_plane') {
    if (this.loading) {
      return;
    }
    this.loading = true;
    if (this.model) {
      this.scene.remove(this.model);
    }
    this.credits.set(this.translate.instant(`MODEL_3D.${name}__credits`));
    this.loader.load(`assets/models/${name}.glb`, (gltf) => {
      this.model = gltf.scene;
      
      const scalar = this.modelScalars.get(name) || 1;
      this.model.scale.setScalar(scalar);

      this.scene.add(this.model);

      if (gltf.animations?.length) {
        this.mixer = new THREE.AnimationMixer(this.model);
        this.mixer.clipAction(gltf.animations[0]).play();
        this.mixer.timeScale = this.modelAnimationEnabled ? 1 : 0;
      }
      this.loading = false;
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

  toggleModelAnimation(e: MatSlideToggleChange) {
    this.modelAnimationEnabled = e.checked;
    if (this.mixer) {
      this.mixer.timeScale = e.checked ? 1 : 0;
    }
  }
}
