// Initialize app
var myApp = new Framework7();
var deviceuuid;
var entidadx;

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    //alert(device.uuid);
    $("#deviceuid").html(device.uuid);
    deviceuuid = window.localStorage.setItem('device.uuid',device.uuid);
    //Creo la base de datos:
    var db = window.openDatabase("MisEncuestas", "1.0", "Mi Encuesta", 200000);
    db.transaction(populateDB, errorCB, successCB);

});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
        $$("#stepTwo").css("display", "none");
        $$("#stepTwoOnlyLyL").css("display", "none");
        $$("#stepThree").css("display", "none");
        $$("#stepFour").css("display", "none");
        $$("#EstudiosPadre").css("display", "none");
        $$("#onlyProvincia").css("display", "none");
        
        leeDatos();

    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
})


//Función para guardar los cambios de los input sin botón guardar. Estilo iOS
function onChangeName(x,name){
    var x; //contenido
    var name; //nombre del input

    if (name == 'entidad'){ 
        if( (x != '') && (x != null) && (x != undefined) ){
            $$("#oculto").css("display", "block");
        }else{
            $$("#oculto").css("display", "none");   
        }   
        insertEncuesta(x);
    }
    //Controlo si tiene valor el campo al cambiar.
    if(x != ""){
        window.localStorage.setItem(name,x);
        $$('#'+name).val(x);
    }else{
        localStorage.removeItem(name);
    }
//Si es padre, muestro contenido. 
    if(x == 'Padre'){
        $$("#EstudiosPadre").css("display", "block");
    }else if(x== 'Docente'){
        $$("#EstudiosPadre").css("display", "none");
    }
//Si es del interior.
 var provinciaPro = window.localStorage.getItem('provinciaPro');
    if(provinciaPro == 'Interior'){
        $$("#onlyProvincia").css("display", "block");
    }else{
        $$("#onlyProvincia").css("display", "none");     
    }
//Valido el nombre de la institución.
    if(name == 'institucionPro'){
        if(x.indexOf("Escuela") == -1){
            if(x.indexOf("escuela") == -1){
                if(x.indexOf("Colegio") == -1){
                    if(x.indexOf("colegio") == -1){
                        if(x.indexOf("Intituto") == -1){
                            if(x.indexOf("intituto") == -1){
                                myApp.alert('El nombre de la institución debe indicar la/s palabra/s [escuela, colegio o institución]', ['Mensaje']);
                            }
                        }
                    }
                }
            }    
        }
    }
var entidadx = window.localStorage.getItem('entidad');    
updateEncuesta(entidadx, name, x);         
}//Fin de function

function onClickCheck(x,name){
    var x; //contenido
    var name; //nombre del input

    var estate = document.getElementById(name).checked;
    //alert('Recibí esto ' + estate);
    //alert('Esto estaba: ' + window.localStorage.getItem(name));
    //alert('Esta es ID con el que grabo el localstorage ' + name);
    if(estate == true){
        window.localStorage.setItem(name,x);
        //document.getElementById("Docente").checked = true;
        $$('input[name='+name+']').prop('checked', true);
    }else{
        window.localStorage.removeItem(name);
    }
    alert('Así quedó: ' + window.localStorage.getItem(name));
}

function onClickCheckDos(name){
    var name;
    var estado =  window.localStorage.getItem(name);
    var entidadx = window.localStorage.getItem('entidad'); 

    if (estado == undefined) {
        $$('input[name='+name+']').prop('checked', true);
        window.localStorage.setItem(name,'on');
        updateEncuesta(entidadx, name, 'on'); 
    }
    if (estado == 'on') {
        window.localStorage.setItem(name,'off');
        updateEncuesta(entidadx, name, 'off');
    }
    if (estado == 'off') {
        window.localStorage.setItem(name,'on');
        updateEncuesta(entidadx, name, 'on');
    }
}

