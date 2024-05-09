import * as THREE from 'https://unpkg.com/three@0.128/build/three.module.js';
import gsap from 'gsap'
// import {OrbitControls} from 'https://unpkg.com/three@0.128/examples/jsm/controls/OrbitControls.js';

const raycaster = new THREE.Raycaster()
const scene = new THREE.Scene()
const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, .1, 1000)
camera.position.z = 5

// new OrbitControls(camera, renderer.domElement)
console.log(scene)
console.log(camera)
console.log(renderer)
console.log(raycaster)
console.log(gsap)
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const bgMat = new THREE.MeshPhongMaterial({side: THREE.DoubleSide})
const materialA = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const materialB = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const materialC = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const greenMat = new THREE.MeshPhongMaterial({color: 0x00ff00})

bgMat.flatShading = true
bgMat.vertexColors = true

const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 1, 1), bgMat)
scene.add(bgMesh)

// Add a blue color to the bgMesh

const colors = []
for (let i = 0; i < bgMesh.geometry.attributes.position.count; i++)
{
	colors.push(.1, .1, .1)
}
bgMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))


const greenGeo = new THREE.PlaneGeometry(5, 5, 1, 1)
const greenMesh = new THREE.Mesh(greenGeo, greenMat)
scene.add(greenMesh)

// Create a cubes

const geometryA = new THREE.BoxGeometry();
const cubeA = new THREE.Mesh(geometryA, materialA);
cubeA.scale.set(0.1, 0.1, 0.1);
scene.add(cubeA);

const geometryB = new THREE.BoxGeometry();
const cubeB = new THREE.Mesh(geometryB, materialB);
cubeB.scale.set(0.1, 0.1, 0.1);
scene.add(cubeB);

const geometryC = new THREE.BoxGeometry();
const cubeC = new THREE.Mesh(geometryC, materialC);
cubeC.scale.set(0.1, 0.1, 0.1);
scene.add(cubeC);



// add three axes

const line1points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 2.3092, 0)];
const line1curve = new THREE.CatmullRomCurve3(line1points);
const line1Geo = new THREE.TubeGeometry(line1curve, 24, 0.01, 8, false);
const line1Mesh = new THREE.Mesh(line1Geo, materialA);
scene.add(line1Mesh);
const line2points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-2, -1.1548, 0)];
const line2curve = new THREE.CatmullRomCurve3(line2points);
const line2Geo = new THREE.TubeGeometry(line2curve, 24, 0.01, 8, false);
const line2Mesh = new THREE.Mesh(line2Geo, materialC);
scene.add(line2Mesh);
const line3points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, -1.1548, 0)];
const line3curve = new THREE.CatmullRomCurve3(line3points);
const line3Geo = new THREE.TubeGeometry(line3curve, 24, 0.01, 8, false);
const line3Mesh = new THREE.Mesh(line3Geo, materialB);
scene.add(line3Mesh);

const reds = bgMesh.geometry.attributes.position.array
const greens = greenMesh.geometry.attributes.position.array

// Set max points

// greens[0] = 0
// greens[1] = 2.3092
// greens[2] = 0

// greens[3] = 0
// greens[4] = 2.3092
// greens[5] = 0

// greens[6] = -2
// greens[7] = -1.1548
// greens[8] = 0

// greens[9] = 2
// greens[10] = -1.1548
// greens[11] = 0

// Set min points

greens[0] = 0
greens[1] = 0
greens[2] = 0

greens[3] = 0
greens[4] = 0
greens[5] = 0

greens[6] = 0
greens[7] = 0
greens[8] = 0

greens[9] = 0
greens[10] = 0
greens[11] = 0

// Set max points

reds[0] = 0
reds[1] = 2.3092
reds[2] = -.1

reds[3] = 0
reds[4] = 2.3092
reds[5] = -.1

reds[6] = -2
reds[7] = -1.1548
reds[8] = -.1

reds[9] = 2
reds[10] = -1.1548
reds[11] = -.1 

console.log(reds)

