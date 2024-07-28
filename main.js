const $textElement = document.querySelector('.font-viewer__text')
const $max = document.querySelector('.max')
const $min = document.querySelector('.min')
const $ideal = document.querySelector('.ideal')
const $minInput = document.querySelector('.min input')
const $maxInput = document.querySelector('.max input')
const $idealInput = document.querySelector('.ideal input')
const $outputCode = document.querySelector('.output-code')
const $btnCopy = document.querySelector('.js-button-copy')
let cssFunctionCode =
  $textElement.parentElement.style.getPropertyValue('--font-size')

// funcion que se ejecutara al terminar de cargar el DOM
// para agregar una aniamcion y destacar los inputs que se pueden editar
window.addEventListener('DOMContentLoaded', () => {
  $min.classList.add('animation')
  $ideal.classList.add('animation')
  $max.classList.add('animation')
  setTimeout(() => {
    $min.classList.remove('animation')
    $ideal.classList.remove('animation')
    $max.classList.remove('animation')
  }, 2000)
})

const updateValues = () => {
  let pageWidth = window.innerWidth
  let fontSizeText = getComputedStyle($textElement).fontSize.slice(0, -2)

  document.querySelector('.window').innerText = pageWidth + 'px'
  document.querySelector('.actual').innerText = `${Math.round(
    parseInt(fontSizeText)
  )}px`

  checkFontSize(parseInt(fontSizeText))
}

const checkFontSize = (fontSizeText) => {
  const minVal = parseInt($minInput.value)
  const maxVal = parseInt($maxInput.value)

  const removeClass = (except) => {
    $max.classList.remove('highlight')
    $min.classList.remove('highlight')
    $ideal.classList.remove('highlight')
    if (except) except.classList.add('highlight')
  }

  if (fontSizeText === maxVal) removeClass($max)
  else if (fontSizeText === minVal) removeClass($min)
  else removeClass($ideal)
}

function showCopyAnimation() {
  $outputCode.classList.add('is-copied')
  setTimeout(() => {
    $outputCode.classList.remove('is-copied')
  }, 500)
}

function handleButtonClick() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`font-size: ${cssFunctionCode};`).then(() => {
      showCopyAnimation()
    })
  } else {
    // Provide an alternative method for copying if Clipboard API is not supported
    const textArea = document.createElement('textarea')
    textArea.value = `font-size: ${cssFunctionCode};`
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      showCopyAnimation()
    } catch (err) {
      alert('Clipboard API not supported')
    }
    document.body.removeChild(textArea)
  }
}

function limitNumbers() {
  this.value = this.value.slice(0, 3)
}

function onInput(inputElement) {
  limitNumbers.call(inputElement)
  cssFunctionCode = `clamp(${$minInput.value}px, ${$idealInput.value}vw, ${$maxInput.value}px)`
  $textElement.parentElement.style.setProperty('--font-size', cssFunctionCode)
  updateValues()
}

updateValues()

// EVENTS
window.onresize = updateValues

$minInput.oninput = function () {
  onInput(this)
}
$maxInput.oninput = function () {
  onInput(this)
}
$idealInput.oninput = function () {
  onInput(this)
}

$btnCopy.onclick = handleButtonClick
