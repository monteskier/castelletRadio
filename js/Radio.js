function Radio(iframe){
  this.iframe = iframe;
  this.iframe.style.width='290px';
  this.iframe.style.height='50px';
  this.iframe.style.border=0;
  this.iframe.style.margin =0;
  this.iframe.style.overflow='hidden';
  this.iframe.style.borderRadius='2px';
  this.iframe.src='https://myradiostream.com/embed/basic.php?s=eixcastellet&btnstyle=default';
  this.iframe.name='sEAP9keBbvJP';
  this.iframe.frameborder=0;
  this.iframe.scrolling=0;
  this.allow="autoplay";
  //this.allow="play";
}

Radio.prototype.mostrar = function(id){
  
  while(document.querySelector('.radio-container').firstElementChild){
    return;//si ja existeix no la tornem a crear...
  }

  //Hacemos vivible el spinner del horario que esta activo.
  const tdOnline = document.querySelector(`#programacio-container > table > tbody > tr#tr${id}`).firstChild;
  const primerDiv = tdOnline.querySelector('div');
  primerDiv.style=('display:block');
  document.querySelector('.radio-container').appendChild(this.iframe);//en cas que no la creem.
}

Radio.prototype.amagar = function(){
  while(document.querySelector('.radio-container').firstElementChild){
    document.querySelector('.radio-container').removeChild(document.querySelector('.radio-container').firstChild);
  }
}

Radio.prototype.comprovarProgramacio = function (configs){
  //console.log("Hola des de setinterval")

  const avui = moment().isoWeekday();
  
  if(configs.length > 0){
    //todo: canviarlo por for, para poder hacer break;
    for(let i = 0; i < configs.length; i++) {

      const ini = (configs[i].diaInicial);
      const fi = (configs[i].diaFinal);

      //primer comprovem si estem a dia dintre del rang inici i final
      if( avui >= ini && avui <= fi){
        
        //revisar hora
        for(let j=0; j < configs[i].times.length;j++){
          const startTimeString = configs[i].times[j].inici;
          const endTimeString = configs[i].times[j].final;
  
          // Create Date objects using only hours and minutes from the strings
          const startTime = new Date();
          startTime.setHours(parseInt(startTimeString.split(":")[0]));
          startTime.setMinutes(parseInt(startTimeString.split(":")[1]));
  
          const endTime = new Date();
          endTime.setHours(parseInt(endTimeString.split(":")[0]));
          endTime.setMinutes(parseInt(endTimeString.split(":")[1]));
          const ara = new Date().getTime();
          if( startTime <= ara && endTime >= ara){
            //TODO MOSTRAR RADIO
           
            this.mostrar(configs[i].id);                  
            return;
          }
        }        
        //todo AMAGAR RADIO
        this.amagar();
      }
      
    }

    //hem revisats tots els dies i cap dia coincideix amb aviui, apagem la radio
    this.amagar();
  }else{
    this.amagar();
  }
}