import { keyCodeRef } from "./KeyCode/keyCodeRef.js"

const db = firebase.firestore();
const now = new Date();
const dayName = new Array ("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado")
const monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")
const dateNow = dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName [now.getMonth() ]   +  " de "  + now.getFullYear ()
console.log(dateNow)
window.onload = () => {
    if(searchReference() == null){
        document.querySelector('.container-loader').classList.add('disabled')
        const warning = document.querySelector('.ctn-welcome')
        warning.innerHTML = '<p><span class="welcome">Bem vindo!</span> Vimos que você não ainda não possui um patrocinador. Solicite um link de indicação para fazer o cadastro.</p>'
    } else {
        exposeReference()
    }
}

document.querySelector('.ctn-btn').addEventListener('click', (event) => {
    event.preventDefault()
    if(searchReference() !== null){
        disabled()
        Logout()
    }
})


const searchReference = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const ID = urlParams.get("ref")
    return ID
}

function exposeReference(){
    db.collection('network').onSnapshot((data) => {
        let networkingDatabase;
        data.docs.forEach((val, i) => {
          if(val.id == searchReference()){
            networkingDatabase = val.data()
         }})

        document.querySelector('#userLogout').innerHTML = networkingDatabase.user
        document.querySelector('.container-loader').classList.add('disabled')
    })
}

//
function Logout() {
    const userName = document.querySelector('#nameUser').value
    const Email = document.querySelector('#sendEmail').value
    const Password = document.querySelector('#sendPassword').value
    let code = keyCodeRef(9)

    firebase
    .auth()
    .createUserWithEmailAndPassword(Email, Password)
    .then(() => {
        
        db.collection('usuarios').doc(Email).set({
            email: Email,
            username: userName,
            patrocinador: searchReference(),
            codeReference: code,
            dateCreation: dateNow
        }, { merge: true }).then(() => {
            
               createNetwork(Email, userName, code, dateNow)
            
        }).catch((e) => {
            console.log(e)
        })
        
    }).catch(err => {
        disabled()
        disabledModal().alertError(err.code)
        setTimeout(() => {
            document.location.reload(true);
        }, 3000)
    })
}

function createNetwork(Email, userName, code, dateCreation){
    db.collection('network').doc(code).set({
        indicados: firebase.firestore.FieldValue.arrayUnion(),
        user: userName
    }, { merge: true }).then(() => {
        addNetwork(Email, userName, code, dateCreation)
    })
}

function addNetwork(Email, userName, code, dateCreation){
    db.collection('network').doc(searchReference()).set({
        indicados: firebase.firestore.FieldValue.arrayUnion({
            email: Email, 
            username: userName,
            code,
            dateCreation
        }),
    }, { merge: true }).then(() => {
        disabled()
        disabledModal()
        setTimeout(() => {
           // window.location.href = `login.html?name=${userName}`
        }, 3000)
    }).catch((err) => {
        disabledModal()
    })
}

function disabled(){
    const btnEntrar = document.querySelector('.btn-entrar')
    const btnLoader = document.querySelector('.loader-simples')
    btnEntrar.classList.toggle('disabled');
    btnLoader.classList.toggle('disabled');
}

function disabledModal(){
    const modalAlert = document.querySelector('.alert-container')
    modalAlert.classList.toggle('disabled');
    
    return {
        alertError(errCode){
            const pathSVG = document.querySelector(".path-color")
            const contentAlert = document.querySelector(".content-alert")
            pathSVG.classList.toggle('pathColorRed');
            contentAlert.classList.toggle('b-red')
            
            switch (errCode){
                case 'auth/email-already-in-use':
                    document.querySelector('.title-alert').innerHTML = 'Error!'
                    document.querySelector('.p-description').innerHTML = 'Já existe um usuário cadastrado com esse email'
                    break
                case 'auth/invalid-email':
                    document.querySelector('.title-alert').innerHTML = 'Error!'
                    document.querySelector('.p-description').innerHTML = 'Email invalido'
                    break
                case 'auth/weak-password':
                    document.querySelector('.title-alert').innerHTML = 'Atenção'
                    document.querySelector('.p-description').innerHTML = 'Consideramos sua senha fraca'
                default:
                    console.log(errCode)
            }
        },
    }
}



