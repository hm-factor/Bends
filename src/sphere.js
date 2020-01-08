import * as THREE from 'three';

const geometry = new THREE.SphereGeometry(.15, 4, 4);
export const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff5349, wireframe: true });
export const sphere = new THREE.Mesh( geometry, sphereMaterial);

export const spherePos = {};
spherePos['x'] = (sphere.position.x);
spherePos['y'] = (sphere.position.y);
spherePos['z'] = (sphere.position.z);
