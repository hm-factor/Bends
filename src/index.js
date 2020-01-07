import "./styles/index.scss";
import * as THREE from 'three';

// let scene, camera, renderer, cube;

// function initialize() {
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera(
//     75, 
//     window.innerWidth / window.innerHeight, 
//     0.1,
//     1000
//   );
//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);
  
//   const geometry = new THREE.BoxBufferGeometry(10, 10, 10, 3, 3, 3);

//   const position = geometry.attributes.position;

//   const vertex = new THREE.Vector3();

//   const skinIndices = [];
//   const skinWeights = [];

//   for (let i = 0; i < position.count; i++) {

//     vertex.fromBufferAttribute(position, i);

//     // compute skinIndex and skinWeight based on some configuration data

//     const y = (vertex.y);

//     const skinIndex = Math.floor(y / 5);
//     const skinWeight = (y % 5) / 5;

//     skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
//     skinWeights.push(1 - skinWeight, skinWeight, 0, 0);

//     // scene.add( geometry );
//   }

//   geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
//   geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

//   // create skinned mesh and skeleton
//   let bones = [];

//   const bone = new THREE.Bone();

//   bones.push(bone)

//   const mesh = new THREE.SkinnedMesh(geometry, material);
//   const skeleton = new THREE.Skeleton(bones);

//   // see example from THREE.Skeleton

//   const rootBone = skeleton.bones[0];
//   mesh.add(rootBone);

//   // bind the skeleton to the mesh

//   mesh.bind(skeleton);

//   // move the bones and manipulate the model

//   // skeleton.bones[0].rotation.x = -0.1;
//   // skeleton.bones[1].rotation.x = 0.2;

//   const material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true, skinning: true } );
//   cube = new THREE.Mesh( geometry, material );
  
//   scene.add( cube );
  
//   camera.position.z = 30;
// }


// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }


// window.addEventListener("resize", onWindowResize, false);
// initialize();
// animate();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
camera.position.set(0.5, 0.7, 0.5);
camera.lookAt(scene.position);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);


let clock = new THREE.Clock();
let time = 0;
document.body.appendChild(renderer.domElement);

let xSize = 3;
let ySize = 3;
let zSize = 3;
let n = xSize * ySize * zSize;

let geometry = new THREE.BufferGeometry();
geometry.dynamic = true;

function mapTo3D(i) {
  let z = Math.floor(i / (xSize * ySize));
  i -= z * xSize * ySize;
  let y = Math.floor(i / xSize);
  let x = i % xSize;
  return { x: x, y: y, z: z };
}

function mapFrom3D(x, y, z) {
  return x + y * xSize + z * xSize * ySize;
}

let positions = [];
for (let i = 0; i < n; i++) {
  let p = mapTo3D(i);
  positions.push((p.x - xSize / 2) / xSize);
  positions.push((p.y - ySize / 2) / ySize);
  positions.push((p.z - zSize / 2) / zSize);
}
let positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
geometry.setAttribute("position", positionAttribute);
let points = new THREE.Points(
  geometry,
  new THREE.PointsMaterial({ size: 0.02 })
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
}
geometry.setIndex(indexPairs);
let lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial());
scene.add(lines);

function render() {
  requestAnimationFrame(render);
  time += clock.getDelta();
  for (let i = 0; i < n; i++) {
    let p = mapTo3D(i);
    let a = p.x + p.y + p.z;
    let b = 0.001 * Math.sin(5 * time + a);
    geometry.attributes.position.array[3 * i + 0] += b;
    geometry.attributes.position.array[3 * i + 1] += b;
    geometry.attributes.position.array[3 * i + 2] += b;
  }
  geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

render();