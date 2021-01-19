export default newtonsLaw = (m1, m2, r, g) => {
  let force = (g * m1 * m2)/(r**2);
  return force;
}