//Función para cargar todos los datos de APP sobrevive a reinicios.
function leeDatos(){   
    var name = window.localStorage.getItem('nombre');
    var password = window.localStorage.getItem('apellido');
    var tel = window.localStorage.getItem('tel');
    var email = window.localStorage.getItem('email');
    var edad = window.localStorage.getItem('edad');
    var entidad = window.localStorage.getItem('entidad');
    //Docentes
    var institucionPro = window.localStorage.getItem('institucionPro');
    var provinciaPro = window.localStorage.getItem('provinciaPro');
    var InteriorPro = window.localStorage.getItem('InteriorPro');
    var InteriorPro = window.localStorage.getItem('InteriorPro');
    var zonaProvinciaPro = window.localStorage.getItem('zonaProvinciaPro');
    var establecimientoPro = window.localStorage.getItem('establecimientoPro');
    var Docente = window.localStorage.getItem('Docente');
    var Directivo = window.localStorage.getItem('Directivo');
    var Bibliotecario =  window.localStorage.getItem('Bibliotecario');
    var Otro = window.localStorage.getItem('Otro');
    var Inicial = window.localStorage.getItem('Inicial');
    var PrimerCiclo = window.localStorage.getItem('PrimerCiclo');
    var SegundoCiclo = window.localStorage.getItem('SegundoCiclo');
    var SecunCicloBas = window.localStorage.getItem('SecunCicloBas');
    var SecunCicloSup = window.localStorage.getItem('SecunCicloSup');
    var CienciasSoc = window.localStorage.getItem('CienciasSoc');
    var CienciasNat = window.localStorage.getItem('CienciasNat');
    var Arte = window.localStorage.getItem('Arte');
    var LenYLit = window.localStorage.getItem('LenYLit');
    var Otra = window.localStorage.getItem('Otra');
    var utilizaLibrosPro = window.localStorage.getItem('utilizaLibrosPro');
    var planLectorPro = window.localStorage.getItem('planLectorPro');
    var pertenecenAClaPro = window.localStorage.getItem('pertenecenAClaPro');
    var contempoPro = window.localStorage.getItem('contempoPro');
    var Mitos = window.localStorage.getItem('Mitos');
    var Leyendas = window.localStorage.getItem('Leyendas');
    var Teatro = window.localStorage.getItem('Teatro');
    var Poesia = window.localStorage.getItem('Poesia');
    var Policiales = window.localStorage.getItem('Policiales');
    var Aventuras = window.localStorage.getItem('Aventuras');
    var Humor = window.localStorage.getItem('Humor');
    var Clasicos = window.localStorage.getItem('Clasicos');
    var usaTecnoPro = window.localStorage.getItem('usaTecnoPro');
    //var usaRedesPro = window.localStorage.getItem('usaRedesPro');
    var Estudiosfin = window.localStorage.getItem('Estudiosfin');
    //Para padres
    var RangoEdadPadres = window.localStorage.getItem('RangoEdadPadres');
    var compraLibrosPadres = window.localStorage.getItem('compraLibrosPadres');
    var leeLibExtPadres = window.localStorage.getItem('leeLibExtPadres');
    var Librerias = window.localStorage.getItem('Librerias');
    var Supermercado = window.localStorage.getItem('Supermercado');
    var OnLine = window.localStorage.getItem('OnLine');
    var OtrosPad = window.localStorage.getItem('OtrosPad');
  
    var ActPad = window.localStorage.getItem('ActPad');
    var PintarPad = window.localStorage.getItem('PintarPad');
    var CocinaPad = window.localStorage.getItem('CocinaPad');
    var InteractivosPad = window.localStorage.getItem('InteractivosPad');
    var PerConPad = window.localStorage.getItem('PerConPad');
    var CuentosPad = window.localStorage.getItem('CuentosPad');
    var IlustradorPad = window.localStorage.getItem('IlustradorPad');
    var ParaAdolPad = window.localStorage.getItem('ParaAdolPad');
    var SagasPad = window.localStorage.getItem('SagasPad');
    var otroGeneroPro = window.localStorage.getItem('otroGeneroPro');
    var regalaPadres = window.localStorage.getItem('regalaPadres');

    //REDES SOCIALES
    var Facebook = window.localStorage.getItem('Facebook');
    var Instagram = window.localStorage.getItem('Instagram');
    var Twitter = window.localStorage.getItem('Twitter');
    var Pinterest = window.localStorage.getItem('Pinterest');
    var YouTube = window.localStorage.getItem('YouTube');

    //FORMULARIO DE ENVIO
    var namesend = window.localStorage.getItem('namesend');
    var mailsend = window.localStorage.getItem('mailsend');    

    /* Para envio */
    if(namesend != ''){
        $$('#namesend').val(namesend);
    }
    if(mailsend != ''){
        $$('#mailsend').val(mailsend);
    }   

    /* Para todos */
    if(name != ''){
        $$('#nombre').val(name);
    }
    if(password != ''){
        $$('#apellido').val(password);
    }
    if(tel != ''){
        $$('#tel').val(tel);
    }
    if(email != ''){
        $$('#email').val(email);
    }
    if(edad != ''){
        $$('#edad').val(edad);
    }
    if(Estudiosfin != ''){
        $$('#Estudiosfin').val(Estudiosfin);
    }
  
    if((entidad != '') && (entidad != null) && (entidad != undefined)){
        $$('#entidad').val(entidad);
        
        if(entidad == 'Padre'){
            $$("#EstudiosPadre").css("display", "block");
        }else if(entidad == 'Docente'){
            $$("#EstudiosPadre").css("display", "none");
        }
    }else{
        $$("#oculto").css("display", "none");
    }
    
    /* Fin Para todos */

    /* Para docentes */
    if(institucionPro != ''){
        $$('#institucionPro').val(institucionPro);
    }
    if(provinciaPro != ''){
        $$('#provinciaPro').val(provinciaPro);

        if(provinciaPro == 'Interior'){
            $("#onlyProvincia").css("display", "block");
        }else{
            $("#onlyProvincia").css("display", "none");           
        }
    }
    if(InteriorPro != ''){
        $$('#InteriorPro').val(InteriorPro);
    } 
    if(zonaProvinciaPro != ''){
        $$('#zonaProvinciaPro').val(zonaProvinciaPro);
    } 
    if(establecimientoPro != ''){
        $$('#establecimientoPro').val(establecimientoPro);
    }
    //alert('Asi lo analizo yo ' + Directivo);
    if(Docente == 'on'){
        //document.getElementById("Docente").click();
        //document.getElementById('Docente').click();
        $$('#Docente').prop('checked', true);
    }
    if(Directivo == 'on'){
        $$('#Directivo').prop('checked', true);
    }
    if(Bibliotecario == 'on'){
        $$('#Bibliotecario').prop('checked', true);
    }
    if(Otro == 'on'){
        $$('#Otro').prop('checked', true);
    }
    if(Inicial == 'on'){
        $$('#Inicial').prop('checked', true);
    }
    if(PrimerCiclo == 'on'){
        $$('#PrimerCiclo').prop('checked', true);
    }                            
    if(SegundoCiclo == 'on'){
        $$('#SegundoCiclo').prop('checked', true);
    } 
    if(SecunCicloBas == 'on'){
        $$('#SecunCicloBas').prop('checked', true);
    } 
    if(SecunCicloSup == 'on'){
        $$('#SecunCicloSup').prop('checked', true);
    } 
    if(CienciasSoc == 'on'){
        $$('#CienciasSoc').prop('checked', true);
    } 
    if(CienciasNat == 'on'){
        $$('#CienciasNat').prop('checked', true);
    } 
    if(Arte == 'on'){
        $$('#Arte').prop('checked', true);
    } 
    if(LenYLit == 'on'){
        $$('#LenYLit').prop('checked', true);
    } 
    if(Otra == 'on'){
        $$('#Otra').prop('checked', true);
    }
    //Para docentes de lengua y literatura.
    if(utilizaLibrosPro != ''){
        $$('#utilizaLibrosPro').val(utilizaLibrosPro);
    }
    if(planLectorPro != ''){
        $$('#planLectorPro').val(planLectorPro);
    }
    if(pertenecenAClaPro != ''){
        $$('#pertenecenAClaPro').val(pertenecenAClaPro);
    }
    if(contempoPro != ''){
        $$('#contempoPro').val(contempoPro);
    }
    if(Mitos == 'on'){
        $$('#Mitos').prop('checked', true);
    }
    if(Leyendas == 'on'){
        $$('#Leyendas').prop('checked', true);
    }        
    if(Teatro == 'on'){
        $$('#Teatro').prop('checked', true);
    }
    if(Poesia == 'on'){
        $$('#Poesia').prop('checked', true);
    }     
    if(Policiales == 'on'){
        $$('#Policiales').prop('checked', true);
    }
    if(Aventuras == 'on'){
        $$('#Aventuras').prop('checked', true);
    }
    if(Humor == 'on'){
        $$('#Humor').prop('checked', true);
    }
    if(Clasicos == 'on'){
        $$('#Clasicos').prop('checked', true);
    }
    if(usaTecnoPro != ''){
        $$('#usaTecnoPro').val(usaTecnoPro);
    }
    /*if(usaRedesPro != ''){
        $$('#usaRedesPro').val(usaRedesPro);
    }*/
    if(RangoEdadPadres != ''){
        $$('#RangoEdadPadres').val(RangoEdadPadres);
    }
    if(compraLibrosPadres != ''){
        $$('#compraLibrosPadres').val(compraLibrosPadres);
    }
    if(leeLibExtPadres != ''){
        $$('#leeLibExtPadres').val(leeLibExtPadres);
    }
    if(Librerias == 'on'){
        $$('#Librerias').prop('checked', true);
    }
    if(Supermercado == 'on'){
        $$('#Supermercado').prop('checked', true);
    }
    if(OnLine == 'on'){
        $$('#OnLine').prop('checked', true);
    }
    if(OtrosPad == 'on'){
        $$('#OtrosPad').prop('checked', true);
    }

    if(ActPad == 'on'){
        $$('#ActPad').prop('checked', true);
    }
    if(PintarPad == 'on'){
        $$('#PintarPad').prop('checked', true);
    }
    if(CocinaPad == 'on'){
        $$('#CocinaPad').prop('checked', true);
    }    
    if(InteractivosPad == 'on'){
        $$('#InteractivosPad').prop('checked', true);
    }
    if(PerConPad == 'on'){
        $$('#PerConPad').prop('checked', true);
    }
    if(CuentosPad == 'on'){
        $$('#CuentosPad').prop('checked', true);
    }
    if(IlustradorPad == 'on'){
        $$('#IlustradorPad').prop('checked', true);
    }
    if(ParaAdolPad == 'on'){
        $$('#ParaAdolPad').prop('checked', true);
    }
    if(SagasPad == 'on'){
        $$('#SagasPad').prop('checked', true);
    }    
    if(otroGeneroPro != ''){
        $$('#otroGeneroPro').val(otroGeneroPro);
    }
    if(regalaPadres != ''){
        $$('#regalaPadres').val(regalaPadres);
    }

    if(Facebook == 'on'){
        $$('#Facebook').prop('checked', true);
    }
    if(Instagram == 'on'){
        $$('#Instagram').prop('checked', true);
    }
    if(Twitter == 'on'){
        $$('#Twitter').prop('checked', true);
    } 
    if(Pinterest == 'on'){
        $$('#Pinterest').prop('checked', true);
    } 
    if(YouTube == 'on'){
        $$('#YouTube').prop('checked', true);
    }     
    
}

