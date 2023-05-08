function switchTheme() {
  let section = document.querySelector('section')
  section.classList.toggle('is-light')
  section.classList.toggle('is-dark')
}
document.getElementById('switchBtn').addEventListener('click', switchTheme)
