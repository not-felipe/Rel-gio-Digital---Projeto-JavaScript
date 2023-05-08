let hora = document.getElementById('hora')
let minuto = document.getElementById('minuto')
let segundo = document.getElementById('segundo')

let data = document.getElementById('data')
let diaSemana = document.getElementById('diaSemana')

let dataHora = new Date()

function moveRelogio() {
  let momentoAtual = new Date()

  let hora = momentoAtual.getHours()
  let minuto = momentoAtual.getMinutes()
  let segundo = momentoAtual.getSeconds()

  let strHora = new String(hora)
  let strMinuto = new String(minuto)
  let strSegundo = new String(segundo)

  if (strSegundo.length == 1) segundo = '0' + segundo
  if (strMinuto.length == 1) minuto = '0' + minuto
  if (strHora.length == 1) hora = '0' + hora

  h.textContent = hora
  m.textContent = minuto
  s.textContent = segundo

  setTimeout('moveRelogio()', 1000) // 1000 milisegundos, ou 1 segundo, atualiza o horario a cada 1 segundo
}

function pegarData() {
  let diaDaSemana = dataHora.getDay()
  let dia = dataHora.getDate()
  let mes = dataHora.getMonth() + 1 // começa no mes 0, portanto soma 1
  let ano = dataHora.getFullYear()

  let strDia = new String(dia)
  let strMes = new String(mes)

  if (strDia.length == 1) dia = '0' + dia
  if (strMes.length == 1) mes = '0' + mes

  switch (diaDaSemana) {
    case 0:
      diaDaSemana = 'DOM'
      break
    case 1:
      diaDaSemana = 'SEG'
      break
    case 2:
      diaDaSemana = 'TER'
      break
    case 3:
      diaDaSemana = 'QUA'
      break
    case 4:
      diaDaSemana = 'QUI'
      break
    case 5:
      diaDaSemana = 'SEX'
      break
    case 6:
      diaDaSemana = 'SÁB'
      break
    default:
      diaDaSemana = 'ERRO'
      break
  }

  let dataAtual = dia + '/' + mes + '/' + ano

  diaSemana.textContent = diaDaSemana
  data.textContent = dataAtual
}

pegarData()

var options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

let teste = new Date()

console.log(teste.toLocaleString('pt-BR'))
console.log(teste.toLocaleString('pt-BR', options))
console.log(teste.toLocaleDateString('pt-BR'))
console.log(teste.toLocaleTimeString('pt-BR'))

function getUserPosition() {
  let url = ''
  navigator.geolocation.getCurrentPosition((pos) => {
    let lat = pos.coords.latitude
    let long = pos.coords.longitude
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=e74ddb605ac7cfa65a8b2354ad623843`
    fetchApi(url)
    console.log(url)
  })
}

function fetchApi(url) {
  let city = document.querySelector('.city')
  let temperature = document.querySelector('#temp')
  let humidity = document.querySelector('#umidade')

  fetch(url)
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      let tempInCelsius = ((5 / 9) * (data.main.temp - 32)).toFixed(1)

      city.textContent = data.name
      temperature.innerHTML = tempInCelsius
      humidity.innerHTML = data.main.humidity
    })
    .catch((err) => {
      city.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`
      temperature.innerHTML = `-`
    })
}

getUserPosition()
