const updateValues = () => {
  let pageWidth = window.innerWidth
  let textElement = document.querySelector('.font-viewer__text')
  let fontSizeText = getComputedStyle(textElement).fontSize.slice(0, -2)

  document.querySelector('.window').innerText = pageWidth + 'px'
  document.querySelector('.actual').innerText = `${Math.round(
    parseInt(fontSizeText)
  )}px`

  checkFontSize(parseInt(fontSizeText))
}

const checkFontSize = (fontSizeText) => {
  const minVal = parseInt(document.querySelector('.min input').value)
  const maxVal = parseInt(document.querySelector('.max input').value)

  const removeClass = (except) => {
    document.querySelector('.max').classList.remove('highlight')
    document.querySelector('.min').classList.remove('highlight')
    document.querySelector('.ideal').classList.remove('highlight')
    if (except) except.classList.add('highlight')
  }

  if (fontSizeText === maxVal) removeClass(document.querySelector('.max'))
  else if (fontSizeText === minVal) removeClass(document.querySelector('.min'))
  else if (maxVal > fontSizeText > minVal) removeClass(document.querySelector('.ideal'))
  else removeClass(document.querySelector('.ideal'))
}

updateValues()
window.onresize = updateValues
