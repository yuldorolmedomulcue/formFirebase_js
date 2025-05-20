// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyB1knKB78NY3cnREV-zTLNAf7yfgUvgH-c",
  authDomain: "db-formulario-bcf2b.firebaseapp.com",
  projectId: "db-formulario-bcf2b",
  storageBucket: "db-formulario-bcf2b.firebasestorage.app",
  messagingSenderId: "1078935279862",
  appId: "1:1078935279862:web:8816220ea7ffdf8009b4d7",
  measurementId: "G-BKGN3SFED7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();




//Escuchador de evento o event listener
document.getElementById("formulario").addEventListener("submit", (event) => {

    //suprimir actualización de la página
    event.preventDefault(); 

    //validar errro
    let errorNombre = document.getElementById("nameError");

    //validar campo nombre 
    let entradaNombre = document.getElementById("name");

    if(entradaNombre.value.trim() === "") {
        errorNombre.textContent = "Por favor, ingrese su nombre";
        errorNombre.classList.add("error-mensaje");
    } else {
        errorNombre.textContent = "";
        errorNombre.classList.remove("error-mensaje");
    }

    //validar correo electrónico
    let emailEntrada = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //patron de validación de email

    if(!emailRegex.test(emailEntrada.value)){
        emailError.textContent = "Por favor, ingrese un correo electrónico válido";
        emailError.classList.add("error-mensaje");
    }

    //validar la contraseña
    let contrasenaEntrada = document.getElementById("password");
    let contrasenaError = document.getElementById("passwordError");
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;


    if(!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial";
        contrasenaError.classList.add("error-mensaje");
    } else {
        contrasenaError.textContent = "";
        contrasenaError.classList.remove("error-mensaje");
    }

    //si todos los campos son válidos enviar el formulario
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        // backend traido de firebase
        db.collection("users").add({
                nombre: entradaNombre.value,
                email: emailEntrada.value,
                contrasena: contrasenaEntrada.value,
            })
            .then((docRef) => {
                alert("Formulario enviado correctamente ",docRef.id);
                //reiniciar el formulario
                document.getElementById("formulario").reset(); 
            })
            .catch((error) => {
                alert("Error al enviar el formulario: ", error);
            });


    }
})