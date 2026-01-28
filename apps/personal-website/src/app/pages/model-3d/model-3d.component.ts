import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'psa-model-3d',
  imports: [CardComponent, TranslocoDirective, MatButton, MatSlideToggle, MatSliderModule],
  templateUrl: './model-3d.component.html',
  styleUrl: './model-3d.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Model3DComponent implements OnDestroy {
  transloco = inject(TranslocoService);
  canvas = viewChild<ElementRef>('canvas');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  directionalLight = new THREE.DirectionalLight(0xffffff, 5);
  threeRenderer?: THREE.WebGLRenderer;
  controls?: OrbitControls;
  model?: THREE.Group;
  modelScalars = new Map<string, number>([
    ['hover_bike', 0.0045],
    ['stylized_ww1_plane', 2],
    ['sea_turtle', 1],
  ]);
  mixer?: THREE.AnimationMixer;
  clock = new THREE.Clock();
  loader = new GLTFLoader();

  loading = false;
  rotationSpeed = 0.5;
  modelAnimationEnabled = true;
  credits = signal('');

  constructor() {
    afterNextRender(() => {
      this.threeRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      this.controls = new OrbitControls(this.camera, this.threeRenderer.domElement);
      this.initThree(this.canvas()?.nativeElement);
    });
  }

  ngOnDestroy() {
    this.scene.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      }
    });
    this.threeRenderer?.dispose();
    this.mixer?.stopAllAction();
    this.scene.clear();
  }

  initThree(container: HTMLDivElement) {
    if (!this.threeRenderer) {
      return;
    }
    container.appendChild(this.threeRenderer.domElement);

    const width = container.clientWidth;
    const height = container.clientHeight;
    this.updateSize(width, height);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.directionalLight.position.set(5, 5, 5);

    this.camera.position.set(2, 2, 4);
    this.camera.lookAt(0, 0, 0);

    if (!this.controls) {
      return;
    }
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 10;

    this.loadModel();

    this.threeRenderer.setAnimationLoop(() => this.animate());
  }

  loadModel(name = 'stylized_ww1_plane') {
    if (this.loading) {
      return;
    }
    this.loading = true;
    if (this.model) {
      this.scene.remove(this.model);
    }
    this.loader.setMeshoptDecoder(MeshoptDecoder);
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
      this.credits.set(this.transloco.translate(`MODEL_3D.${name}__credits`));
      this.loading = false;

      this.threeRenderer?.render(this.scene, this.camera);
    });
  }

  updateSize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.threeRenderer?.setSize(width, height);
  }

  animate() {
    const delta = this.clock.getDelta();
    if (this.mixer?.getRoot()) {
      this.mixer.update(delta);
    }
    if (this.model) {
      //* delta to make rotation frame rate independent
      this.model.rotation.y += this.rotationSpeed * delta;
    }
    if (this.controls?.enabled) {
      this.controls.update();
    }

    this.threeRenderer?.render(this.scene, this.camera);
  }

  toggleRotation(e: MatSlideToggleChange) {
    this.rotationSpeed = e.checked ? 0.5 : 0;
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
