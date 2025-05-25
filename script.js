import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log("THREE version:", THREE.REVISION);



// === Scene Setup ===
const scene = new THREE.Scene();

// === Camera ===
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// === Renderer ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === OrbitControls (NOW camera and renderer are defined) ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// === Lighting ===
const light = new THREE.PointLight(0xffffff, 40);
light.position.set(5, 5, 5);
scene.add(light);

// === Capsule Geometry ===
const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30); // (radius, length, capSeg, radialSeg)
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xfa8072 }); // salmon color for meat vibes
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
scene.add(capsule);

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);
  capsule.rotation.x += 0.01;
  capsule.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
}
animate();

// === Responsive Resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