function onClickApp(){
    //navigator.notification.onConfirm(
    navigator.notification.confirm(
        'Estás seguro que deseas cancelar la encuesta? Todos los datos de la encuesta en curso serán borrados.', // message
        onConfirm,            // callback to invoke with index of button pressed
        'Alerta!',           // title
        ['Confirmar','Cancelar']     // buttonLabels
    );
}


function onConfirm(buttonIndex) {
   if(buttonIndex == 1 ){
        delEncuesta(window.localStorage.getItem('entidad'), window.localStorage.getItem('IDEncuesta') );
        localStorage.clear();
        location.reload();
        //myApp.alert('Borramos todos', ['Mensaje']);
    }
   if(buttonIndex == 2 ){
        myApp.alert('Ok, todo quedo como antes, no hubo cambios.', ['Mensaje']);
    }
}

function nextStepOne(){

    var valStepOnePadre = [
        window.localStorage.getItem('nombre'),
        window.localStorage.getItem('apellido'),
        window.localStorage.getItem('tel'),
        window.localStorage.getItem('email'),
        window.localStorage.getItem('edad'),
        window.localStorage.getItem('entidad'),
        window.localStorage.getItem('Estudiosfin')
    ];

     var valStepOneDocente = [
        window.localStorage.getItem('nombre'),
        window.localStorage.getItem('apellido'),
        window.localStorage.getItem('tel'),
        window.localStorage.getItem('email'),
        window.localStorage.getItem('edad'),
        window.localStorage.getItem('entidad')
    ];
    var entidad = window.localStorage.getItem('entidad');
    if (entidad == 'Docente'){var esEntidad = valStepOneDocente;}else if(entidad == 'Padre'){var esEntidad = valStepOnePadre;}else{var esEntidad = valStepOneDocente;}
    for (x=0; x<esEntidad.length; x++){

    switch(x) {
        case 0:
            var campo = 'Nombre';
            break;
        case 1:
            var campo = 'Apellido';
            break;
        case 2:
            var campo = 'Teléfono';
            break;
        case 3:
            var campo = 'Email';
            break;
        case 4:
            var campo = 'Edad';
            break;
        case 5:
            var campo = 'Entidad';
            break;
        case 6:
            var campo = 'Estudios';
            break;                                                            
    }

        if(esEntidad[x] == undefined){
            myApp.alert(campo + ' no puede estar vacío.' , ['Información!']);
            return;
        }

    }//Fin del for

    if(entidad == 'Padre'){
        $$("#stepOne").css("display", "none");
        $$("#stepThree").css("display", "block");
    }else if(entidad == 'Docente'){
        $$("#stepOne").css("display", "none");
        $$("#stepTwo").css("display", "block");
    }   
}

function nextDocente(){
    var estate = document.getElementById('LenYLit').checked;

    //Controlo si es del interior para armar el array.
    var esprovincia = window.localStorage.getItem('provinciaPro');   
    if(esprovincia == 'Interior'){
        var datosInsti = [
            window.localStorage.getItem('institucionPro'),
            window.localStorage.getItem('provinciaPro'),
            window.localStorage.getItem('establecimientoPro'),
            window.localStorage.getItem('InteriorPro'),
            window.localStorage.getItem('zonaProvinciaPro')    
        ];
    }else{
        var datosInsti = [
            window.localStorage.getItem('institucionPro'),
            window.localStorage.getItem('provinciaPro'),
            window.localStorage.getItem('establecimientoPro')
        ];
    }

    for (x=0; x<datosInsti.length; x++){

    switch(x) {
        case 0:
            var campo = 'Institución';
            var id = 'institucionPro';
            break;
        case 1:
            var campo = 'Provincia';
            var id = 'provinciaPro';
            break;
        case 2:
            var campo = 'Establecimiento';
            var id = 'establecimientoPro';
            break;
        case 3:
            var campo = 'Interior';
            var id = 'InteriorPro';
            break;
        case 4:
            var campo = 'Zona de otra provincia';
            var id = 'zonaProvinciaPro';
            break;                                                            
    }
        if(datosInsti[x] == undefined){
            myApp.alert(campo + ' no puede estar vacío.' , ['Información!']);
            return;
        }
}

    var datosCargo = [
        window.localStorage.getItem('Docente'),
        window.localStorage.getItem('Directivo'),
        window.localStorage.getItem('Bibliotecario'),
        window.localStorage.getItem('otro')
    ];
    var sum = 0;
    for (x=0; x<datosCargo.length; x++){
        switch(x) {
            case 0:
                var campo = 'Docente';
                var id = 'Docente';
                break;
            case 1:
                var campo = 'Directivo/a';
                var id = 'Directivo';
                break;
            case 2:
                var campo = 'Bibliotecario';
                var id = 'Bibliotecario';
                break;
            case 3:
                var campo = 'Otro';
                var id = 'Otro';
                break;        
        }
        
        if(document.getElementById(id).checked == true){
            sum++;
        }
    }//Fin del for

    if(sum == 0){
        myApp.alert('Debe selecionar alguna opción de la sección "Cargo actual" ' , ['Información!']);
        return;
    }

    var datosNivel = [
        window.localStorage.getItem('Inicial'),
        window.localStorage.getItem('PrimerCiclo'),
        window.localStorage.getItem('SegundoCiclo'),
        window.localStorage.getItem('SecunCicloBas'),
        window.localStorage.getItem('SecunCicloSup')
    ];
    var su = 0;
    for (x=0; x<datosNivel.length; x++){
        switch(x) {
            case 0:
                var campo = 'Inicial';
                var id = 'Inicial';
                break;
            case 1:
                var campo = 'Primer Ciclo';
                var id = 'PrimerCiclo';
                break;
            case 2:
                var campo = 'Segundo Ciclo';
                var id = 'SegundoCiclo';
                break;
            case 3:
                var campo = 'Secundo Ciclo Básico';
                var id = 'SecunCicloBas';
                break;        
            case 4:
                var campo = 'Secundaria Ciclo Superior';
                var id = 'SecunCicloSup';
                break;                
        }
        
        if(document.getElementById(id).checked == true){
            su++;
        }
    }//Fin del for

    if(su == 0){
        myApp.alert('Debe selecionar alguna opción de la sección "Nivel actual" ' , ['Información!']);
        return;
    }  
    
    var datosArea = [
        window.localStorage.getItem('CienciasSoc'),
        window.localStorage.getItem('CienciasNat'),
        window.localStorage.getItem('Arte'),
        window.localStorage.getItem('LenYLit'),
        window.localStorage.getItem('Otra')        
    ];

    var sume = 0;
    for (x=0; x<datosNivel.length; x++){
        switch(x) {
            case 0:
                var campo = 'Ciencias Sociales';
                var id = 'CienciasSoc';
                break;
            case 1:
                var campo = 'Ciencias Naturales';
                var id = 'CienciasNat';
                break;
            case 2:
                var campo = 'Arte';
                var id = 'Arte';
                break;
            case 3:
                var campo = 'Lengua y Literatura';
                var id = 'LenYLit';
                break;        
            case 4:
                var campo = 'Otra';
                var id = 'Otra';
                break;                
        }
        
        if(document.getElementById(id).checked == true){
            sume++;
        }
    }//Fin del for

    if(sume == 0){
        myApp.alert('Debe selecionar alguna opción de la sección "Área actual" ' , ['Información!']);
        return;
    } 

    if(estate == true){
        $$("#stepTwo").css("display", "none");
        $$("#stepTwoOnlyLyL").css("display", "block");
    }else{
        window.localStorage.setItem('origen','stepTwo');
        $$("#stepTwo").css("display", "none");
        $$("#stepFour").css("display", "block");        
    }
}

