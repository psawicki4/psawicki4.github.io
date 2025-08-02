import { ChangeDetectionStrategy, Component, ElementRef, AfterViewInit, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

@Component({
  selector: 'psa-model-3d',
  imports: [],
  templateUrl: './model-3d.component.html',
  styleUrl: './model-3d.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Model3DComponent implements AfterViewInit, OnDestroy {
  threeCanvas = viewChild<ElementRef<HTMLDivElement>>('threeCanvas');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  // Dodaj oświetlenie
  private ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Światło otoczenia
  private directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Światło kierunkowe
  threeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  controls = new OrbitControls(this.camera, this.threeRenderer.domElement);
  private resizeObserver?: ResizeObserver;
  private model?: THREE.Group;
  private mixer?: THREE.AnimationMixer; // Mixer do zarządzania animacjami
  private clock = new THREE.Clock(); // Zegar do śledzenia czasu

  loader = new GLTFLoader();

  ngAfterViewInit() {
    this.initThree();
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    this.threeRenderer.dispose();
    this.mixer?.stopAllAction(); // Zatrzymaj wszystkie animacje
  }

  private initThree() {
    const container = this.threeCanvas()?.nativeElement;
    if (!container) return;

    // Dodaj renderer do kontenera
    container.appendChild(this.threeRenderer.domElement);

    // Ustaw rozmiar na podstawie kontenera
    this.updateSize();

    // Dodaj oświetlenie do sceny
    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    // Ustaw pozycję światła kierunkowego
    this.directionalLight.position.set(5, 5, 5);
    this.directionalLight.castShadow = true;

    // Włącz cienie w rendererze
    this.threeRenderer.shadowMap.enabled = true;
    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Dodaj obiekty do sceny
    this.loader.load('assets/models/bird_orange/scene.gltf', (gltf) => {
      this.model = gltf.scene;

      // Włącz renderowanie cieni dla wszystkich materiałów
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.scene.add(this.model);

      // Utwórz mixer dla animacji
      if (gltf.animations && gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.model);

        // Odtwórz pierwszą animację
        const action = this.mixer.clipAction(gltf.animations[0]);
        action.play();
      }
    });
    this.camera.position.z = 5;

    // Rozpocznij animację
    this.threeRenderer.setAnimationLoop(() => this.animate());
  }

  private updateSize() {
    const container = this.threeCanvas()?.nativeElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.threeRenderer.setSize(width, height);
  }

  private setupResizeObserver() {
    const container = this.threeCanvas()?.nativeElement;
    if (!container) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.updateSize();
    });

    this.resizeObserver.observe(container);
  }

  animate() {
    // Aktualizuj animacje
    if (this.mixer) {
      const delta = this.clock.getDelta();
      this.mixer.update(delta);
    }
    if (this.model) {
      this.model.rotation.y += 0.01; // Obracaj wokół osi Y
    }

    this.threeRenderer.render(this.scene, this.camera);
  }
}
