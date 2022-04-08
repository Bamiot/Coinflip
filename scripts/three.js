import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js'

// renderer
const renderer = new THREE.WebGLRenderer({
  // antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// scene
const scene = new THREE.Scene()

// axis
scene.add(new THREE.AxesHelper(100))

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
)
camera.position.z = 1500

// coin
const coinGeometry = new THREE.CylinderGeometry(100, 100, 0.1, 50, 5, false)
const coinMaterial = new THREE.MeshNormalMaterial()
const coinMesh = new THREE.Mesh(coinGeometry, coinMaterial)
coinMesh.overdraw = true
coinMesh.position.y = 0
scene.add(coinMesh)

/* orbital controls */
const controls = new OrbitControls(camera, renderer.domElement)
// inertie
controls.enableDamping = true
controls.dampingFactor = 0.25
// autorotation
controls.autoRotate = true
controls.autoRotateSpeed = 5
// zoom
controls.enableZoom = true
controls.minDistance = 500
controls.maxDistance = 1500
// constrain camera
const polarAngle = Math.PI / 3
controls.minPolarAngle = polarAngle
controls.maxPolarAngle = polarAngle

const g = 9.8
const V0 = 100
const winner = getTrueRandomInt()

let i = 0
function animate() {
  controls.update()
  // camera.lookAt(coinMesh.position)

  // update
  let angleChange = Math.PI / 16

  if (i < 16 * 7) {
    const t = i * 0.2
    coinMesh.rotation.x += angleChange
    coinMesh.position.y = V0 * t - (g * t * t) / 2
    i++
  }
  renderer.render(scene, camera) // render
  requestAnimationFrame(animate) // request new frame
}
renderer.render(scene, camera)
animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
