// BEM命名规范
// z-button__element--modifier
function _bem(
  prefixName: string,
  blockSuffix: string,
  element: string,
  modifier: string
) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`;
  }
  if (element) {
    prefixName += `__${element}`;
  }
  if (modifier) {
    prefixName += `--${modifier}`;
  }
  return prefixName;
}

function createBEM(prefixName: string) {
  const b = (blockSuffix = "") => _bem(prefixName, blockSuffix, "", "");
  const e = (element = "") =>
    element ? _bem(prefixName, "", element, "") : "";
  const m = (modifier = "") =>
    modifier ? _bem(prefixName, "", "", modifier) : "";

  const be = (blockSuffix = "", element = "") =>
    blockSuffix && element ? _bem(prefixName, blockSuffix, element, "") : "";

  const bm = (blockSuffix = "", modifier = "") =>
    blockSuffix && modifier ? _bem(prefixName, blockSuffix, "", modifier) : "";

  const em = (element = "", modifier = "") =>
    element && modifier ? _bem(prefixName, "", element, modifier) : "";

  const bem = (blockSuffix = "", element = "", modifier = "") =>
    blockSuffix && element && modifier
      ? _bem(prefixName, blockSuffix, element, modifier)
      : "";

  const is = (name: string, state: string | boolean) =>
    state ? `is-${name}` : "";

  return { b, e, m, be, bm, em, bem, is };
}

export function createNamespace(name: string) {
  const prefixName = `z-${name}`;
  return createBEM(prefixName);
}

// const bem = createBEM("button");

// bem.b(); // "button"
// bem.b("group"); // "button-group"
// bem.e("icon"); // "button__icon"
// bem.m("primary"); // "button--primary"
// bem.be("group", "icon"); // "button-group__icon"
// bem.bm("group", "large"); // "button-group--large"
// bem.em("icon", "small"); // "button__icon--small"
// console.log(bem.bem("group", "icon", "small"));
// // "button-group__icon--small"

// console.log(bem.is("checked", true));
