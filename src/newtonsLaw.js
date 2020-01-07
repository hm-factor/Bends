import * as Newtons from 'newton';

export default newtonsLaw = (m1, m2, r) => {
  let gravConst = 2;
  let force = (gravConst * m1 * m2)/(r**2);
  return force;
}