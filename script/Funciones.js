
//VARIABLES GLOBALES
var posArray=0;
var arraycookies =  new Array();
var w=0; //cada vez que se mete una nueva cookie en el array se suma(en la funcion registerFormCookies) para actualizar la posicion

var arraycookiesEventos =  new Array();
var indexEventos=0;
var likeGlobal;

var arraycookiesCategorias =  new Array();
var indexCategorias=0;

var email_iniciado;
var categoria_seleccionada;

/*PopUp de confirmación para cerrar un Evento*/
function ConfirmacionDeCierre(ID) {
    contenedor= document.getElementById(ID);
    var opcion = confirm("¿Desea cerrar este evento?");
    if (opcion == true) {
      contenedor.style.display="none";
    }
  }
                                                                        /*BOTONES INFERIORES DE EVENTO*/
                                                                        /*DAR LIKE*/
function PonerMeGusta(button){
		var eventoSelecionado=$(button).closest(".Evento").attr('id');

		for(var j=0;j<arraycookiesEventos.length;j++){
	  //me quedo con el email de quien añadio cada categoria

	  busca_email=arraycookiesEventos[j].substring(arraycookiesEventos[j].indexOf("&email=")+7,arraycookiesEventos[j].indexOf("&MeGusta="));
	  busca_evento=arraycookiesEventos[j].substring(arraycookiesEventos[j].indexOf("nombreEvento=")+13,arraycookiesEventos[j].indexOf("&nombreCategoria="));



	  //voy a coger toda las categorias SOLO del usuario con sesion iniciada
	  if(busca_email==email_iniciado && busca_evento==eventoSelecionado){

  		 if(button.className== "far fa-thumbs-up"){
  			button.className="fas fa-thumbs-up";
  			arraycookiesEventos[j]=arraycookiesEventos[j].replace("&MeGusta=false","&MeGusta=true");
        }
  		else{
          button.className="far fa-thumbs-up";
  			arraycookiesEventos[j]=arraycookiesEventos[j].replace("&MeGusta=true","&MeGusta=false");
          }


          //Actualizamos la cookie de los eventos porque se actualiza el array
          var json_str = JSON.stringify(arraycookiesEventos);
          createCookie('eventos', json_str);
	  }

	}

    }


                                                                /*POP UP COMPARTIR EVENTO*/
function CompartirEvento(){
var popUp=document.getElementById("PopUpCompartirEvento");
popUp.style.display="block";
activarBlur();
ListenerCompartirEvento();
var form=document.getElementById("InvitarUsuarioExterno");
form.reset();

}
function ListenerCompartirEvento(){
document.addEventListener('click', function(event){
var isClickInside = event.target.closest("section");
if(isClickInside==null){
var isButton = event.target.closest("button");
if(isButton==null && event.target.className!="tooltip"){
cerrarPopUp("PopUpCompartirEvento");
}
}
});
}


function InvitarUsuarioExterno(form){
var form_InvitarUsuarioExterno=document.getElementById(form);
var email= form_InvitarUsuarioExterno.email;
var patEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if(!patEmail.test(String(email.value).toLowerCase())){
alert("Formato de email incorrecto");
email.style.border="1px solid red";
return false;
}
else{
form_InvitarUsuarioExterno.reset();
cerrarPopUp("PopUpCompartirEvento");
abrirPopUp("PopUpInvitacionEnviada");
return false;
}

}

                                                          /*COLABORADORES*/
function Colaboradores(){
  abrirPopUp("PopUpColaboradores");
  activarBlur();

}




                                                                        /* EFECTOS BLUR */
function activarBlur(){
var containers=document.getElementsByClassName("flex-container");
var headerConUsusario=document.getElementById("headerPaginaConUsuario");
var headerSinUsusario=document.getElementById("headerPaginaSinUsuario");
var categoria=document.getElementById("divAñadirCategoria");
var footer=document.getElementById("myFooter");

headerConUsusario.classList.add("blur");
headerSinUsusario.classList.add("blur");
categoria.classList.add("blur");
footer.classList.add("blur");
for(var i=0;i<containers.length;i++){
containers[i].classList.add("blur");
}
}

function desactivarBlur(){
/*Quitaremos el efecto borroso a los elementos*/
var containers=document.getElementsByClassName("flex-container");
for(var i=0;i<containers.length;i++){
containers[i].classList.remove("blur");
}
var headerConUsusario=document.getElementById("headerPaginaConUsuario");
var headerSinUsusario=document.getElementById("headerPaginaSinUsuario");
var categoria=document.getElementById("divAñadirCategoria");
var signup=document.getElementById("signup_form");
var signin=document.getElementById("signin_form");

var footer=document.getElementById("myFooter");

categoria.classList.remove("blur");
headerConUsusario.classList.remove("blur");
headerSinUsusario.classList.remove("blur");
signup.classList.remove("blur");
signin.classList.remove("blur");
footer.classList.remove("blur");
}





                                                                            /*BOTON AÑADIR CATEGORIA*/
  /*PopUp cuando clickas el boton añadir categoria*/
