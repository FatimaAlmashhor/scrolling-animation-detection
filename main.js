import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from 'three/examples/jsm/WebGL'
import * as TWEEN from "@tweenjs/tween.js";
// check if the three.js support the browser 
// if (WEBGL.isWebGLAvailable()) {

//   // Initiate function or other initializations here
//   animate();

// } else {

//   const warning = WEBGL.getWebGLErrorMessage();
//   document.getElementById('container').appendChild(warning);

// }
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('frame'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(60);
camera.position.set(-72, 1, 67)

renderer.render(scene, camera);

// add object 


const boxgeometry = new THREE.BoxGeometry(10, 10, 10);
const boxmaterial = new THREE.MeshBasicMaterial({ color: 0xee5f04 });
const cube = new THREE.Mesh(boxgeometry, boxmaterial);
cube.position.set(0, 0, 2)
scene.add(cube);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const tours = new THREE.Mesh(geometry, material);
tours.position.set(30, 0, 62)
scene.add(tours);

const Spheregeometry = new THREE.SphereGeometry(5, 32, 32);
const Spherematerial = new THREE.MeshBasicMaterial({ color: 0x720e00 });
const sphere = new THREE.Mesh(Spheregeometry, Spherematerial);
sphere.position.set(-10, 0, 90)
scene.add(sphere);

const Cylindergeometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const Cylindermaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cylinder = new THREE.Mesh(Cylindergeometry, Cylindermaterial);
cylinder.position.set(-50, 0, 60)
scene.add(cylinder);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(-20, 10, 10)

const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);

const controls = new OrbitControls(camera, renderer.domElement);
function animate(callback) {
  function loop(time) {
    callback(time);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}
animate((time) => {
  controls.update();
  renderer.render(scene, camera)
  console.log(camera.position.x, camera.position.y, camera.position.z);
  TWEEN.update(time);
})


// when the user is scrolling 
function moveCamera() {
  const current = document.body.getBoundingClientRect().top;
  // tours.rotation.x += current * 0.0001;
  // camera.position.x = current * 0.002;
  // camera.position.z = current * -0.04;
  // camera.position.x = current * 0.02;
}
function onMouseWheel(event) {

  event.preventDefault();
  camera.position.y += event.deltaY * .0003;

  // prevent scrolling beyond a min/max value

  camera.position.clampScalar(0, 10);
}
// document.body.onscroll = moveCamera;
// window.addEventListener('wheel', onMouseWheel, false);
window.addEventListener('resize', onWindowResize, false);
var scrollElements = document.querySelectorAll("section");

let throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
    &&
    elementTop > 70
  );
};

const elementOutofView = (el) => {
  const elementBottom = el.getBoundingClientRect().bottom;
  return (
    elementBottom > (window.innerHeight || document.documentElement.clientHeight) - 120
  );
};
let cameraPositions = [
  {
    x: -72,
    y: 1,
    z: 67,
    shape: tours,
  },

  {
    x: 29,
    y: 1,
    z: 77,
    shape: sphere,
  },
  {
    x: -26,
    y: 3,
    z: 16,
    shape: cube,
  },
  {
    x: -20,
    y: 1,
    z: 104,
    shape: cylinder,
  },
]
const displayScrollElement = (element, index) => {
  element.classList.add("scrolled");
  const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.y };
  new TWEEN.Tween(coords)
    .to({ x: cameraPositions[index].x, y: cameraPositions[index].y, z: cameraPositions[index].z })
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() =>
      camera.position.set(coords.x, coords.y, coords.z),
    )
    .start();
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el, index) => {
    if (elementInView(el)) {
      displayScrollElement(el, index);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}
var timer = 0;
var count = 0;
var scroll = 0;

window.addEventListener("scroll", () => {
  // scrollCount.innerHTML = scroll++;
  throttle(() => {
    handleScrollAnimation();
    // throttleCount.innerHTML = count++;
  }, 0);
});