import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

let scene, camera, renderer, stars, starGeo;
let wdth = window.innerWidth;
let hght = window.innerHeight;

const starCount = 10000;
let starSpeeds = [];

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, wdth / hght, 0.1, 2000);
  camera.position.z = 5; // Caméra proche

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(wdth, hght);
  document.getElementById('background').appendChild(renderer.domElement);

  const positions = [];
  for (let i = 0; i < starCount; i++) {
    positions.push(
    Math.random() * wdth- wdth / 2    ,//- wdth / 2   
    Math.random() * hght - hght / 2,   //- hght / 2
    Math.random() * 1000-500 //2000-1000
  );
    starSpeeds.push(Math.random() * 2 + 0.2); // vitesse de base
  }

  starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    map: sprite,
    transparent: true,
    depthWrite: false
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  animate();
};

const animate = () => {
  const positions = starGeo.attributes.position.array;

  for (let i = 0; i < starCount; i++) {
    let idx = i * 3;
    positions[idx + 2] += starSpeeds[i];

    if (positions[idx + 2] > 5) { 
      positions[idx] = Math.random() * 600 - 300;
      positions[idx + 1] = Math.random() * 600 - 300;
      positions[idx + 2] = -1000; 
    }
  }

  starGeo.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

init();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    let wdth = window.innerWidth;
    let hght = window.innerHeight;
    camera.aspect = wdth / hght;
    camera.updateProjectionMatrix();

    renderer.setSize(wdth, hght);
}