function AñadirCategoria(elmnt) {
	//cogemos el id de la categoria. Nos sera util para saber en que categoria añadimos los eventos
    /*Ponemos que el popUp sea visible*/
    var popUpTextNewCategory = document.getElementById("popUpTextNewCategory");
    popUpTextNewCategory.style.display="block";
    var container=document.getElementById("fullscreen-container2");
    container.style.display="block";
    activarBlur();
    /*Cerrar evento si se hace click fuera*/
    //var specifiedElement = document.getElementById("popUpTextNewCategory");
    ListenerNewCategory();
    form_añadirCategoria=document.getElementById("newCategory");
    form_añadirCategoria.reset();
    return false;

  }


  function ListenerNewCategory(){
  document.addEventListener('click', function(event){
    var popUp=document.getElementById("popUpTextNewCategory");
    var isClickInside = event.target.closest("section");
    if(isClickInside==null){
      var isButton = event.target.closest("button");
      if(isButton==null && event.target.className!="AñadirCategoria"){
        CerrarCategoriaPopUp();
      }
    }
  });
}

/*Funcion para cerrar el popUp de compartir*/
function CerrarCategoriaPopUp(){
        /*Diremos que el popUp no sea visible*/
        var popUp=document.getElementById("popUpTextNewCategory");
        popUp.style.display="none";
        var container=document.getElementById("fullscreen-container2");
        container.style.display="none";
        desactivarBlur();
      }





                                                                        /* FUNCIONES LISTA TRES PUNTITOS */
                                                                            /*BOTON AÑADIR EVENTO*/
/*PopUp cuando clickas el boton añadir evento*/
function AñadirEvento(elmnt) {

    var contenedorPequeño= $(elmnt).closest(".flex-container");
    var menu= contenedorPequeño[0].getElementsByClassName("dropdown-content")[0];
    menu.classList.toggle("visible");
    categoria_seleccionada=$(elmnt).closest(".flex-container").attr('id');
    /*Ponemos que el popUp sea visible*/
    var popUpTextNewEvent = document.getElementById("popUpTextNewEvent");
    popUpTextNewEvent.style.display="block";
    var container=document.getElementById("fullscreen-container3");
    container.style.display="block";
    activarBlur();
    /*Cerrar evento si se hace click fuera*/
    //var specifiedElement = document.getElementById("popUpTextNewEvent");
    ListenerNewEvent();
    var form=document.getElementById("newEvent");
    form.reset();
    return false;


  }


  function ListenerNewEvent(){
  document.addEventListener('click', function(event){
    var popUp=document.getElementById("popUpTextNewEvent");
    var isClickInside = event.target.closest("section");
    if(isClickInside==null){
      var isButton = event.target.closest("button");
      if(isButton==null && event.target.className!="tooltip"){
        CerrarEventPopUp();
      }
    }
  });
}

/*Funcion para cerrar el popUp de compartir*/
function CerrarEventPopUp(){
        /*Diremos que el popUp no sea visible*/
        var popUp=document.getElementById("popUpTextNewEvent");
        popUp.style.display="none";
        var container=document.getElementById("fullscreen-container3");
        container.style.display="none";
        desactivarBlur();
      }


                                                            /*POP UPS ABRIR Y CERRAR*/
function cerrarPopUp(popUp){
  var popUpCerrar=document.getElementById(popUp);
  popUpCerrar.style.display="none";
  desactivarBlur();
}
function abrirPopUp(popUp){
  var popUpCerrar=document.getElementById(popUp);
  popUpCerrar.style.display="block";
  activarBlur();
}



                                                              /* POP UP NUEVO USUARIO REGISTRADO */
function lanzarPopUpUsuarioRegistrado(){
  var popUp=document.getElementById("PopUpUsuarioRegistrado");
  popUp.style.display="block";
  activarBlur();
  var signup=document.getElementById("signup_form");
  signup.classList.add("blur");
}

