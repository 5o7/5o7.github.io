import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import * as dat from 'dat.gui'
import gsap from'gsap'

console.log(gsap)
const gui = new dat.GUI()
const world = {plane: {width: 19, height: 19, widthSegments: 17, heightSegments: 17}}

gui.add(world.plane, 'width', 1, 20).onChange(generatePlane)
gui.add(world.plane, 'height', 1, 20).onChange(generatePlane)
gui.add(world.plane, 'widthSegments', 1, 100).onChange(generatePlane)
gui.add(world.plane, 'heightSegments', 1, 100).onChange(generatePlane)

function generatePlane()
{
	planeMesh.geometry.dispose()
	planeMesh.geometry = new THREE.PlaneGeometry(
		world.plane.width, 
		world.plane.height, 
		world.plane.widthSegments, 
		world.plane.heightSegments)

	const {array} = planeMesh.geometry.attributes.position

	for (let i = 0; i < array.length; i += 3)
	{
		const x = array[i]
		const y = array[i + 1]
		const z = array[i + 2]

		array[i + 2] = z + Math.random()
	}

	const colors = []

	for (let i = 0; i < planeMesh.geometry.attributes.position.count; i ++)
	{
		colors.push(0, .19, .4)
	}

	planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

}

const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const planeGeometry = new THREE.PlaneGeometry(
	world.plane.width, 
	world.plane.height, 
	world.plane.widthSegments, 
	world.plane.heightSegments
	)
const material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, flatShading: THREE.FlatShading, vertexColors: true})
const planeMesh = new THREE.Mesh(planeGeometry, material)
scene.add(planeMesh)
const raycaster = new THREE.Raycaster()
const camera = new THREE.PerspectiveCamera(150, innerWidth / innerHeight, .1, 1000)
camera.position.z = 5
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 1, 1)
scene.add(light)

// vertice position randomization

const {array} = planeMesh.geometry.attributes.position
const randomValues = []

for (let i = 0; i < array.length; i++)
{
	if (i % 3 === 0)
	{
		const x = array[i]
		const y = array[i + 1]
		const z = array[i + 2]

		array[i] = x + (Math.random() - .5)
		array[i + 1] = y + (Math.random() - .5)
		array[i + 2] = z + (Math.random() -.5)
	}
	
	randomValues.push(Math.random() - .5)
}

planeMesh.geometry.attributes.position.randomValues = randomValues

planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array


// Color attribute addition

const colors = []

for (let i = 0; i < planeMesh.geometry.attributes.position.count; i ++)
{
	colors.push(0, .19, .4)
}

planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

const mouse = {x: undefined, y: undefined}

let frame = 0

function animate()
{
	requestAnimationFrame(animate)
	frame += .01
	renderer.render(scene, camera)
	raycaster.setFromCamera(mouse, camera)
	
	const {array, originalPosition, randomValues} = planeMesh.geometry.attributes.position

	for (let i = 0; i < array.length; i += 3)
	{
		// x

		array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * .003

		// y

		array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[ + 1]) * .003
	}

	planeMesh.geometry.attributes.position.needsUpdate = true

	const intersects = raycaster.intersectObject(planeMesh)
	
	if (intersects.length > 0)
	{
		const {color} = intersects[0].object.geometry.attributes
		
		color.setX(intersects[0].face.a, .1)
		color.setY(intersects[0].face.a, .5)
		color.setZ(intersects[0].face.a, 1)

		color.setX(intersects[0].face.b, .1)
		color.setY(intersects[0].face.b, .5)
		color.setZ(intersects[0].face.b, 1)

		color.setX(intersects[0].face.c, .1)
		color.setY(intersects[0].face.c, .5)
		color.setZ(intersects[0].face.c, 1)
		
		color.needsUpdate = true

		const initialColor = {r: 0, g: .19, b:.4}
		const hoverColor = {r: .1, g: .5, b:1}
		
		gsap.to(hoverColor, {
			r: initialColor.r, 
			g: initialColor.g, 
			b: initialColor.b, 
			duration: 1.5,
			onUpdate: () =>
			{
				color.setX(intersects[0].face.a, hoverColor.r)
				color.setY(intersects[0].face.a, hoverColor.g)
				color.setZ(intersects[0].face.a, hoverColor.b)

				color.setX(intersects[0].face.b, hoverColor.r)
				color.setY(intersects[0].face.b, hoverColor.g)
				color.setZ(intersects[0].face.b, hoverColor.b)

				color.setX(intersects[0].face.c, hoverColor.r)
				color.setY(intersects[0].face.c, hoverColor.g)
				color.setZ(intersects[0].face.c, hoverColor.b)

				color.needsUpdate = true
			}})
		
	}
}

animate()

addEventListener('mousemove', () =>
{
	mouse.x = (event.clientX / innerWidth) * 2 - 1
	mouse.y = -(event.clientY / innerHeight) * 2 + 1
})
















