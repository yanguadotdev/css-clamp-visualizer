const updateValues = () => {
  let pageWidth = window.innerWidth
  let textElement = document.querySelector('.font-viewer__text')
  let fontSizeText = getComputedStyle(textElement).fontSize.slice(0, -2)

  document.querySelector('.window').innerText = pageWidth + 'px'
  document.querySelector('.actual').innerText = `${Math.round(parseInt(fontSizeText))}px`

  checkFontSize(parseInt(fontSizeText))
}

const checkFontSize = (fontSizeText) => {
  const minVal = parseInt(document.querySelector('.min').innerText)
  const maxVal = parseInt(document.querySelector('.max').innerText)

  if (fontSizeText === maxVal) {
    document.querySelector('.min').classList.remove('highlight')
    document.querySelector('.ideal').classList.remove('highlight')
    document.querySelector('.max').classList.add('highlight')
  } else if (fontSizeText === minVal) {
    document.querySelector('.max').classList.remove('highlight')
    document.querySelector('.ideal').classList.remove('highlight')
    document.querySelector('.min').classList.add('highlight')
  } else {
    document.querySelector('.max').classList.remove('highlight')
    document.querySelector('.min').classList.remove('highlight')
    document.querySelector('.ideal').classList.add('highlight')
  }
}

updateValues()
window.onresize = updateValues