function ListenerPopUpUsuarioRegistrado(){
document.addEventListener('click', function(event){
  var popUp=document.getElementById("popUpTextNewEvent");
  var isClickInside = event.target.closest("form");
  if(isClickInside==null){
    var isButton = event.target.closest("button");
    if(isButton==null && event.target.className!="signupbtn"){
      CerrarlanzarPopUpUsuarioRegistrado();
    }
  }
});
}
function CerrarlanzarPopUpUsuarioRegistrado(){
  var popUp=document.getElementById("PopUpUsuarioRegistrado");
  popUp.style.display="none";
  var profile=document.getElementById("profile_form");
  profile.classList.remove("blur");
  activarBlur();
}




  /* ARCHIVAR LISTA */
  function archivar(ID){
      contenedor= document.getElementById(ID);
      var opcion = confirm("¿Desea archivar esta lista?");
      if (opcion == true) {
        contenedor.style.display="none";
      }
      var contenedorPequeño=document.getElementById(ID);
      var menu= contenedorPequeño.getElementsByClassName("dropdown-content");
      menu[0].style.display = "none";

    }
  /*Desplegar el menu de los tres puntitos*/
  function desplegarMenu(ID){
      //var contenedorPequeño=document.getElementById(ID);
  	var contenedorPequeño= $(ID).closest(".flex-container");
      var menu= contenedorPequeño[0].getElementsByClassName("dropdown-content")[0];
      menu.classList.toggle("visible");
      //Miraremos la posición del click para que el menu no aparezca fuera de la pantalla
      document.addEventListener('click', function(evt) {
      var mousePos = evt.clientX;
      if(mousePos>=1000){
        menu.classList.add("Coreccion-MenuDesplegable");

      }
    });
  }


                                                                        /* CAMBIO ENTRE PÁGINAS */
/*Para cambiar de cualquier pagina a SignOut*/
function pasarPaginaSignOut(){
  /*Cabecera*/
  var headerConUsusario=document.getElementById("headerPaginaConUsuario");
  headerConUsusario.style.display="none";
  var headerSinUsusario=document.getElementById("headerPaginaSinUsuario");
  headerSinUsusario.style.display="none";
  var footer=document.getElementById("myFooter");
  footer.style.display="none";

  /*Parte inferior*/
  var parteInferiorPaginaInicial=document.getElementById("PaginaPrincipalLogOut");
  parteInferiorPaginaInicial.style.display="block";

  document.getElementById("divAñadirCategoria").style.display="none";

  //IMPORTANTE: CADA VEZ QUE SE HACE LOG OUT SE LIMPIA EL DIV HOME. CUANDO SE VUELVA A INICIAR SESIÓN HABRÁ QUE VOLVER A ESCRIBIR TODO
  document.getElementById("Home").innerHTML="";
  var parteInferiorProfile=document.getElementById("EditProfile");
  parteInferiorProfile.style.display="none";
  var parteInferiorSignUp=document.getElementById("signup_form");
  parteInferiorSignUp.style.display="none";
  var parteInferiorSignIn=document.getElementById("signin_form");
  parteInferiorSignIn.style.display="none";
}


/*Para cambiar de cualquier pagina a SignIn*/
function pasarPaginaSignIn(){
  /*Parte inferior*/

    recuperarArrays();
  var parteInferiorConUsuario=document.getElementById("Home");
  parteInferiorConUsuario.style.display="none";
  var parteInferiorSignUp=document.getElementById("signup_form");
  parteInferiorSignUp.style.display="none";
  var parteInferiorSignIn=document.getElementById("signin_form");
  parteInferiorSignIn.style.display="block";
  var headerSinUsuario=document.getElementById("headerPaginaSinUsuario");
  headerSinUsuario.style.display="block";
  var parteInferiorPaginaInicial=document.getElementById("PaginaPrincipalLogOut");
  parteInferiorPaginaInicial.style.display="none";
  var footer=document.getElementById("myFooter");
  footer.style.display="block";
  desactivarBlur();
  document.getElementById("PopUpUsuarioRegistrado").style.display="none";

  var form_signUp=document.getElementById("signup");
  form_signUp.reset();

}

/*Para cambiar de cualquier pagina a SignUp*/
function pasarPaginaSignUp(){
  /*Parte inferior*/

  recuperarArrays();
  var parteInferiorConUsuario=document.getElementById("Home");
  parteInferiorConUsuario.style.display="none";
  var parteInferiorSignIn=document.getElementById("signin_form");
  parteInferiorSignIn.style.display="none";
  var parteInferiorSignUp=document.getElementById("signup_form");
  parteInferiorSignUp.style.display="block";
  var headerSinUsuario=document.getElementById("headerPaginaSinUsuario");
  headerSinUsuario.style.display="block";
  var parteInferiorPaginaInicial=document.getElementById("PaginaPrincipalLogOut");
  parteInferiorPaginaInicial.style.display="none";
  var footer=document.getElementById("myFooter");
  footer.style.display="block";
  desactivarBlur();
  var form_signIn=document.getElementById("signIn");
  form_signIn.reset();

}
                                                          /*SECCIÓN DE PROFILE*/