function nextSocialLyL(){

    var iniLengua = [
        window.localStorage.getItem('utilizaLibrosPro'),
        window.localStorage.getItem('planLectorPro'),
        window.localStorage.getItem('pertenecenAClaPro'),
        window.localStorage.getItem('contempoPro'),       
    ];

    for (x=0; x<iniLengua.length; x++){
        switch(x) {
            case 0:
                var campo = 'Utiliza libro de texto';
                var id = 'utilizaLibrosPro';
                break;
            case 1:
                var campo = 'Plan lector anual';
                var id = 'planLectorPro';
                break;
            case 2:
                var campo = 'Pertenecen a clásicos';
                var id = 'pertenecenAClaPro';
                break;
            case 3:
                var campo = 'Contemporáneos';
                var id = 'contempoPro';
                break;                                                            
        }
        if(iniLengua[x] == undefined){
            myApp.alert(campo + ' no puede estar vacío.' , ['Información!']);
            return;
        }
    }

    var sugerencias = [
        window.localStorage.getItem('Mitos'),
        window.localStorage.getItem('Leyendas'),
        window.localStorage.getItem('Teatro'),
        window.localStorage.getItem('Poesia'),
        window.localStorage.getItem('Policiales'),
        window.localStorage.getItem('Aventuras'),
        window.localStorage.getItem('Humor'),
        window.localStorage.getItem('Clasicos')
    ];
    var sumemos = 0;
    for (x=0; x<sugerencias.length; x++){
        switch(x) {
            case 0:
                var id = 'Mitos';
                break;
            case 1:
                var id = 'Leyendas';
                break;
            case 2:
                var id = 'Teatro';
                break;
            case 3:
                var id = 'Poesia';
                break;
            case 4:
                var id = 'Policiales';
                break;
            case 5:
                var id = 'Aventuras';
                break;
            case 6:
                var id = 'Humor';
                break;
            case 7:
                var id = 'Clasicos';
                break;                                                                                                                            
        }
        if(document.getElementById(id).checked == true){
            sumemos++;
        }
    }//Fin del For

    if(sumemos == 0){
        myApp.alert('Debe selecionar alguna opción de la sección "Sugerencias al plan lector" ' , ['Información!']);
        return;
    }     

    if(window.localStorage.getItem('usaTecnoPro') == 'Si' || window.localStorage.getItem('usaTecnoPro') == 'No'){

    }else{
        myApp.alert('Debe indicar si usa tecnología en el aula ' , ['Información!']);
        return;        
    }
    window.localStorage.setItem('origen','stepTwoOnlyLyL');
    $$("#stepTwoOnlyLyL").css("display", "none");
    $$("#stepFour").css("display", "block");   
}

function nextSocial(){

    var datosObligatorio = [
        window.localStorage.getItem('RangoEdadPadres'),
        window.localStorage.getItem('compraLibrosPadres'),
        window.localStorage.getItem('leeLibExtPadres'),
    ];

    for (x=0; x<datosObligatorio.length; x++){
        switch(x) {
            case 0:
                var campo = 'Hijos, edad';
                break;
            case 1:
                var campo = 'Le compra libros';
                break;
            case 2:
                var campo = 'Lee extracurricular';
                break;            
            }

         if(datosObligatorio[x] == undefined){
            myApp.alert(campo + ' no puede estar vacío.' , ['Información!']);
            return;
            }       
    }//Fin for DatosObligatorios

    var datosCompra = [
        window.localStorage.getItem('Librerias'),
        window.localStorage.getItem('Supermercado'),
        window.localStorage.getItem('OnLine'),
        window.localStorage.getItem('OtrosPad')
    ];
    
    var suma = 0;    
    
    for (x=0; x<datosCompra.length; x++){

    switch(x) {
        case 0:
            var campo = 'Librerias';
            var id = 'Librerias';
            break;
        case 1:
            var campo = 'Supermercado';
            var id = 'Supermercado';
            break;
        case 2:
            var campo = 'On Line';
            var id = 'OnLine';
            break;
        case 3:
            var campo = 'Otros';
            var id = 'OtrosPad';
            break;                        
        }
     //alert(document.getElementById(id).checked );
     if(document.getElementById(id).checked == true){
        suma++;
        }
    }//fin For DatosDeCompra

     if(suma == 0){
        myApp.alert('Debe selecionar alguna opción de la sección "Compra en" ' , ['Información!']);
        return;
     }


    var datosHijoPiden = [
        window.localStorage.getItem('ActPad'),
        window.localStorage.getItem('PintarPad'),
        window.localStorage.getItem('InteractivosPad'),
        window.localStorage.getItem('PerConPad'),
        window.localStorage.getItem('CuentosPad'),
        window.localStorage.getItem('IlustradorPad'),
        window.localStorage.getItem('ParaAdolPad'),
        window.localStorage.getItem('SagasPad'),
        window.localStorage.getItem('otroGeneroPro')        
    ];
    var sumar = 0;   
    for (x=0; x<datosHijoPiden.length; x++){
    switch(x) {
        case 0:
            var campo = 'Actividades';
            var id = 'ActPad';
            break;
        case 1:
            var campo = 'Para pintar';
            var id = 'PintarPad';
            break;
        case 2:
            var campo = 'De cocina';
            var id = 'CocinaPad';
            break;
        case 3:
            var campo = 'Interactivos';
            var id = 'InteractivosPad';
            break;
        case 4:
            var campo = 'Personajes conocidos';
            var id = 'PerConPad';
            break;
        case 5:
            var campo = 'De cuentos';
            var id = 'CuentosPad';
            break;
        case 6:
            var campo = 'Ilustrados';
            var id = 'IlustradorPad';
            break;
        case 7:
            var campo = 'Para adolescentes';
            var id = 'ParaAdolPad';
            break;
        case 8:
            var campo = 'Sagas';
            var id = 'SagasPad';
            break;
        }

     if(document.getElementById(''+ id +'').checked == true){
        sumar++;
    }
    
    }//Fin del for

     if(sumar == 0){
            myApp.alert('Debe selecionar alguna opción de la sección "Hijos, solicitan libros de" ' , ['Información!']);
            return;
     }

    if(window.localStorage.getItem('regalaPadres') == 'Si' || window.localStorage.getItem('regalaPadres') == 'No'){

    }else{
        myApp.alert('Debe indicar si Regala libros ' , ['Información!']);
        return;        
    }
    window.localStorage.setItem('origen','stepThree');
    $$("#stepThree").css("display", "none");
    $$("#stepFour").css("display", "block");

}//fin función.

