import "./styles/index.scss";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { sphere, spherePos } from './sphere';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.set(5.0, 5.0, 10.0);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const xSize = 4;
const ySize = 4;
const zSize = 4;
const n = xSize * ySize * zSize;

let geometry = new THREE.BufferGeometry();

function mapTo3D(i) {
  let z = Math.floor(i / (xSize * ySize));
  i -= z * xSize * ySize;
  let y = Math.floor(i / xSize);
  let x = i % xSize;
  return { x: x, y: y, z: z };
}

// inverse of mapTo3D
function mapFrom3D(x, y, z) {
  return x + y * xSize + z * xSize * ySize;
}

let firstTime = true;

function animateSpace(pos = spherePos) {
  let positions = [];
  for (let i = 0; i < n; i++) {
    let p = mapTo3D(i);

    let newPosX = ( ((p.x - (xSize-1) / 2) / xSize));
    let newPosY = ( ((p.y - (ySize-1) / 2) / ySize));
    let newPosZ = ( ((p.z - (zSize-1) / 2) / zSize));
    
    let bend = 10*(((newPosX - pos.x)**2 + (newPosY - pos.y)**2 + (newPosZ - pos.z)**2)**(1/2));
    bend = Math.min(bend, 10);
    positions.push(...[bend*newPosX, bend*newPosY, bend*newPosZ]);
  }

  let posAttribute = new THREE.Float32BufferAttribute(positions, 3, true);
  geometry.setAttribute("position", posAttribute);

  let points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ size: 0.2, color: 0x3398ff })
  );
  scene.add(points);

  let indexPairs = [];
  for (let i = 0; i < n; i++) {
    let p = mapTo3D(i);
    if (p.x + 1 < xSize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x + 1, p.y, p.z));
    }
    if (p.y + 1 < ySize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x, p.y + 1, p.z));
    }
    if (p.z + 1 < zSize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x, p.y, p.z + 1));
    }
  };
  geometry.setIndex(indexPairs);

  let opaqueness;

  if (firstTime) {
    opaqueness = 0.5;
  } else {
    opaqueness = 0;
  };

  firstTime= false;

  const lineMats = new THREE.LineBasicMaterial({
    transparent: true,
    opacity: opaqueness,
    color: 0x3398ff
  });

  const lines = new THREE.LineSegments(geometry, lineMats);
  scene.add(lines);
}

scene.add(sphere);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const objectArr = [];
objectArr.push(sphere);

// let orbits = new OrbitControls(camera, renderer.domElement);

let drags = new DragControls(objectArr, camera, renderer.domElement);

drags.addEventListener('dragstart', function (e) {
});

drags.addEventListener('dragend', function (e) {
  let { x,y,z } = e.object.position;
  render({x, y, z});
});

renderer.domElement.addEventListener("mousemove", function(e) {
  renderer.render(scene, camera);
});

function render(newPos = spherePos) {
  animateSpace(newPos);
  renderer.render(scene, camera);
}

render();
window.addEventListener("resize", onWindowResize, false);