function PasarProfile(){
  email_iniciado
  var profile_form=document.getElementById("profile_form");
  /*Cabecera*/
  var navHome=document.getElementById("HomeNavBarConUsuario");
  navHome.style.display="none";
  var navHome=document.getElementById("divAñadirCategoria");
  navHome.style.display="none";
  var navProfile=document.getElementById("navBarProfile");
  navProfile.style.display="block";


  document.getElementById("Username").innerHTML =arraycookies[posArray].substring(arraycookies[posArray].indexOf("username=")+9,arraycookies[posArray].indexOf("&contraseña="));
  /*Parte inferior*/
  var parteInferiorConUsuario=document.getElementById("Home");
  parteInferiorConUsuario.style.display="none";
  var parteInferiorProfile=document.getElementById("EditProfile");
  parteInferiorProfile.style.display="block";

  // Rellenar campos de la form
  profile_form.username.value = arraycookies[posArray].substring(arraycookies[posArray].indexOf("username=")+9,arraycookies[posArray].indexOf("&contraseña="));
  profile_form.psw.value = arraycookies[posArray].substring(arraycookies[posArray].indexOf("&contraseña=")+12,arraycookies[posArray].indexOf("&email="));
  profile_form.email.value = email_iniciado;
}

//Guardamos los cambios que realicen en el profile
function saveChanges(profile_form){
  profile=document.getElementById(profile_form);
  //Guardamos los nuevos valores
  var username = arraycookies[posArray].substring(arraycookies[posArray].indexOf("username=")+9,arraycookies[posArray].indexOf("&contraseña="));
  console.log("actual:"+ username);
  console.log("cambia a:"+profile.username.value);
  arraycookies[posArray]=arraycookies[posArray].replace("username="+ username,"username="+profile.username.value);
  var contraseña = arraycookies[posArray].substring(arraycookies[posArray].indexOf("&contraseña=")+12,arraycookies[posArray].indexOf("&email="));
  arraycookies[posArray]=arraycookies[posArray].replace("&contraseña="+ contraseña,"&contraseña="+profile.psw.value);

  //Los escribimos en el profile
  profile.username.value = arraycookies[posArray].substring(arraycookies[posArray].indexOf("username=")+9,arraycookies[posArray].indexOf("&contraseña="));
  profile.psw.value = arraycookies[posArray].substring(arraycookies[posArray].indexOf("&contraseña=")+12,arraycookies[posArray].indexOf("&email="));
  profile.email.value = email_iniciado;
  //Cambiamos el nombre de usuario que se muestra en la pagina
  document.getElementById("Username").innerHTML =arraycookies[posArray].substring(arraycookies[posArray].indexOf("username=")+9,arraycookies[posArray].indexOf("&contraseña="));
console.log(arraycookies[posArray]);
  alert("Changes saved");


}

                                                    /*FUNCIÓN PARA PASAR LAS COOKIES A LOS ARRAYS*/
function recuperarArrays(){

	var json_str = getCookie('usuarios');
	if(json_str.length!=0){
  arraycookies = JSON.parse(json_str);

	}

	var json_str2 = getCookie('eventos');
	if(json_str2.length!=0){
  arraycookiesEventos = JSON.parse(json_str2);

	}

	var json_str3 = getCookie('categorias');
	if(json_str3.length!=0){
  arraycookiesCategorias = JSON.parse(json_str3);

	}
}
                                                        /*PÁGINA PRINCIPAL CON USUARIO --> RECUPERAMOS TODOS LOS DATOS*/
