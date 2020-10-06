import * as THREE from 'three';

export function sphere() {

  const geometry = new THREE.SphereGeometry(.3, 4, 4);
  const sphereMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff5349, 
    wireframe: true 
  });
  
  let sphere = new THREE.Mesh( geometry, sphereMaterial );
  // if (pos !== { 'x': 0, 'y': 0, 'z': 0 }) {
  //   sphere.position.set(pos)
  // };
  return sphere
};