function backEncuesta(desde, hacia){
    if (desde == 'A' & hacia == 'B'){
        var hacia = window.localStorage.getItem('origen');
        var desde = 'stepFour';
        $$("#"+ desde +"").css("display", "none");
        $$("#"+ hacia +"").css("display", "block");
    }else{   
        var desde;
        var hacia;
        $$("#"+ desde +"").css("display", "none");
        $$("#"+ hacia +"").css("display", "block");
    }
}


//Envio de datos
function ClearAfterSend(){
    var estate = document.getElementById('borrarStorage').checked;    
    if(estate == true){
        myApp.alert('Activar esta opción significa que el sistema eliminará todos los datos de su dispostivo móvil luego de enviar los datos', ['Atención!']);
    }
}

function sendData(){
    if($$("#namesend").val() == ''){
        myApp.alert('El campo Nombre debe contener un valor', ['Validador']);
        return;
    }else if($$("#mailsend").val() == ''){
        myApp.alert('El campo Email debe contener un valor', ['Validador']);
        return;
    }
    sendAll();

    //myApp.alert('Información enviada con éxito!', ['Validador']);
}

function finish(){

    var redeSociales = [
    window.localStorage.getItem('Facebook'),
    window.localStorage.getItem('Instagram'),
    window.localStorage.getItem('Twitter'),
    window.localStorage.getItem('Pinterest'),
    window.localStorage.getItem('YouTube')      
    ];
    var suna = 0; 
    for (x=0; x<redeSociales.length; x++){
    switch(x) {
        case 0:
            var campo = 'Facebook';
            var id = 'Facebook';
            break;
        
        case 1:
            var campo = 'Instagram';
            var id = 'Instagram';
            break;
        
        case 2:
            var campo = 'Twitter';
            var id = 'Twitter';
            break;
        
        case 3:
            var campo = 'Pinterest';
            var id = 'Pinterest';
            break;
        
        case 4:
            var campo = 'YouTube';
            var id = 'YouTube';
            break;
        }
        if(document.getElementById(''+ id +'').checked == true){
            suna++;
        }                 
    }//Fin del bluce FOR

    if(suna == 0){
        myApp.alert('Debe selecionar alguna opción de la sección "Redes sociales" ' , ['Información!']);
        return;
    }
    localStorage.clear();
    location.reload();
    //window.localStorage.removeItem('entidad');
    leerDatos();
}

