
function UI(nom, diaInicial, diaFinal, horaInici, horaFi){

  this.configs = [];
}

UI.prototype.addNewTime = function(){
  const id = new Date().getTime();
  //creamos el contenedor del nuevo horario:
  const divRow = document.createElement('div');
  divRow.classList.add('row','d-flex','justify-content-around','mb-2');
  const divColInici = document.createElement('div');
  const divColFi = document.createElement('div');
  divColInici.classList.add('col-5');
  divColFi.classList.add('col-5');

  const inputHoraIni = document.createElement('input');
  inputHoraIni.classList.add('form-control');
  inputHoraIni.required=true;
  inputHoraIni.type='time';
  inputHoraIni.name='inici';
  inputHoraIni.id = `inici_${id}`; 

  const inputHoraFi = document.createElement('input');
  inputHoraFi.classList.add('form-control');
  inputHoraFi.required=true;
  inputHoraFi.type='time';
  inputHoraFi.name='fi';
  inputHoraFi.id = `fi_${id}`;


  //ahora los Labels

  const labelHoraIni = document.createElement('label');
  const labelHoraFi = document.createElement('label');

  labelHoraIni.classList.add('form-label');
  labelHoraIni.for='inici';
  labelHoraIni.textContent = 'Hora inici:';
  
  labelHoraFi.classList.add('form-label');
  labelHoraFi.for='fi';
  labelHoraFi.textContent = 'Hora final:';

  //ahora las asignaciones hijo/padre
 

  divColInici.appendChild(labelHoraIni);
  divColInici.appendChild(inputHoraIni);

  divColFi.appendChild(labelHoraFi);
  divColFi.appendChild(inputHoraFi);

  divRow.appendChild(divColInici);
  divRow.appendChild(divColFi);

  horaContainer.appendChild(divRow);
}

UI.prototype.saveConfig = function(){
  
  console.log(`input  = ${inputNom}`);
  //TODO:validar contenido del form...

  let config = {
    id: new Date().getTime(),
    name:inputNom.value,
    diaInicial:inputDiaInicial.value,
    diaFinal:inputDiaFinal.value,
    times:[] 
  }
  //Cojemos todos los rows del contenedor de hora-container
  const rowContainers = horaContainer.querySelectorAll('.row');
  const iniciInputs = [];//inicializamos el array de todas las horas iniciales
  const finalInputs = [];//incializamos el array de todas las horas finales
  
  console.log(`hores totals: ${rowContainers.length}`);

  rowContainers.forEach(rowContainer => {
    const iniciInput = rowContainer.querySelector('input[name="inici"]');
    const finalInput = rowContainer.querySelector('input[name="fi"]'); // Asumes ID único para "fi"
    config.times.push({      
      inici:iniciInput.value,
      final:finalInput.value,  
    })    
  })

  for(let i = 1 ; i < rowContainers.length; i++){
    rowContainers[i].remove();
  }

  this.configs.push(config);
  localStorage.setItem('configs',JSON.stringify(this.configs));
}

UI.prototype.ProgramacioCleanHTML = function(){
  while(programacioContainer.querySelector('tbody').firstChild){
    programacioContainer.querySelector('tbody').removeChild(programacioContainer.querySelector('tbody').firstChild)
  
  }
}

UI.prototype.eliminarProgramacio = function(id){
  this.configs = this.configs.filter( config => config.id !== id);
  localStorage.removeItem('configs');
  localStorage.setItem('configs', JSON.stringify(this.configs));
  this.ProgramacioCleanHTML();
  this.programacioHTML();
  console.log(this.configs);
}

UI.prototype.programacioHTML= function(){
  
  //Por cada configuracion creamos un elemento.

  this.configs.forEach(config =>{
    
    const tr = document.createElement('tr');
    const td_name = document.createElement('td');
    const td_ini = document.createElement('td');
    const td_fi = document.createElement('td');
    const td_accio = document.createElement('td');
    const td_delete = document.createElement('td');
    

    td_name.textContent = config.name;
    td_ini.textContent = daysOfWeekInCatalan[parseInt(config.diaInicial)-1];
    td_fi.textContent = daysOfWeekInCatalan[parseInt(config.diaFinal)-1];
    
    //Recorremos todos los tiempos para añadirlo al tooltip info...
    let tooltipText = '';
    config.times.forEach(times => {
      tooltipText += times.inici + ' fins les ' + times.final + '\n'; // Add newline for each range
    });
    
    td_accio.innerHTML = `
      <button
        type="button"
        class="btn informacio"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title="${tooltipText}"
      >
        i
      </button>`;

    td_delete.innerHTML=
      `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff0808" class="bi bi-x-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg>`     
    td_delete.addEventListener('click', ()=>this.eliminarProgramacio(config.id));

    tr.append(td_name, td_ini, td_fi, td_accio, td_delete );
    
    programacioContainer.querySelector('tbody').appendChild(tr);
    
  })


}