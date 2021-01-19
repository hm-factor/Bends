function law (m1, m2, r, g) {
  let force = (g * m1 * m2)/(r);
  return force;
}

export default law;