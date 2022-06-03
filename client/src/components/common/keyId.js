// creates a randomly generated key for dynamically appended props

module.exports = function keyId () {
  const output = []
  // characters for hex...I was lazy
  const alphas = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'];
  let c = 1;
  while (c <= 6) {
    const r = Math.floor(Math.random() * 16);
    output.push(alphas[r]);
    c += 1;
  }
  return output.join('');
}