/*Para cambiar de cualquier pagina a la página principal de usuario*/
function IniciarSesion(){
  /*Cabecera*/
  var headerSinUsuario=document.getElementById("headerPaginaSinUsuario");
  headerSinUsuario.style.display="none";
  var headerConUsusario=document.getElementById("headerPaginaConUsuario");
  headerConUsusario.style.display="block";


  document.getElementById("divAñadirCategoria").style.display="block";

  /* RECARGAMOS LA PAGINA DEL USUARIO QUE HA INICIADO SESION */
  //PARA ESCRIBIR EL NOMBRE DEL USUARIO EN EL HEADER AL INICIAR SESION
  document.getElementById("Username").innerHTML =
  arraycookies[posArray].substring(arraycookies[posArray].indexOf("username=")+9,arraycookies[posArray].indexOf("&contraseña="));
  //PARA VOLVER A ESCRIBIR LAS CATEGORIAS DEL USUARIO AL VOLVER A INICIAR SESION
  var busca_email;
  var categoria;
  /*Añado las categorias que tenga el usuario */
  for(var j=0;j<arraycookiesCategorias.length;j++){
	  busca_email=arraycookiesCategorias[j].substring(arraycookiesCategorias[j].indexOf("&email=")+7,arraycookiesCategorias[j].length);
      //Buscamos el usuario que acaba de iniciar sesion
  	  if(busca_email==email_iniciado){
      //Añadimos sus categorias
  		categoria=arraycookiesCategorias[j].substring(arraycookiesCategorias[j].indexOf("nombreCategoria=")+16,arraycookiesCategorias[j].indexOf("&email="));
  		addDivCategory(categoria);
  	  }
	}

	var evento;
  /* Añado los eventos del usuario */
	for(var j=0;j<arraycookiesEventos.length;j++){
	  //me quedo con el email de quien añadio cada categoria
	  busca_email=arraycookiesEventos[j].substring(arraycookiesEventos[j].indexOf("&email=")+7,arraycookiesEventos[j].indexOf("&MeGusta="));
	  //voy a coger todos los eventos SOLO del usuario con sesion iniciada
	  if(busca_email==email_iniciado){
  		evento=arraycookiesEventos[j].substring(arraycookiesEventos[j].indexOf("nombreEvento=")+13,arraycookiesEventos[j].indexOf("&nombreCategoria="));
  		likeGlobal=arraycookiesEventos[j].substring(arraycookiesEventos[j].indexOf("&MeGusta=")+9,arraycookiesEventos[j].length);
  		categoria_seleccionada=arraycookiesEventos[j].substring(arraycookiesEventos[j].indexOf("&nombreCategoria=")+17,arraycookiesEventos[j].indexOf("&email="));
  		//vuelvo a escribir todas las categorias que tenia el usuario
  		addDivEvent(evento);
	  }
	}

  var navProfile=document.getElementById("navBarProfile");
  navProfile.style.display="none";
  var navHome=document.getElementById("HomeNavBarConUsuario");
  navHome.style.display="block";
  /*Parte inferior*/
  var parteInferiorConUsuario=document.getElementById("Home");
  parteInferiorConUsuario.style.display="flex";
  var parteInferiorSignIn=document.getElementById("signin_form");
  parteInferiorSignIn.style.display="none";
  var parteInferiorSignUp=document.getElementById("signup_form");
  parteInferiorSignUp.style.display="none";
  var parteInferiorProfile=document.getElementById("EditProfile");
  parteInferiorProfile.style.display="none";
}

                                                    /*FUNCIONES PARA COMPROBAR LOS CAMPOS DEL REGISTRO */
function checkName(form){
  var signUp=document.getElementById(form);

var username = signUp.username;
if(username.length<1){
  username.style.border="1px solid red";
  comprobante=0;
  return false;
}
else {
  username.style.border="2px solid green";
}
}


function checkPassword(){

var password = document.getElementById("pswRegister");
if (password.value == "" ) {
    password.style.border="1px solid red";
    comprobante=0;
    return false;
}
else if(password.value.length > 8 ) {
    password.style.border="1px solid red";
    comprobante=0;
    return false;
}

else {
  password.style.border="2px solid green";
}
}



function checkEmail(form){
  var signUp=document.getElementById(form);
  var patEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var email = signUp.email;
if(!patEmail.test(String(email.value).toLowerCase())){
  email.style.border="1px solid red";
  comprobante=0;
  return false;
}
if(patEmail.test(String(email.value).toLowerCase())){
  email.style.border="2px solid green";
}
}
                                                                            /*REGISTRO DEL USUARIO*/
//FUNCION MODIFICADA
function CheckLabels(form){
  var signUp=document.getElementById(form);
  /*Creamos un expresion regular para comparar el texto con un patron, diremos que se pueden utilizar mayusculas, minusculas y digitos*/
  var patpass = new RegExp ("^[a-z0-9]+");
  var patEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var comprobante= 1;

  var username = signUp.username;
  var password = document.getElementById("pswRegister");
  var email= signUp.email;


    //Campos obligatorios
    if(username.value == ""){
      alert("Enter your username");
      username.style.border="1px solid red";
      comprobante=0;
      return false;
    }
    else {
      username.style.border="2px solid green";
    }

    // Longitud minima de 8 caracteres
    if (password.value == "" ) {
        alert("Enter your password");
        password.style.border="1px solid red";
        comprobante=0;
        return false;
    }
    else if(password.value.length > 8 ) {
        alert("The password must be less than 8 characters long");
        password.style.border="1px solid red";
        comprobante=0;
        return false;
    }
    else if(!patpass.test(password.value)){
        alert("The password contains invalid characters");
        password.style.border="1px solid red";
        comprobante=0;
        return false;
    }
    else {
      password.style.border="2px solid green";
    }


    if(!patEmail.test(String(email.value).toLowerCase())){
      alert("Invalid e-mail");
      email.style.border="1px solid red";
      comprobante=0;
      return false;
    }
    if(patEmail.test(String(email.value).toLowerCase())){
      email.style.border="2px solid green";
    }

    if(!agreement.checked) {
        alert("Check the agreement to terms and conditions box");
        agreement.style.border="1px solid red";
        comprobante=0;
        return false;
    }
    else {
      agreement.style.border="2px solid green";
    }

    if (comprobante == 1){
      registerFormCookies(signUp);

      return false;
    }
  }


                                                                          /*GUARDAMOS EL REGISTRO SI NO EXISTE*/
