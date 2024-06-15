var form = document.querySelector("#formRegistro");
document.querySelector("#formRegistro").addEventListener('submit', validar);
let enlaceJ = document.getElementById("agregar");
let contadorJugadores = 0;
let letra = /^[a-z ,.'-]+$/i;// letrasyespacio   ///^[A-Z]+$/i;// solo letras

function validar(event){
    var resultado = true;
    //obtener elementos a validar de la pagina REGISTRAR
    let txtNombreE = document.getElementById("nombreE");
    var txtFecha = document.getElementById("fechaF");
    var txtDirector = document.getElementById("director");
    var txtCantidad = document.getElementById("cantidad");
    var txtLogros = document.getElementById("logros");
    var radiosCategoria = document.getElementsByName("categoria");
    
    var numeroreg = /^[0-9]{10}$/g; // para validar datos que deban tener 10 numeros
    limpiarMensajes();

    //nombre de Equipo
    if (txtNombreE.value === ''){
        resultado = false;
        mensaje("Ingresar nombre", txtNombreE);

    } else if (!letra.test(txtNombreE.value)){
        resultado = false;
        mensaje("El nombre solo debe contener letras",txtNombreE);

    }else if (txtNombreE.value.length > 40){
        resultado = false;
        mensaje("Nombre maximo de 40 caracteres", txtNombreE);
    }
   
    //nombre director
    if (txtDirector.value === ''){
        resultado = false;
        mensaje("Ingresar nombre del director", txtDirector);

    } else if (!letra.test(txtDirector.value)){
        resultado = false;
        mensaje("El nombre solo debe contener letras",txtDirector);

    }else if (txtDirector.value.length > 30){
        resultado = false;
        mensaje("Nombre maximo de 30 caracteres", txtDirector);
    }

    //logros    
    if (txtLogros.value.trim() === '') {
        resultado=false;
        mensaje("Ingresar logros",txtLogros);
    } else if (txtLogros.value.length > 120) {
        resultado=false;
        mensaje("Maximo 120 caracteres",txtLogros);
    } 

    //validación cantidad
    let cantidadJ = parseInt(txtCantidad.value);
    if(txtCantidad.value === ""){
        resultado = false;
        mensaje("Ingresar cantidad", txtCantidad);
    }else if (isNaN(cantidadJ)){
        resultado = false;
        mensaje("Cantidad debe ser un numero",txtCantidad);
    }else if(cantidadJ<11 || cantidadJ>=20){
        resultado=false;
        mensaje("Cantidad debe ser entre 11 y 20",txtCantidad);
    }

    //validacion radio
    let selR = false;
    for (let i = 0; i < radiosCategoria.length; i++) {
        if (radiosCategoria[i].checked) {
            selR = true;
            let res = radiosCategoria[i].value;
            break;
        }
    }
    if (!selR) {
        resultado = false;
        mensaje("Seleccione una categoria", radiosCategoria[0]);
    }
   
    //validar fecha
    var datoR = txtFecha.value;
    var fechaR = new Date(datoR);
    var anioR = fechaR.getFullYear();

    var fechaActualR = new Date();
    var anioR = fechaActualR.getFullYear();

    if (!datoR) {
        resultado = false;
        mensaje("Debe ingresar una fecha", txtFecha);
    }else if (fechaR > fechaActualR) {
        resultado = false;
        mensaje("Fecha no puede ser superior a la actual", txtFecha);
    }

    if (contadorJugadores === 0) {
        alert("Debe agregar los jugadores");
        resultado= false;
    }else if(contadorJugadores != txtCantidad.value) {
        alert("Faltan jugadores por agregar");
        resultado= false;
    }


    if (!resultado) {
        event.preventDefault();
    }
}
enlaceJ.addEventListener("click", function(e){
    var resultado = true;

    //obtener elementos   
    var txtNombreJ = document.getElementById("nombreJ");
    var txtApellidoJ = document.getElementById("apellidoJ");
    var txtEdadJ = document.getElementById("edad");
    var selectPosicion = document.getElementById("posicion");
    var checkboxHabilidades = document.querySelectorAll(".hab");

    limpiarMensajes();
    //validar
    //nombre y apellido jugador
    if (txtNombreJ.value === ''){
        resultado = false;
        mensaje("Ingresar nombre", txtNombreJ);

    } else if (!letra.test(txtNombreJ.value)){
        resultado = false;
        mensaje("El nombre solo debe contener letras",txtNombreJ);

    }else if (txtNombreJ.value.length > 15){
        resultado = false;
        mensaje("Nombre maximo de 15 caracteres", txtNombreJ);
    }

    if (txtApellidoJ.value === ''){
        resultado = false;
        mensaje("Ingresar apellido", txtApellidoJ);

    } else if (!letra.test(txtApellidoJ.value)){
        resultado = false;
        mensaje("El apellido solo debe contener letras",txtApellidoJ);

    }else if (txtApellidoJ.value.length > 15){
        resultado = false;
        mensaje("Apellido maximo de 15 caracteres", txtApellidoJ);
    }

     //Validacion edad
    //convertir string a  num 
    let edadJ = parseInt(txtEdadJ.value);

    if(txtEdadJ.value === ""){
        resultado = false;
        mensaje("Ingresar edad", txtEdadJ);
    }else if (isNaN(edadJ)){
        resultado = false;
        mensaje("Edad debe ser un numero",txtEdadJ);
    }else if(edadJ<16 || edadJ>=50){
        resultado=false;
        mensaje("Edad debe ser entre 16 y 49",txtEdadJ);
    }

    //validacion select
    if(selectPosicion.value === null || selectPosicion.value ==='0'){
        resultado = false;
        mensaje("Debe seleccionar categoría", selectPosicion);
    }
    
    //validar checkbox de HABILIDADES
    selR = false;
    let coR = 0;
    for (let i = 0; i < checkboxHabilidades.length; i++) {
        if (checkboxHabilidades[i].checked) {
            coR++;
            selR = true;
            break;
        }
    }
    if (!selR) {
        resultado = false;
        mensaje("Debe seleccionar al menos una opcion", checkboxHabilidades[0]);
    }

    // Verificar cantidad de jugadores
    let cantidadJugadores = parseInt(document.getElementById("cantidad").value);
    if (contadorJugadores >= cantidadJugadores) {
        alert("Ya has ingresado la cantidad máxima de jugadores.");
        resultado = false;
    }

    if (!resultado) {
        e.preventDefault();
    }else{
        let divContenedor=document.getElementById("contenedorJ");
        //crear los nuevos elementos
        let nododiv=document.createElement("div");
        nododiv.classList.add("jugadoresContenedor");
        nododiv.classList.add("col-md-4");
        divContenedor.appendChild(nododiv);
    
        let nodoNombre = document.createElement("p");
        nodoNombre.classList.add("nombreJ");
        nodoNombre.textContent = "Nombre: "+txtNombreJ.value;
        nododiv.appendChild(nodoNombre);

        let nodoApellido= document.createElement("p");
        nodoApellido.classList.add("apellidoJ");
        nodoApellido.textContent = "Apellido: "+txtApellidoJ.value;
        nododiv.appendChild(nodoApellido);

        let nodoEdad= document.createElement("p");
        nodoEdad.classList.add("edad");
        nodoEdad.textContent = "Edad: "+txtEdadJ.value;
        nododiv.appendChild(nodoEdad);

        let nodoPosicion = document.createElement("p");
        nodoPosicion.classList.add("posicion");
        nodoPosicion.textContent = "Posición: " + selectPosicion.options[selectPosicion.selectedIndex].text;
        nododiv.appendChild(nodoPosicion);

        txtApellidoJ.value = '';
        txtNombreJ.value = '';
        txtEdadJ.value = '';
        selectPosicion.selectedIndex = 0;
        checkboxHabilidades.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        

        contadorJugadores++;
        document.getElementById("contadorJugadores").textContent = "Jugadores Agregados: "+contadorJugadores;
    }
});

function mensaje(cadenaMensaje, elemento) {
    elemento.focus();
    var nodoPadre = elemento.parentNode;
    var nodoMensaje = document.createElement("span");
    nodoMensaje.textContent = cadenaMensaje;
    nodoMensaje.className = "mensajeError";
    nodoPadre.appendChild(nodoMensaje);
};
function limpiarMensajes() {
    var mensajes = document.querySelectorAll(".mensajeError");// retorna un arreglo
    for (let i = 0; i < mensajes.length; i++) {
        mensajes[i].remove();// remueve o elimina un elemento de mi doc html
    }

}
document.getElementById("cantidad").addEventListener("keypress", soloNumeros);
document.getElementById("edad").addEventListener("keypress", soloNumeros);
    
function soloNumeros(e){
    let key= e.keyCode;
    if(key <48 || key >57){
        e.preventDefault();//detengo el evento keypress
    }
    if(e.target.value.length >=2){
        e.preventDefault();//Detengo para que no puedan ingresarse mas de 5
    }
}


