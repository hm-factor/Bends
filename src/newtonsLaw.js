export default newtonsLaw = (m1, m2, r) => {
  let gravConst = 1;
  let force = (gravConst * m1 * m2)/(r**2);
  return force;
}