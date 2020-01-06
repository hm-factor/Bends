import "./styles/index.scss";
import * as THREE from 'three';

// const testObj = {
//   key1: "hi",
//   key2: {
//     key3: "nope"
//   }
// };

let scene, camera, renderer, cube;

function initialize() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  const geometry = new THREE.BoxGeometry(10,10,10);
  const material = new THREE.MeshBasicMaterial( {color: 0xffffff } );
  cube = new THREE.Mesh( geometry, material );
  cube.rotation.z = Math.PI * .4;
  
  scene.add( cube );
  
  camera.position.z = 30;
}


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


window.addEventListener("resize", onWindowResize, false)
initialize();
animate();

// const greeting = testObj?.key2?.key3 || testObj.key1;
// window.addEventListener("DOMContentLoaded", () => {
//   document.body.classList.add("center");
//   const card = document.createElement("div");
//   card.classList.add("card", "center");
//   document.body.append(card);
// });
