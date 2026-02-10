import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-background',
  standalone: true,
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private starGeo?: THREE.BufferGeometry;
  private starSpeeds: number[] = [];
  private animationId: number | null = null;
  private readonly starCount = 10000;

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer?.dispose();
    this.starGeo?.dispose();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.camera || !this.renderer) {
      return;
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private initScene(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.containerRef.nativeElement.innerHTML = '';
    this.containerRef.nativeElement.appendChild(this.renderer.domElement);

    const positions: number[] = [];
    this.starSpeeds = [];

    for (let i = 0; i < this.starCount; i += 1) {
      positions.push(
        Math.random() * width - width / 2,
        Math.random() * height - height / 2,
        Math.random() * 1000 - 500
      );
      this.starSpeeds.push(Math.random() * 2 + 0.2);
    }

    this.starGeo = new THREE.BufferGeometry();
    this.starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const sprite = new THREE.TextureLoader().load(
      'https://threejs.org/examples/textures/sprites/disc.png'
    );
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.2,
      map: sprite,
      transparent: true,
      depthWrite: false
    });

    const stars = new THREE.Points(this.starGeo, starMaterial);
    this.scene.add(stars);
  }

  private animate = (): void => {
    if (!this.scene || !this.camera || !this.renderer || !this.starGeo) {
      return;
    }

    const positions = this.starGeo.attributes['position'].array as Float32Array;

    for (let i = 0; i < this.starCount; i += 1) {
      const idx = i * 3;
      positions[idx + 2] += this.starSpeeds[i];

      if (positions[idx + 2] > 5) {
        positions[idx] = Math.random() * 600 - 300;
        positions[idx + 1] = Math.random() * 600 - 300;
        positions[idx + 2] = -1000;
      }
    }

    this.starGeo.attributes['position'].needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };
}