function leerDatos(){
    deviceuuid = window.localStorage.getItem('deviceuuid');
    var respuesta = [device.uuid];

    var valStepOnePadre = [
        window.localStorage.getItem('nombre'),
        window.localStorage.getItem('apellido'),
        window.localStorage.getItem('tel'),
        window.localStorage.getItem('email'),
        window.localStorage.getItem('edad'),
        window.localStorage.getItem('entidad'),
        window.localStorage.getItem('Estudiosfin')
    ];

     var valStepOneDocente = [
        window.localStorage.getItem('nombre'),
        window.localStorage.getItem('apellido'),
        window.localStorage.getItem('tel'),
        window.localStorage.getItem('email'),
        window.localStorage.getItem('edad'),
        window.localStorage.getItem('entidad')
    ];
    var entidad = window.localStorage.getItem('entidad');
    if (entidad == 'Docente'){var esEntidad = valStepOneDocente;}else if(entidad == 'Padre'){var esEntidad = valStepOnePadre;}else{var esEntidad = valStepOneDocente;}
    for (x=0; x<esEntidad.length; x++){
        //document.write('Nombre: ' + esEntidad[0] + '<br>');

        respuesta.push( {
                         "DatosPersonales":{ 
                                            Nombre : esEntidad[0], 
                                            Apellido : esEntidad[1], 
                                            Telefono : esEntidad[2], 
                                            Email : esEntidad[3], 
                                            Edad : esEntidad[4], 
                                            Entidad : esEntidad[5],
                                            Estudios : esEntidad[6]
                                            }
                        } );
                         
        //document.write('Apellido: ' + esEntidad[1] + '<br>');
        //document.write('Teléfono: ' + esEntidad[2] + '<br>');
        //document.write('Email: ' + esEntidad[3] + '<br>');
        //document.write('Edad: ' + esEntidad[4] + '<br>');
        //document.write('Entidad: ' + esEntidad[5] + '<br>');

//ES PADRE
    if(esEntidad[5] == 'Padre'){
        //document.write('Estudios finalizados: ' + esEntidad[6] + '<br>');
        
        var datosObligatorio = [
            window.localStorage.getItem('RangoEdadPadres'),
            window.localStorage.getItem('compraLibrosPadres'),
            window.localStorage.getItem('leeLibExtPadres'),
        ];

        for (x=0; x<datosObligatorio.length; x++){
            //document.write('Hijos, edad: ' + datosObligatorio[0] + '<br>');
            //document.write('Le compra libros?: ' + datosObligatorio[1] + '<br>'); 
            //document.write('Lee extracurricular?: ' + datosObligatorio[2] + '<br>');
            respuesta.push( {"Padre":{Hijosedad : datosObligatorio[0], LeCompraLibros : datosObligatorio[1], LeeExtracurricular : datosObligatorio[2]}} );
            break;
        }

        var datosCompra = [
            window.localStorage.getItem('Librerias'),
            window.localStorage.getItem('Supermercado'),
            window.localStorage.getItem('OnLine'),
            window.localStorage.getItem('OtrosPad')
        ];  

        //document.write('Compra en?: <br>');
        
        
        var Compra = [];
        for (x=0; x<datosCompra.length; x++){
            if(datosCompra[x] == 'on'){
                if(x == 0){
                    var etiqueta = 'Librerías';
                }else if(x == 1){
                    var etiqueta = 'Supermercado';
                }else if(x == 2){
                    var etiqueta = 'OnLine';
                }else if(x == 3){
                    var etiqueta = 'Otros';
                }

                Compra.push(etiqueta); 
                //document.write('-->' + etiqueta + '<br>');
            }
        }
        respuesta.push( { "CompraEn" : Compra });

        var datosHijoPiden = [
            window.localStorage.getItem('ActPad'),
            window.localStorage.getItem('PintarPad'),
            window.localStorage.getItem('InteractivosPad'),
            window.localStorage.getItem('PerConPad'),
            window.localStorage.getItem('CuentosPad'),
            window.localStorage.getItem('IlustradorPad'),
            window.localStorage.getItem('ParaAdolPad'),
            window.localStorage.getItem('SagasPad'),
            window.localStorage.getItem('otroGeneroPro')        
        ];

        var HijosPiden = [];
        //document.write('Hijos, solicitan libros de?: <br>');      
        for (x=0; x<datosHijoPiden.length; x++){
            if(datosHijoPiden[x] == 'on'){
                if(x == 0){
                    var etiqueta = 'Actividades';
                }else if(x == 1){
                    var etiqueta = 'Para pintar';
                }else if(x == 2){
                    var etiqueta = 'De Cocina';
                }else if(x == 3){
                    var etiqueta = 'Interactivos';
                }else if(x == 4){
                    var etiqueta = 'Personajes conocidos';
                }else if(x == 5){
                    var etiqueta = 'De cuentos';
                }else if(x == 6){
                    var etiqueta = 'Illustrados';
                }else if(x == 7){
                    var etiqueta = 'Para adolescentes';
                }else if(x == 8){
                    var etiqueta = 'Sagas';
                }
                HijosPiden.push(etiqueta); 
                //document.write('->' + etiqueta + '<br>');
            }
        }
        respuesta.push( { "HijosSolicitanLibros" : HijosPiden });

        //document.write('Regala libros? ' + window.localStorage.getItem('regalaPadres'));

        var redeSociales = [
            window.localStorage.getItem('Facebook'),
            window.localStorage.getItem('Instagram'),
            window.localStorage.getItem('Twitter'),
            window.localStorage.getItem('Pinterest'),
            window.localStorage.getItem('YouTube')      
        ];
        var redesS = [];
        //document.write('<br> Redes sociales?: <br>');
        for (x=0; x<redeSociales.length; x++){
            if(redeSociales[x] == 'on'){
                if(x == 0){
                    var etiqueta = 'Facebook';
                }else if(x == 1){
                    var etiqueta = 'Instagram';
                }else if(x == 2){
                    var etiqueta = 'Twitter';
                }else if(x == 3){
                    var etiqueta = 'Pinterest';
                }else if(x == 4){
                    var etiqueta = 'YouTube';
                }
                redesS.push(etiqueta);
                //document.write('->' + etiqueta + '<br>');        
            }
        }

        respuesta.push( { "RedesSociales" : redesS });
    }//Fin de Padre
    else if(esEntidad[5] == 'Docente'){
    //Controlo si es del interior para armar el array.
    var esprovincia = window.localStorage.getItem('provinciaPro');   
    if(esprovincia == 'Interior'){
        var datosInsti = [
            window.localStorage.getItem('institucionPro'),
            window.localStorage.getItem('provinciaPro'),
            window.localStorage.getItem('establecimientoPro'),
            window.localStorage.getItem('InteriorPro'),
            window.localStorage.getItem('zonaProvinciaPro')    
        ];
    }else{
        var datosInsti = [
            window.localStorage.getItem('institucionPro'),
            window.localStorage.getItem('provinciaPro'),
            window.localStorage.getItem('establecimientoPro')
        ];
    }

    if(datosInsti.length == 5){
        for (x=0; x<datosInsti.length; x++){
            respuesta.push( {"DatosInstitucionales":{
                                        Institucion : window.localStorage.getItem('institucionPro'), 
                                        Provincia : window.localStorage.getItem('provinciaPro'), 
                                        Interior : window.localStorage.getItem('InteriorPro'),
                                        Zonadeotraprovincia : window.localStorage.getItem('InteriorPro'),
                                        Establecimiento : window.localStorage.getItem('establecimientoPro')
                                        }
                } 
              );            
            //document.write('Institución: ' + window.localStorage.getItem('institucionPro')  + '<br>');
            //document.write('Provincia: ' + window.localStorage.getItem('provinciaPro')  + '<br>');
            //document.write('Interior: ' + window.localStorage.getItem('InteriorPro')  + '<br>');
            //document.write('Zona de otra provincia: ' + window.localStorage.getItem('InteriorPro')  + '<br>');
            //document.write('Establecimiento: ' + window.localStorage.getItem('establecimientoPro')  + '<br>');
            break;
        }                                                
    }else if(datosInsti.length == 3){
                respuesta.push( {"DatosInstitucionales":{
                                        Institucion : window.localStorage.getItem('institucionPro'), 
                                        Provincia : window.localStorage.getItem('provinciaPro'),
                                        Establecimiento : window.localStorage.getItem('establecimientoPro')
                                        }
                } 
              );        
        //document.write('Institución: ' + window.localStorage.getItem('institucionPro')  + '<br>');
        //document.write('Provincia: ' + window.localStorage.getItem('provinciaPro')  + '<br>');
        //document.write('Establecimiento: ' + window.localStorage.getItem('establecimientoPro')  + '<br>');
    }

    var datosCargo = [
        window.localStorage.getItem('Docente'),
        window.localStorage.getItem('Directivo'),
        window.localStorage.getItem('Bibliotecario'),
        window.localStorage.getItem('otro')
    ];

    var cargoAA = [];
    //document.write('Cargo actual?: <br>');
    for (x=0; x<datosCargo.length; x++){
            if(datosCargo[x] == 'on'){
                if(x == 0){
                    var etiqueta = 'Docente';
                }else if(x == 1){
                    var etiqueta = 'Directivo';
                }else if(x == 2){
                    var etiqueta = 'Bibliotecario';
                }else if(x == 3){
                    var etiqueta = 'Otro';
                }
                cargoAA.push(etiqueta);
                //document.write('->' + etiqueta + '<br>');        
            }        
    }        
    //respuesta.push( { "RedesSociales" : redesS });
    respuesta.push( {"CargoActual": cargoAA} );

    var datosNivel = [
        window.localStorage.getItem('Inicial'),
        window.localStorage.getItem('PrimerCiclo'),
        window.localStorage.getItem('SegundoCiclo'),
        window.localStorage.getItem('SecunCicloBas'),
        window.localStorage.getItem('SecunCicloSup')
    ];
    //document.write('Nivel actual?: <br>');
    var nivelActual = [];
    for (x=0; x<datosNivel.length; x++){
        if(datosNivel[x] == 'on'){
                if(x == 0){
                    var etiqueta = 'Inicial';
                }else if(x == 1){
                    var etiqueta = 'Primer Ciclo';
                }else if(x == 2){
                    var etiqueta = 'Segundo Ciclo';
                }else if(x == 3){
                    var etiqueta = 'Secundaria Ciclo Básico';
                }else if(x == 4){
                    var etiqueta = 'Secundaria Ciclo Superior';
                }
                nivelActual.push(etiqueta);
                //document.write('->' + etiqueta + '<br>');        
            }
    }

    respuesta.push( {"NivelActual": nivelActual} );

    var datosArea = [
        window.localStorage.getItem('CienciasSoc'),
        window.localStorage.getItem('CienciasNat'),
        window.localStorage.getItem('Arte'),
        window.localStorage.getItem('LenYLit'),
        window.localStorage.getItem('Otra')        
    ];
    //document.write('Área actual?: <br>');

    var AreaActual = [];

    for (x=0; x<datosArea.length; x++){
        if(datosArea[x] == 'on'){
                if(x == 0){
                    var etiqueta = 'Ciencias Sociales';
                }else if(x == 1){
                    var etiqueta = 'Ciencias Naturales';
                }else if(x == 2){
                    var etiqueta = 'Arte';
                }else if(x == 3){
                    var etiqueta = 'Lengua y Literatura';
                }else if(x == 4){
                    var etiqueta = 'Otra';
                }
                AreaActual.push(etiqueta);
                //document.write('->' + etiqueta + '<br>');        
        
        if(x == 3){//Es Lengua y Literatura
                    respuesta.push( {"LenguayLiteratura":{
                                        UtilizaLibroDeTexto : window.localStorage.getItem('utilizaLibrosPro'), 
                                        PlanLectorAnual : window.localStorage.getItem('planLectorPro'),
                                        PerteneceAClasico : window.localStorage.getItem('pertenecenAClaPro'),
                                        Contemporanea : window.localStorage.getItem('contempoPro')
                                        }
                } 
              );

            //document.write('Utiliza libro de texto? ' + window.localStorage.getItem('utilizaLibrosPro')+' <br>');
            //document.write('Plan lector anual? ' + window.localStorage.getItem('planLectorPro')+' <br>');
            //document.write('Pertenecen a clásicos? ' + window.localStorage.getItem('pertenecenAClaPro')+' <br>');
            //document.write('Contemporáneos? ' + window.localStorage.getItem('contempoPro')+' <br>');

        var sugerencias = [
            window.localStorage.getItem('Mitos'),
            window.localStorage.getItem('Leyendas'),
            window.localStorage.getItem('Teatro'),
            window.localStorage.getItem('Poesia'),
            window.localStorage.getItem('Policiales'),
            window.localStorage.getItem('Aventuras'),
            window.localStorage.getItem('Humor'),
            window.localStorage.getItem('Clasicos')
        ];

        var suger = [];

        for (x=0; x<sugerencias.length; x++){
                if(x == 0){
                    var etiqueta = 'Mitos';
                }else if(x == 1){
                    var etiqueta = 'Leyendas';
                }else if(x == 2){
                    var etiqueta = 'Teatro';
                }else if(x == 3){
                    var etiqueta = 'Poesia';
                }else if(x == 4){
                    var etiqueta = 'Policiales';
                }else if(x == 5){
                    var etiqueta = 'Aventuras';
                }
                else if(x == 6){
                    var etiqueta = 'Humor';
                }
                else if(x == 7){
                    var etiqueta = 'Clasicos';
                }
                suger.push(etiqueta);         
        }
        respuesta.push( {"SugerenciaAlPLanLector": suger} );

        respuesta.push( {"TecnologiaEnElAula" : window.localStorage.getItem('usaTecnoPro')}); 
        }//Fin Lengua y Literatura    
              
        }
    }

    respuesta.push( {"AreaActual": AreaActual} );      

        var redeSociales = [
            window.localStorage.getItem('Facebook'),
            window.localStorage.getItem('Instagram'),
            window.localStorage.getItem('Twitter'),
            window.localStorage.getItem('Pinterest'),
            window.localStorage.getItem('YouTube')      
        ];
        
        var redesS=[];      
        
        for (x=0; x<redeSociales.length; x++){
            if(redeSociales[x] == 'on'){
                if(x == 0){
                    var etiqueta = 'Facebook';
                }else if(x == 1){
                    var etiqueta = 'Instagram';
                }else if(x == 2){
                    var etiqueta = 'Twitter';
                }else if(x == 3){
                    var etiqueta = 'Pinterest';
                }else if(x == 4){
                    var etiqueta = 'YouTube';
                }
                redesS.push(etiqueta);       
            }
        } 
    respuesta.push( { "RedesSociales" : redesS });
    }//Fin de Docente     
        break;
    }

    for(x=0; x<respuesta.length; x++){
        //document.write(respuesta[x]);
    }

    var db = window.openDatabase("MisEncuestas", "1.0", "Mi Encuesta", 200000);
    db.transaction(populateDBB, errorCB, successCBB);  
    window.localStorage.setItem('DataJSON', JSON.stringify(respuesta));
}


