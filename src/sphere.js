import * as THREE from 'three';

const geometry = new THREE.SphereGeometry(.3, 4, 4);
export const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff5349, wireframe: true });
export const sphere = new THREE.Mesh( geometry, sphereMaterial);

export const spherePos = {
  'x': sphere.position.x,
  'y': sphere.position.y,
  'z': sphere.position.z
};