for (let i = 0; i < reds.Length; i += 3)
{
	const x = reds[i]
	const y = reds[i + 1]
	const z = reds[i + 2]
}

// Add a white triangleh path

// const path = new THREE.Path();
// path.lineTo(0, .001);
// path.lineTo(0, 0);
// path.lineTo(0, .001);
// const points = path.getPoints();

// const graphGeo = new THREE.BufferGeometry().setFromPoints(points);
// const graphMat = new THREE.LineBasicMaterial({color: 0xffffff});
// const graph = new THREE.Line(graphGeo, graphMat);
// scene.add(graph);

// const graphVerts = graph.geometry.attributes.position.array
// graphVerts[1] = 1  // top y
// graphVerts[3] = 1  // right x
// graphVerts[4] = -1 // right y
// graphVerts[6] = -1 // left x
// graphVerts[7] = -1 // left y
// graphVerts[9] = 0  // top x
// graphVerts[10] = 1 // top y
// console.log(graphVerts)

bgMesh.position.y = -2.025
line1Mesh.position.y = -2
line2Mesh.position.y = -2
line3Mesh.position.y = -2
// graph.position.y = -2
cubeA.position.y = -2
cubeB.position.y = -2
cubeC.position.y = -2

var num = 0

// Function to remove the cube from the scene
function moveBoxA1() {
	num += 1
	console.log(num)
	if (num < 6)
	{
		cubeA.position.y += .092368;
	}
	if (num >= 6 && num <= 9)
	{
		cubeB.position.x += 2 / 5 / 4;
		cubeB.position.y -= 1.1548 / 5 / 4;
	}
	if (num > 9 && num < 16)
	{
		cubeC.position.x -= 2 / 5 / 6;
		cubeC.position.y -= 1.1548 / 5 / 6;
	}
	if (num == 15)
	{
		bgMesh.position.y += 2.025
		line1Mesh.position.y += 2
		line2Mesh.position.y += 2
		line3Mesh.position.y += 2
		cubeA.position.y += 2
		cubeB.position.y += 2
		cubeC.position.y += 2
	}
}

function moveBoxA2() {
	num += 1
	console.log(num)
	if (num < 6)
	{
		cubeA.position.y += .092368 * 2;
	}
	if (num >= 6 && num <= 9)
	{
		cubeB.position.x += (2 / 5 / 4) * 2;
		cubeB.position.y -= (1.1548 / 5 / 4) * 2;
	}
	if (num > 9 && num < 16)
	{
		cubeC.position.x -= (2 / 5 / 6) * 2;
		cubeC.position.y -= (1.1548 / 5 / 6) * 2;
	}
	if (num == 15)
	{
		bgMesh.position.y += 2.025
		line1Mesh.position.y += 2
		line2Mesh.position.y += 2
		line3Mesh.position.y += 2
		cubeA.position.y += 2
		cubeB.position.y += 2
		cubeC.position.y += 2
	}
}

function moveBoxA3() {
	num += 1
	console.log(num)
	if (num < 6)
	{
		cubeA.position.y += .092368 * 3;
	}
	if (num >= 6 && num <= 9)
	{
		cubeB.position.x += (2 / 5 / 4) * 3;
		cubeB.position.y -= (1.1548 / 5 / 4) * 3;
	}
	if (num > 9 && num < 16)
	{
		cubeC.position.x -= (2 / 5 / 6) * 3;
		cubeC.position.y -= (1.1548 / 5 / 6) * 3;
	}
	if (num == 15)
	{
		bgMesh.position.y += 2.025
		line1Mesh.position.y += 2
		line2Mesh.position.y += 2
		line3Mesh.position.y += 2
		cubeA.position.y += 2
		cubeB.position.y += 2
		cubeC.position.y += 2
	}
}

