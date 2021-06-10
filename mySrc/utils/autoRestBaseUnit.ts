interface LastHTMLSize {
  offsetHeight: number;
  offsetWidth: number;
}

interface ResetBaseUnit {
  (): void;
}

interface AutoRestBaseUnit {
  start: () => void;
  stop: () => void;
}

let requestID = null;
let html = null;
const lastHTMLSize: LastHTMLSize = {
  offsetHeight: 0,
  offsetWidth: 0,
};

/**
 * 用來監聽螢幕大小來設置基本單位
 * 用於全畫面同比例縮放
 *
 * @function resetBaseUnit
 */
const resetBaseUnit: ResetBaseUnit = () => {
  if (html === null) html = document.querySelector('html');
  const { offsetHeight, offsetWidth } = html;
  if (lastHTMLSize.offsetHeight !== offsetHeight || lastHTMLSize.offsetWidth !== offsetWidth) {
    lastHTMLSize.offsetHeight = offsetHeight;
    lastHTMLSize.offsetWidth = offsetWidth;

    let baseUnit;
    if (offsetWidth > (1280 * offsetHeight) / 720) baseUnit = offsetHeight / 720;
    else baseUnit = offsetWidth / 1280;

    html.style.fontSize = `${baseUnit}px`;
  }
  requestID = window.requestAnimationFrame(resetBaseUnit);
};

const autoRestBaseUnit: AutoRestBaseUnit = {
  start: () => (requestID = window.requestAnimationFrame(resetBaseUnit)),
  stop: () => window.cancelAnimationFrame(requestID),
};

export default autoRestBaseUnit;
