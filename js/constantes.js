
moment.locale('ca');

const diaHoy = new Date(); // dia - mes - año actuales.
const daysOfWeekInCatalan = ['dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte','diumenge'];

const inputNom = document.querySelector('#nom');
const inputDiaInicial = document.querySelector('#dia_inicial');
const inputDiaFinal = document.querySelector('#dia_final');
const horaContainer = document.querySelector('#hora-container'); 
const btnAddTime = document.querySelector('#btnAddTime'); 
const btnSubmit = document.querySelector('input[type="submit"]');
const form = document.querySelector('#form');
const programacioContainer = document.querySelector('#programacio-container');

for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
  const dayName = daysOfWeekInCatalan[dayNumber];
  createOption(inputDiaInicial, dayNumber+1 , dayName);
  createOption(inputDiaFinal, dayNumber+1, dayName);
}


//Funciones


function createOption(select, dayNumber, dayName){
  const option = document.createElement('option');
  option.value=dayNumber;
  option.textContent = dayName;
  select.appendChild(option);

}

function desarForm(e, ui){
  e.preventDefault();
  ui.saveConfig();
  form.reset();
  ui.ProgramacioCleanHTML();
  ui.programacioHTML();

}