function moveBoxA4() {
	num += 1
	console.log(num)
	if (num < 6)
	{
		cubeA.position.y += .092368 * 4;
	}
	if (num >= 6 && num <= 9)
	{
		cubeB.position.x += (2 / 5 / 4) * 4;
		cubeB.position.y -= (1.1548 / 5 / 4) * 4;
	}
	if (num > 9 && num < 16)
	{
		cubeC.position.x -= (2 / 5 / 6) * 4;
		cubeC.position.y -= (1.1548 / 5 / 6) * 4;
	}
	if (num == 15)
	{
		bgMesh.position.y += 2.025
		line1Mesh.position.y += 2
		line2Mesh.position.y += 2
		line3Mesh.position.y += 2
		cubeA.position.y += 2
		cubeB.position.y += 2
		cubeC.position.y += 2
	}
}

function moveBoxA5() {
	num += 1
	console.log(num)
	if (num < 6)
	{
		cubeA.position.y += .092368 * 5;
	}
	if (num >= 6 && num <= 9)
	{
		cubeB.position.x += (2 / 5 / 4) * 5;
		cubeB.position.y -= (1.1548 / 5 / 4) * 5;
	}
	if (num > 9 && num < 16)
	{
		cubeC.position.x -= (2 / 5 / 6) * 5;
		cubeC.position.y -= (1.1548 / 5 / 6) * 5;
	}
	if (num == 15)
	{
		bgMesh.position.y += 2.025
		line1Mesh.position.y += 2
		line2Mesh.position.y += 2
		line3Mesh.position.y += 2
		cubeA.position.y += 2
		cubeB.position.y += 2
		cubeC.position.y += 2
	}
}


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)
scene.add(light)

const mouse = {x: undefined, y: undefined}

function animate()
{
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObject(bgMesh)
	// if (intersects.length > 0)
	// {
	// 	console.log(intersects[0].face)

	// 	const {color} = intersects[0].object.geometry.attributes

	// 	// vert 1

	// 	color.setX(intersects[0].face.a, .1)
	// 	color.setY(intersects[0].face.a, .5)
	// 	color.setZ(intersects[0].face.a, 1)

	// 	// vert 2

	// 	color.setX(intersects[0].face.b, .1)
	// 	color.setY(intersects[0].face.b, .5)
	// 	color.setZ(intersects[0].face.b, 1)

	// 	// vert 3

	// 	color.setX(intersects[0].face.c, .1)
	// 	color.setY(intersects[0].face.c, .5)
	// 	color.setZ(intersects[0].face.c, 1)

	// 	color.needsUpdate = true

	// 	const initialColor = {r: .1, g: .1, b: .1}
	// 	const hoverColor = {r: .2, g: .2, b: .2}

	// 	gsap.to(hoverColor, {
	// 		r: initialColor.r, 
	// 		g: initialColor.g, 
	// 		b: initialColor.b,
	// 		onUpdate: () => {
	// 			// vert 1

	// 			color.setX(intersects[0].face.a, hoverColor.r)
	// 			color.setY(intersects[0].face.a, hoverColor.g)
	// 			color.setZ(intersects[0].face.a, hoverColor.b)

	// 			// vert 2

	// 			color.setX(intersects[0].face.b, hoverColor.r)
	// 			color.setY(intersects[0].face.b, hoverColor.g)
	// 			color.setZ(intersects[0].face.b, hoverColor.b)

	// 			// vert 3

	// 			color.setX(intersects[0].face.c, hoverColor.r)
	// 			color.setY(intersects[0].face.c, hoverColor.g)
	// 			color.setZ(intersects[0].face.c, hoverColor.b)
	// 			color.needsUpdate = true
	// 		}
	// 	})
	// }
	// console.log(intersects)
}

animate()

addEventListener('mousemove', (event) =>
{
	mouse.x = (event.clientX/innerWidth) * 2 - 1
	mouse.y = -(event.clientY/innerHeight) * 2 + 1
	// console.log(mouse)
})

// Event listener for the button click
document.getElementById('optionOneButton').addEventListener('click', moveBoxA1);
document.getElementById('optionTwoButton').addEventListener('click', moveBoxA2);
document.getElementById('optionThreeButton').addEventListener('click', moveBoxA3);
document.getElementById('optionFourButton').addEventListener('click', moveBoxA4);
document.getElementById('optionFiveButton').addEventListener('click', moveBoxA5);