//FUNCION MODIFICADA
function registerFormCookies(signUp) {
  var username = signUp.username;
  var password = document.getElementById("pswRegister");

  var email= signUp.email;
  var agreement = signUp.agreement;
  var res=comprobarRegistro("email");
	if(res==true){
		  email.style.border = "1px solid red";
		alert("correo ya registrado");
	}
  //Si no encontramos una cookie en el registro la guardamos
  else {
   var DatosUsuario=   document.cookie= "username=" + document.getElementById("username").value +
  	"&contraseña=" + document.getElementById("pswRegister").value
  + "&email="+document.getElementById("email").value ;
   arraycookies[w]= DatosUsuario;
   w++;

   //GUARDO UNA COOKIE CON TODO EL ARRAY DE USUARIOS
 var json_str = JSON.stringify(arraycookies);
 createCookie('usuarios', json_str);

    username.style.border = "none";
    password.style.border = "none";
    email.style.border = "none";
    agreement.style.border = "none";
    lanzarPopUpUsuarioRegistrado();
    signUp.reset();
  }
}

//Funcion para comprobar si el usuario ya esta registrado
function comprobarRegistro(nombre) {
	var registrado=false;
  for (i in arraycookies) {
		var busca = arraycookies[i].substring(arraycookies[i].indexOf("&email=")+7,arraycookies[i].length);
		if(busca==document.getElementById("email").value&&busca!=""){
			registrado=true;
			//return registrado;
		}
  }
  return registrado;
  }


                                                          /* AÑADIR CATEGORIA REGISTRO EN ARRAY Y CREACION DEL DIV*/
//FUNCIONES PARA AÑADIR Categoria
function saveCategoryCookie(form) {
	// muy parecida a registerFormCookies pero en otro array
	//guardamos el evento y el email de quien lo crea
	var DatosCategoria= "nombreCategoria=" + document.getElementById("categoryname").value + "&email=" +email_iniciado;
  arraycookiesCategorias[indexCategorias]= DatosCategoria;
  indexCategorias++;

 //GUARDO UNA COOKIE CON TODO EL ARRAY DE CATEGORIAS
  var json_str = JSON.stringify(arraycookiesCategorias);
createCookie('categorias', json_str);


	//añadimos el div de la nueva clase despues de guardar los datos
  CerrarCategoriaPopUp();
  var nombreCategoria=document.getElementById("categoryname").value;
  addDivCategory(nombreCategoria);
  return false;
}

function addDivCategory(nombreCategoria) {
	// crea un nuevo div con unos campos y hace innerHTML de los valores de la cookie en esos campos
	//creamos elementos
	var nuevaCategoria = document.createElement("div");
  nuevaCategoria.setAttribute("class", "flex-container" );
  nuevaCategoria.setAttribute("id", nombreCategoria );

  var divtitulo = document.createElement("div");
  divtitulo.setAttribute("class", "Titulo" );

  var linea_hr = document.createElement("hr");

  var titulo = document.createElement("h2");
  var contenido = document.createTextNode(nombreCategoria);
  titulo.appendChild(contenido);

  var divdropdown = document.createElement("div");
  divdropdown.setAttribute("class", "dropdown" );

  var buttonmenu = document.createElement("button");
  buttonmenu.setAttribute("class", "dropbtn" );
  buttonmenu.setAttribute("onclick", "desplegarMenu(this);" );

  var icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-ellipsis-v" );

  var divdropdowncontent = document.createElement("div");
  divdropdowncontent.setAttribute("class", "dropdown-content" );

  var buttonarchivar = document.createElement("button");
  buttonarchivar.setAttribute("onclick", "archivar('nombreCategoria');" ); //HAY QUE CAMBIAR ESTO
  buttonarchivar.setAttribute("title","Archiva esta categoria y accede a ella desde archivados")
  var contenido2 = document.createTextNode("Archivar lista");
  buttonarchivar.appendChild(contenido2);


  var buttonAñadir = document.createElement("button");
  var contenido3 = document.createTextNode("Añadir evento");
  buttonAñadir.setAttribute("onclick", "AñadirEvento(this);" );
  buttonAñadir.setAttribute("title","¡Crea un evento dentro de esta categoria!")
  buttonAñadir.appendChild(contenido3);

  /*var buttonCompartir = document.createElement("button");
  var contenido4 = document.createTextNode("Compartir lista");
  buttonCompartir.appendChild(contenido4);

  var buttonImportar  = document.createElement("button");
  var contenido5 = document.createTextNode("Importar a calendario");
  buttonImportar.appendChild(contenido5);*/

  //metemos los elementos al div flex container
  var contenido = document.createTextNode(nombreCategoria);
  nuevaCategoria.appendChild(divtitulo);

  //metemos todo en el div HOME
  var contenedor = document.getElementById("Home");
  contenedor.appendChild(nuevaCategoria);
  nuevaCategoria.appendChild(divtitulo);
  nuevaCategoria.appendChild(linea_hr);

  divtitulo.appendChild(titulo);
  divtitulo.appendChild(divdropdown);
  divdropdown.appendChild(buttonmenu);
  buttonmenu.appendChild(icon);
  divdropdown.appendChild(divdropdowncontent);
  divdropdowncontent.appendChild(buttonarchivar);
  divdropdowncontent.appendChild(buttonAñadir);

  }



                                                                /* AÑADIR EVENTO REGISTRO Y CREACION DEL EVENTO */
