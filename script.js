const optionMinutos = document.getElementById('select-minutos');
const optionsSegundos = document.getElementById('select-segundos');
const buttonIniciar = document.getElementById('button-iniciar-contagem');
const hora = document.getElementById('hora');
const segundo = document.getElementById('segundo');
const body = document.querySelector('body');

let id;
let countButton;
const alarme = new Audio('./public/alarme.mp3');

//Ao carregar a página, todos os options são criados
document.addEventListener('DOMContentLoaded', function () {
  //adiciona todos os options
  createOptions();
});

//Adiciona o evento ao botão
buttonIniciar.addEventListener('click', function (e) {
  const nameButton = e.target.firstChild.data;
  let min = Number(optionMinutos.value);
  let seg = Number(optionsSegundos.value);
  const percent = Math.ceil(((min * 60 + seg) * 0.05).toFixed(0));

  body.style.backgroundColor = 'white';

  //mudar o contexto do botão
  if (nameButton === 'Iniciar') {
    e.target.firstChild.data = 'Parar';
    buttonIniciar.style.backgroundColor = 'tomato';
    countButton = 0;
  } else {
    buttonIniciar.style.color = 'white';
    e.target.firstChild.data = 'Iniciar';
    buttonIniciar.style.backgroundColor = 'green';
    countButton = 1;
  }

  if (countButton == 0) {
    incrementSecondsAndMinutes(min, seg, percent);
    return;
  }
  clearInterval(id);
  stop();
  hora.style.color = 'black';
  segundo.style.color = 'black';
});

function stop() {
  alarme.pause();
  alarme.currentTime = 0;
}

function createOptions() {
  for (let i = 0; i < 60; i++) {
    const optionM = document.createElement('option');
    const optionS = document.createElement('option');
    optionM.innerText = i;
    optionS.innerText = i;
    optionMinutos.appendChild(optionM);
    optionsSegundos.appendChild(optionS);
  }
}

function incrementSecondsAndMinutes(minutes, seconds, percentValue) {
  id = setInterval(() => {
    hora.innerText = minutes + ':';
    segundo.innerText = seconds < 10 ? `0${seconds}` : seconds;

    //reiniciar os segundos
    seconds < 0 ? ((seconds = 59), minutes--) : '';

    if (minutes === 0 && seconds === 0) {
      //parar tempo
      clearInterval(id);
      alarme.play();

      //mudar estilo de fundo quando o alarme tocar
      body.style.backgroundColor = 'tomato';
      hora.style.color = 'white';
      segundo.style.color = 'white';
      buttonIniciar.style.backgroundColor = 'white';
      buttonIniciar.style.color = 'tomato';
    }

    if (Math.ceil(minutes * 60 + seconds) == percentValue) {
      hora.style.color = 'red';
      segundo.style.color = 'red';
    }
    //decremento de segundos
    seconds--;
  }, 1000);
}
