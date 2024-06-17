//listeners


document.addEventListener('DOMContentLoaded',()=>{
  const iframe =  document.createElement('iframe');
  const radio = new Radio(iframe);
  const ui =  new UI();

  btnAddTime.addEventListener('click',ui.addNewTime);
  btnSubmit.addEventListener('click', (e)=>{desarForm(e,ui)},);  

  //cargamos datos guardados...

  ui.configs = JSON.parse(localStorage.getItem('configs')) || [];
  ui.programacioHTML();
  
  setInterval(function(){
    radio.comprovarProgramacio(ui.configs);
  },5000);

});




// setInterval(function() {
//     if (script) {
//         // Remover el script del DOM
//         document.body.removeChild(script);
//         script = null;
//         console.log('Script eliminado');
//     }
// },40000);


//funciones

// Ejemplo de uso: clic en las coordenadas (100, 200)