function saveEventCookie(form) {
	// muy parecida a registerFormCookies pero en otro array
	//guardamos el evento, la categoria donde se crea y el email de quien lo crea
	var DatosEvento= "nombreEvento=" + document.getElementById("eventname").value +"&nombreCategoria="+ categoria_seleccionada + "&email=" +email_iniciado + "&MeGusta=false";
  arraycookiesEventos[indexEventos]= DatosEvento;
  indexEventos++;


//GUARDO UNA COOKIE CON TODO EL ARRAY DE EVENTOS
  var json_str = JSON.stringify(arraycookiesEventos);
  createCookie('eventos', json_str);


	//bucle solo para comprobar que se ha guardado cada cookie en cada posicion del array
	for(var j=0;j<arraycookiesEventos.length;j++){
		console.log(arraycookiesEventos[j]);
	}

	//añadimos el div de la nueva clase despues de guardar los datos
  CerrarEventPopUp();
  var nombreEvento=document.getElementById("eventname").value;
  likeGlobal="false";
	addDivEvent(nombreEvento);
  return false;

}

function addDivEvent(nombreEvento) {
	// crea un nuevo div con unos campos y hace innerHTML de los valores de la cookie en esos campos
	//creamos elementos
	var nuevoEvento = document.createElement("div");
  nuevoEvento.setAttribute("class", "Evento" );
  nuevoEvento.setAttribute("id", nombreEvento );

  var buttoncierre = document.createElement("button");
  buttoncierre.setAttribute("class", "Boton-cierre" );


  var icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-times" );
  icon.setAttribute("onclick", "ConfirmacionDeCierre('this');" );

  var divImagen= document.createElement("div");
  divImagen.setAttribute("class", "DivImagen" );

  var img= document.createElement("img");
  img.setAttribute("src", "https://www.revistadearte.com/wp-content/uploads/2019/03/paseos-a-orillas-del-mar-1909.jpg" );
  img.setAttribute("alt", nombreEvento );
  img.setAttribute("width", "85" );
  img.setAttribute("height", "80" );

  var p= document.createElement("p");
  p.setAttribute("class", "Titulo-Evento" );
  var contenido = document.createTextNode(nombreEvento);
  p.appendChild(contenido);

  var divIconos = document.createElement("div");
  divIconos.setAttribute("class", "DivIconos" );

  var tooltip = document.createElement("button");
  tooltip.setAttribute("class", "tooltip" );

  var icon2 = document.createElement("i");

  //para recordar los likes al recargar la pagina
  if(likeGlobal!="true"){
  icon2.setAttribute("class", "far fa-thumbs-up" );
  }
  else{
  	icon2.setAttribute("class", "fas fa-thumbs-up" );

  }
  icon2.setAttribute("onclick", "PonerMeGusta(this);" );


  var span = document.createElement("span");
  span.setAttribute("class", "tooltiptext" );
  var contenido2 = document.createTextNode("Me gusta");
  span.appendChild(contenido2);



  var tooltip2 = document.createElement("button");
  tooltip2.setAttribute("class", "tooltip" );

  var icon3 = document.createElement("i");
  icon3.setAttribute("class", "far fa-comment" );

  var span2 = document.createElement("span");
  span2.setAttribute("class", "tooltiptext" );
  var contenido3 = document.createTextNode("Comentar");
  span2.appendChild(contenido3);




  var tooltip3 = document.createElement("button");
  tooltip3.setAttribute("class", "tooltip" );

  var icon4 = document.createElement("i");
  icon4.setAttribute("class", "fas fa-users" );
  icon4.setAttribute("onclick", "Colaboradores('this');" );

  var span3 = document.createElement("span");
  span3.setAttribute("class", "tooltiptext" );
  var contenido4 = document.createTextNode("Colaboradores");
  span3.appendChild(contenido4);



  var tooltip4 = document.createElement("button");
  tooltip4.setAttribute("class", "tooltip" );

  var icon5 = document.createElement("i");
  icon5.setAttribute("class", "fas fa-share" );
  icon5.setAttribute("onclick", "CompartirEvento('this');" );


  var span4 = document.createElement("span");
  span4.setAttribute("class", "tooltiptext" );
  var contenido5 = document.createTextNode("Invitar");
  span4.appendChild(contenido5);




  	//metemos los elementos al div flex container
  var divID = document.getElementById(categoria_seleccionada);
  divID.appendChild(nuevoEvento);

  	//metemos todo en el divID, que es la categoria
  	nuevoEvento.append(buttoncierre);
  		buttoncierre.append(icon);
  	nuevoEvento.append(divImagen);
  		divImagen.append(img);
  		divImagen.append(p);

  	nuevoEvento.append(divIconos);
  		divIconos.append(tooltip);
  			tooltip.append(icon2);
  			tooltip.append(span);
  		divIconos.append(tooltip2);
  			tooltip2.append(icon3);
  			tooltip2.append(span2);
  		divIconos.append(tooltip3);
  			tooltip3.append(icon4);
  			tooltip3.append(span3);
  		divIconos.append(tooltip4);
  			tooltip4.append(icon5);
  			tooltip4.append(span4);

  }














