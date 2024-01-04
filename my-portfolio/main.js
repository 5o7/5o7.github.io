import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
console.log(scene);
console.log(camera);
console.log(renderer);

renderer.setSize(innerWidth, innerHeight)
document.body.appendChild(renderer.domElement)

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0x8000ff}))
scene.add(cube)

const ground = new THREE.Mesh(new THREE.BoxGeometry(10, .2, 10), new THREE.MeshStandardMaterial({color: 0x1aff66}))
scene.add(ground)


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.z = 3
scene.add(light)

camera.position.z = 5
ground.position.y = -2


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}
animate()
