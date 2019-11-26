
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
/*Dar o quitar un like*/
function PonerMeGusta(button){
	console.log(button);
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

	  }

	}

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
    /*Pondremos el resto de elementos borrosos para focalizarnos en el popUp */
    var containers=document.getElementsByClassName("flex-container");
    var headerConUsusario=document.getElementById("headerPaginaConUsuario");
    var footer=document.getElementById("myFooter");

    headerConUsusario.classList.add("blur");
    footer.classList.add("blur");
    for(var i=0;i<containers.length;i++){
      containers[i].classList.add("blur");
    }
    /*Cerrar evento si se hace click fuera*/
    var specifiedElement = document.getElementById("popUpTextNewCategory");
    ListenerNewCategory();
    form_añadirCategoria=document.getElementById("newCategory");
    form_añadirCategoria.reset();

  }


  function ListenerNewCategory(){
  document.addEventListener('click', function(event){
    var popUp=document.getElementById("popUpTextNewCategory");
    var isClickInside = event.target.closest("section");
    if(isClickInside==null){
      var isButton = event.target.closest("button");
      if(isButton==null && event.target.className!="tooltip"){
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
        /*Quitaremos el efecto borroso a los elementos*/
        var containers=document.getElementsByClassName("flex-container");
        for(var i=0;i<containers.length;i++){
          containers[i].classList.remove("blur");
        }
        var headerConUsusario=document.getElementById("headerPaginaConUsuario");
        var headerSinUsusario=document.getElementById("headerPaginaSinUsuario");

        var footer=document.getElementById("myFooter");
        headerConUsusario.classList.remove("blur");
        headerSinUsusario.classList.remove("blur");

        footer.classList.remove("blur");
      }


                                                                        /* FUNCIONES LISTA TRES PUNTITOS */
                                                                            /*BOTON AÑADIR EVENTO*/
/*PopUp cuando clickas el boton añadir evento*/
function AñadirEvento(elmnt) {
    categoria_seleccionada=$(elmnt).closest(".flex-container").attr('id');
    /*Ponemos que el popUp sea visible*/
    var popUpTextNewEvent = document.getElementById("popUpTextNewEvent");
    popUpTextNewEvent.style.display="block";
    var container=document.getElementById("fullscreen-container3");
    container.style.display="block";
    /*Pondremos el resto de elementos borrosos para focalizarnos en el popUp */
    var containers=document.getElementsByClassName("flex-container");
    var headerConUsusario=document.getElementById("headerPaginaConUsuario");
    var headerSinUsusario=document.getElementById("headerPaginaSinUsuario");

    var footer=document.getElementById("myFooter");
    headerConUsusario.classList.add("blur");
    headerSinUsusario.classList.add("blur");

    footer.classList.add("blur");
    for(var i=0;i<containers.length;i++){
      containers[i].classList.add("blur");
    }
    /*Cerrar evento si se hace click fuera*/
    var specifiedElement = document.getElementById("popUpTextNewEvent");
    ListenerNewEvent();

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
        /*Quitaremos el efecto borroso a los elementos*/
        var containers=document.getElementsByClassName("flex-container");
        for(var i=0;i<containers.length;i++){
          containers[i].classList.remove("blur");
        }
        var headerConUsusario=document.getElementById("headerPaginaConUsuario");
        var headerSinUsusario=document.getElementById("headerPaginaSinUsuario");

        var footer=document.getElementById("myFooter");
        headerConUsusario.classList.remove("blur");
        headerSinUsusario.classList.remove("blur");

        footer.classList.remove("blur");
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
  	console.log(contenedorPequeño[0]);
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
  var headerSinUsuario=document.getElementById("headerPaginaSinUsuario");
  headerSinUsuario.style.display="block";
  /*Parte inferior*/
  var parteInferiorConUsuario=document.getElementById("Home");
  parteInferiorConUsuario.style.display="flex";

  //IMPORTANTE: CADA VEZ QUE SE HACE LOG OUT SE LIMPIA EL DIV HOME. CUANDO SE VUELVA A INICIAR SESIÓN HABRÁ QUE VOLVER A ESCRIBIR TODO
  parteInferiorConUsuario.innerHTML="";
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
  var parteInferiorConUsuario=document.getElementById("Home");
  parteInferiorConUsuario.style.display="none";
  var parteInferiorSignUp=document.getElementById("signup_form");
  parteInferiorSignUp.style.display="none";
  var parteInferiorSignIn=document.getElementById("signin_form");
  parteInferiorSignIn.style.display="block";
  var form_signUp=document.getElementById("signup");
  form_signUp.reset();
}

/*Para cambiar de cualquier pagina a SignUp*/
function pasarPaginaSignUp(){
  /*Parte inferior*/
  var parteInferiorConUsuario=document.getElementById("Home");
  parteInferiorConUsuario.style.display="none";
  var parteInferiorSignIn=document.getElementById("signin_form");
  parteInferiorSignIn.style.display="none";
  var parteInferiorSignUp=document.getElementById("signup_form");
  parteInferiorSignUp.style.display="block";
  var form_signIn=document.getElementById("signIn");
  form_signIn.reset();

}

/*Para cambiar de cualquier pagina a la página principal de usuario*/
function IniciarSesion(){
  /*Cabecera*/
  var headerSinUsuario=document.getElementById("headerPaginaSinUsuario");
  headerSinUsuario.style.display="none";
  var headerConUsusario=document.getElementById("headerPaginaConUsuario");
  headerConUsusario.style.display="block";

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
  var name = signUp.name;
  var surname = signUp.surname;
  var email= signUp.email;
  var birth = document.getElementById("birth");
  var museums = signUp.museums;
  var theatre = signUp.theare;
  var movies = signUp.movies;
  var agreement = signUp.agreement;

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

    username.style.border = "none";
    password.style.border = "none";
    email.style.border = "none";
    agreement.style.border = "none";

    signUp.reset();
    pasarPaginaSignIn();
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
	//añadimos el div de la nueva clase despues de guardar los datos
  CerrarCategoriaPopUp();
  var nombreCategoria=document.getElementById("categoryname").value;
  addDivCategory(nombreCategoria);
  false;
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
  var contenido2 = document.createTextNode("Archivar lista");
  buttonarchivar.appendChild(contenido2);

  var buttonAñadir = document.createElement("button");
  var contenido3 = document.createTextNode("Añadir evento");
  buttonAñadir.setAttribute("onclick", "AñadirEvento(this);" );
  buttonAñadir.appendChild(contenido3);

  var buttonCompartir = document.createElement("button");
  var contenido4 = document.createTextNode("Compartir lista");
  buttonCompartir.appendChild(contenido4);

  var buttonImportar  = document.createElement("button");
  var contenido5 = document.createTextNode("Importar a calendario");
  buttonImportar.appendChild(contenido5);

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
  divdropdowncontent.appendChild(buttonCompartir);
  divdropdowncontent.appendChild(buttonImportar);
  }



                                                                /* AÑADIR EVENTO REGISTRO Y CREACION DEL EVENTO */
function saveEventCookie(form) {
	// muy parecida a registerFormCookies pero en otro array
	//guardamos el evento, la categoria donde se crea y el email de quien lo crea
	var DatosEvento= "nombreEvento=" + document.getElementById("eventname").value +"&nombreCategoria="+ categoria_seleccionada + "&email=" +email_iniciado + "&MeGusta=false";
  arraycookiesEventos[indexEventos]= DatosEvento;
  indexEventos++;

	//bucle solo para comprobar que se ha guardado cada cookie en cada posicion del array
	for(var j=0;j<arraycookiesEventos.length;j++){
		console.log(arraycookiesEventos[j]);
	}

	//añadimos el div de la nueva clase despues de guardar los datos
  CerrarEventPopUp();
  var nombreEvento=document.getElementById("eventname").value;
	addDivEvent(nombreEvento);

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