/*Boton borrar: quita estilo y resetea*/
function Borrar(signUp){
  var signUp=document.getElementById(signUp);

  var username = signUp.username;
  var password = document.getElementById("pswRegister");
  var name = signUp.name;
  var surname = signUp.surname;
  var email= signUp.email;
  var birth = document.getElementById("birth");
  var agreement = signUp.agreement;
  username.style.border = "none";
  password.style.border = "none";
  name.style.border = "none";
  surname.style.border = "none";
  email.style.border = "none";
  birth.style.border = "none";
  agreement.style.border = "none";
}

/*SIGIN*/

//FUNCION MODIFICADA
function SignIn(form) {
  var signIn=document.getElementById(form);
  var email = signIn.email.value;
  var password = document.getElementById("pswLogIn").value;

  //Si coinciden email y contraseña
  if (checkCookieLogIn() == true) {
      //Cambia a la página de perfil
      signIn.reset();
      IniciarSesion();
	  console.log("registrado");

  }
  return false;

}


//FUNCION MODIFICADA
function checkCookieLogIn() {
	var registrado=false;

     var aux1=document.getElementById('emailLogIn').value;
		 console.log(aux1)

		 var aux2=document.getElementById('pswLogIn').value;
		 console.log(aux2)

         for (i in arraycookies) {
				 var busca_email = arraycookies[i].substring(arraycookies[i].indexOf("&email=")+7,arraycookies[i].length);
				 var busca_contraseña = arraycookies[i].substring(arraycookies[i].indexOf("&contraseña=")+12,arraycookies[i].indexOf("&email="));


				if(busca_email==aux1 && busca_contraseña==aux2 && busca_email!="" && busca_contraseña!=""){
				registrado=true;
				//guardamos la posicion donde estan los datos del usuario que ha iniciado sesion
				posArray=i;
				//guardamos el email del usuario que ha iniciado sesion. Nos sera util.
				email_iniciado=busca_email;
				}
             }

			 if(registrado==false){
			 alert("El usuario o contraseña no existen");
			 return false;
			 }
         return registrado;
         }











//FUNCIONES PARA CREAR Y ACCEDER A LAS COOKIES DE LOS ARRAYS
         var createCookie = function(name, value, days) {
   var expires;
   if (days) {
       var date = new Date();
       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
       expires = "; expires=" + date.toGMTString();
   }
   else {
       expires = "";
   }
   document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
   if (document.cookie.length > 0) {
       c_start = document.cookie.indexOf(c_name + "=");
       if (c_start != -1) {
           c_start = c_start + c_name.length + 1;
           c_end = document.cookie.indexOf(";", c_start);
           if (c_end == -1) {
               c_end = document.cookie.length;
           }
           return unescape(document.cookie.substring(c_start, c_end));
       }
   }
   return "";
}
