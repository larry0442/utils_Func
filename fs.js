;(function (doc, win) {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function () {
    let clientWidth = docEl.clientWidth
    const clientHeight = Math.floor(docEl.clientHeight)
    if (!clientWidth) return
    if (clientWidth <= 320) {
      clientWidth = 320
    }
    if (clientHeight === 846 && clientWidth === 412) {
      docEl.style.fontSize = 100 * (clientWidth / 825) + 'px'
    } else if (clientHeight === 640 && clientWidth === 384) {
      docEl.style.fontSize = 100 * (clientWidth / 710) + 'px'
      window.fsW = 710
    } else {
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
      window.fsW = 750
    }
    // 解决部分rem特别大的问题
    const docElFontSize = docEl.style.fontSize.replace(/px/gi, '')
    const computedFontSize = win
      .getComputedStyle(docEl).getPropertyValue('font-size').replace(/px/gi, '')
    docElFontSize !== computedFontSize &&
          (docEl.style.fontSize =
            (Number(docElFontSize) * Number(docElFontSize)) / Number(computedFontSize) + 'px')
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
