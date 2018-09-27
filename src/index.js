function mass(bracketsConfig) {
  const open = [];
  const close = [];
  const dict = {};
  for (let s = 0; s < bracketsConfig.length; s++)  {
    const o = bracketsConfig[s][0];
    const c = bracketsConfig[s][1];
    open.push(o);
    close.push(c);
    dict[c] = o;
  }
  return {open, close, dict};
}

module.exports = function check(str, bracketsConfig) {
  const brackets = mass(bracketsConfig);
  const open = brackets.open;
  const close = brackets.close;
  const dict = brackets.dict;
  const steak = [];
  for (let i = 0; i < str.length; i++) {
    const el = str[i];
    const inOpen = open.indexOf(el) + 1;
    const inClose = close.indexOf(el) + 1;
    const lastSteakId = steak.length - 1;
    if (inOpen && !inClose) {
      steak.push(el);
    } else if (inOpen && (el !== steak[lastSteakId])) {
      steak.push(el);
    } else if (steak.pop() !== dict[el]) {
      return false;
    }
  }
  return steak.length === 0
}
