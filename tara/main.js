import * as THREE from 'https://unpkg.com/three@0.128/build/three.module.js';
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, .1, 1000)
const renderer = new THREE.WebGLRenderer()

console.log(scene)
console.log(camera)
console.log(renderer)

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0x00FF00})
const mesh = new THREE.Mesh(boxGeometry, material)

console.log(boxGeometry)
console.log(material)
console.log(mesh)

scene.add(mesh)
camera.position.z = 5


function animate()
{
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	mesh.rotation.x += .01
	mesh.rotation.y += .01
}

animate()
