//BASE DE DATOS
function populateDBB(tx) {
        var encuuu =  window.localStorage.getItem('DataJSON');
        console.log(encuuu);
        tx.executeSql("INSERT INTO RESPUESTASS (RESPUESTA) VALUES ( '" + encuuu + "' ) ");     
    }

function successCBB() {
    window.localStorage.clear();
    location.reload();
}

function populateDB(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS RESPUESTASS ( " +
	                  "ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			          "RESPUESTA BLOB )");

        tx.executeSql("CREATE TABLE IF NOT EXISTS PADRES ( " +
	                  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			          "nombre VARCHAR(255), " +
                      "apellido VARCHAR(255), " +
                      "tel VARCHAR(255), " +
                      "email VARCHAR(255), " +
                      "edad VARCHAR(255), " +
					  "Estudiosfin	varchar(255),"+                      
                      "entidad VARCHAR(255), " +
                      "RangoEdadPadres VARCHAR(255), " +
                      "compraLibrosPadres VARCHAR(255), " +
                      "leeLibExtPadres VARCHAR(255), " +
                      "Librerias VARCHAR(255), " +
                      "Supermercado VARCHAR(255), " +
                      "OnLine VARCHAR(255), " +
                      "OtrosPad VARCHAR(255), " +
                      "ActPad VARCHAR(255), " +
                      "PintarPad VARCHAR(255), " +
                      "CocinaPad VARCHAR(255), " +          
                      "InteractivosPad VARCHAR(255), " +
                      "PerConPad VARCHAR(255), " +
                      "CuentosPad VARCHAR(255), " +
                      "IlustradorPad VARCHAR(255), " +
                      "ParaAdolPad VARCHAR(255), " +
                      "SagasPad VARCHAR(255), " +
                      "otroGeneroPro VARCHAR(255), " +
                      "regalaPadres VARCHAR(255), " +          
                      "Facebook VARCHAR(255), " +
                      "Instagram VARCHAR(255), " +
                      "Twitter VARCHAR(255), " +
                      "Pinterest VARCHAR(255), " +
                      "YouTube VARCHAR(255), " +
                      "finalizado VARCHAR(255) " +
                      ")");                  
    
tx.executeSql("CREATE TABLE IF NOT EXISTS DOCENTES ( " +
	                  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
					  "nombre varchar(255),"+
					  "apellido	varchar(255),"+
					  "tel varchar(255),"+
					  "email varchar(255),"+	
					  "edad varchar(255),"+
                      "entidad VARCHAR(255), " +	
					  "institucionPro varchar(255),"+	
					  "provinciaPro varchar(255),"+	
					  "InteriorPro varchar(255),"+	
					  "zonaProvinciaPro	varchar(255),"+
					  "establecimientoPro	varchar(255),"+
					  "Docente	varchar(255),"+
					  "Directivo	varchar(255),"+
					  "Bibliotecario	varchar(255),"+
					  "Otro	varchar(255),"+
					  "Inicial	varchar(255),"+
					  "PrimerCiclo	varchar(255),"+
					  "SegundoCiclo	varchar(255),"+
					  "SecunCicloBas	varchar(255),"+
					  "SecunCicloSup	varchar(255),"+
					  "CienciasSoc	varchar(255),"+
					  "CienciasNat	varchar(255),"+
					  "Arte	varchar(255),"+
					  "LenYLit	varchar(255),"+
					  "Otra	varchar(255),"+
					  "utilizaLibrosPro	varchar(255),"+
					  "planLectorPro	varchar(255),"+
					  "pertenecenAClaPro	varchar(255),"+
					  "contempoPro	varchar(255),"+
					  "Mitos	varchar(255),"+
					  "Leyendas	varchar(255),"+
					  "Teatro	varchar(255),"+
					  "Poesia	varchar(255),"+
					  "Policiales	varchar(255),"+
					  "Aventuras	varchar(255),"+
					  "Humor	varchar(255),"+
					  "Clasicos	varchar(255),"+
					  "usaTecnoPro	varchar(255),"+
					  "Facebook	varchar(255),"+
					  "Instagram	varchar(255),"+
					  "Twitter	varchar(255),"+
					  "Pinterest	varchar(255),"+
					  "YouTube varchar(255),"+
					  "Finalizado varchar(255)"+
					" )"); 
    }

