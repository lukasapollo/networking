import { keyCodeRef } from "./KeyCode/keyCodeRef.js"

const db = firebase.firestore();


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
        }, { merge: true }).then(() => {
            
               createNetwork(Email, userName, code)
            
        }).catch((e) => {
            console.log(e)
        })
        
    }).catch(err => {
        console.log(err)
        disabled()
    })
}

function createNetwork(Email, userName, code){
    db.collection('network').doc(code).set({
        indicados: firebase.firestore.FieldValue.arrayUnion(),
        user: userName
    }, { merge: true }).then(() => {
        addNetwork(Email, userName)
    })
}

function addNetwork(Email, userName){
    db.collection('network').doc(searchReference()).set({
        indicados: firebase.firestore.FieldValue.arrayUnion({email: Email, username: userName}),
    }, { merge: true }).then(() => {
        disabled()
        document.querySelector('.btn-entrar').innerHTML = 'Cadastrado! Aguarde...'
        setTimeout(() => {
            window.location.href = `login.html?name=${userName}`
        }, 3000)
    })
}

function disabled(){
    const btnEntrar = document.querySelector('.btn-entrar')
    const btnLoader = document.querySelector('.loader-simples')
    btnEntrar.classList.toggle('disabled');
    btnLoader.classList.toggle('disabled');
}