function errorCB(err) {
    console.log(err);
        console.log("Error processing SQL: "+err.code);
    }

function successCB() {
        console.log("success!");
    }

function sendAll(){
    $("#enviarButtom").hide();
    $("#loader").html('<div class="col-25">enviando...<br><span class="preloader"></span></div>');
	muestroTodoEnvio();
}

function muestroTodoEnvio(){
	console.log('Acá vamos a mostrar todo lo que el tipo contó.');

	searchAllSend();

	function searchAllSend(){
          var dbe = window.openDatabase("MisEncuestas", "1.0", "Mi Encuesta", 200000);
          dbe.transaction(searchAllArtSend, errorCB);        
	}

	function searchAllArtSend(tx){
		tx.executeSql('select * from RESPUESTASS ', [], searchAllSuccessSend, errorCB);
	}

	function searchAllSuccessSend(tx, results){
		console.log('Arrancó la función searchEmpSuccess');
		if(results.rows.length == 0){
			myApp.alert('No hay resultados guardados aún.', ['Mensaje']);
		}else{
			myArrClone = [];
			for(var x=0; x<results.rows.length; x++){
				var invResult = results.rows.item(x);

				//Grabo en la consola el estado de los resultados.
				console.log('Encontre ID: ' + invResult.ID);
                console.log('Encontre RESPUESTA: ' + invResult.RESPUESTA);

				myArrClone.push({"id":invResult.ID,"respuesta":invResult.RESPUESTA});
			}
			
			var myJsonString = JSON.stringify(myArrClone);
			console.log(myJsonString);
            EnvioTodo(myJsonString,padr,doce);
		}
	}
}

function EnvioTodo(a){
	var a;
	console.log('Estoy enviando esto: '+ a);
    name = "Nico";
    var namesend = window.localStorage.getItem('namesend');
    var mailsend = window.localStorage.getItem('mailsend');     
    
    var http = new XMLHttpRequest();
    var url = "http://leocondori.com.ar/send2.php";

    var params = "name="+name+"&data="+a+"&namesend="+namesend+"&mailsend="+mailsend;
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.send(params);

    http.onreadystatechange = function() {
      if(http.readyState == 4 && http.status == 200){
        myApp.alert("Se envió mail correctamente", ['Mensaje']);
        $("#loader").html('');
        $("#enviarButtom").show();
      }
    }
}

//UPDATE or INSERT
function insertEncuesta(entidadx){
    searchAllSend();
    function searchAllSend(){
        var dbe = window.openDatabase("MisEncuestas", "1.0", "Mi Encuesta", 200000);
        dbe.transaction(searchAllArtSend, errorCB);        
    }

    function searchAllArtSend(tx){
        if (entidadx == 'Padre'){
        tx.executeSql("select * from PADRES where IFNULL(Nombre,'') = '' ", [], function (tx, results) {
						var len = results.rows.length;	
						if((len==0) || (len==null)){			
							tx.executeSql("insert into PADRES (entidad) values ('" + entidadx + "')");
                            tx.executeSql("select MAX(id) as ID from PADRES", [], function (tx, results) {
                            window.localStorage.setItem("IDEncuesta", results.rows.item(0).ID);                      
                            }, null);						
                        }else if( (window.localStorage.getItem("IDEncuesta") == null) 
                                   || (window.localStorage.getItem("IDEncuesta") == undefined) 
                                   || (window.localStorage.getItem("IDEncuesta") == '') ) {
                            tx.executeSql("select MAX(id) as ID from PADRES", [], function (tx, results) {
                            window.localStorage.setItem("IDEncuesta", results.rows.item(0).ID);                      
                            }, null);
                        }						
		}, null);

        
        }else if(entidadx == 'Docente'){
            tx.executeSql("select * from DOCENTES where IFNULL(Nombre,'') = '' ", [], function (tx, results) {
						var len = results.rows.length;
						if((len==0) || (len==null)){		
                            tx.executeSql("insert into DOCENTES (entidad) values ('" + entidadx + "') ");
                            tx.executeSql("select MAX(id) as ID from DOCENTES", [], function (tx, results) {
                            window.localStorage.setItem("IDEncuesta", results.rows.item(0).ID);                
                             }, null);                            
                        }
            }, null);
        }

    }
}

//UPDATE
function updateEncuesta(entidadx, id, valor){
  console.log('entidadx ' + entidadx);
  console.log('id ' + id);
  console.log('valor ' + valor);  
    UpDateEncuestaa();
    
    var idOn = window.localStorage.getItem("IDEncuesta");

    function UpDateEncuestaa(){
        var dbe = window.openDatabase("MisEncuestas", "1.0", "Mi Encuesta", 200000);
        dbe.transaction(searchAllArtSend, errorCB);        
    }

    function searchAllArtSend(tx){
        if (entidadx == 'Padre'){
                      //UPDATE PADRES set nombre = 'PadrePedro' where id = '1'    
        tx.executeSql("update PADRES set " + id + "='" + valor + "' where id = '"+ idOn+"' " , [], function (tx, results) {
                        console.log('Se actualizó PADRES para la encuesta con exito.' + id + ' con valor' + valor + ' para este ID' + idOn  );
					}, null);
        
        }else if(entidadx == 'Docente'){
        //UPDATE PADRES set entidad = 'PadrePedro' where id = '1'    
            tx.executeSql("update DOCENTES set " + id + "= '" + valor + "' where id = '"+ idOn+"' " , [], function (tx, results) {
                        console.log('Se actualizó DOCENTES para la encuesta con exito.' + id + ' con valor' + valor + ' para este ID' + idOn  );
            }, null);

        }

    }

}


//DELETE
function delEncuesta(entidadx, id){
  console.log('entidadx ' + entidadx);
  console.log('id ' + id); 
  
  DeleteEncuestaa();

    function DeleteEncuestaa(){
        var dbe = window.openDatabase("MisEncuestas", "1.0", "Mi Encuesta", 200000);
        dbe.transaction(searchAllArtSend, errorCB);        
    }

    function searchAllArtSend(tx){
        if (entidadx == 'Padre'){
        tx.executeSql("DELETE FROM PADRES WHERE ID = " + id , [], function (tx, results) {
					}, null);
        
        }else if(entidadx == 'Docente'){
            tx.executeSql("DELETE FROM DOCENTES WHERE ID = " + id , [], function (tx, results) {
            }, null);

        }

    }

}