function disabled(){
    const btnEntrar = document.querySelector('.btn-entrar')
    const btnLoader = document.querySelector('.loader-simples')
    btnEntrar.classList.toggle('disabled');
    btnLoader.classList.toggle('disabled');
}

function searchReference(codeUrl) {
    const urlParams = new URLSearchParams(window.location.search)
    const ID = urlParams.get(codeUrl)
    return ID
}

window.onload = () => {
    if(searchReference('name') === null) {
        document.querySelector('.ctn-welcome').innerHTML = '<p><span class="welcome">Bem-vindo de volta!</span></p>'
    } else {
        document.querySelector('#userLogin').innerHTML = searchReference('name')
}

document.querySelector('.ctn-btn').addEventListener('click', (event) => {
    event.preventDefault()
        disabled()
        Login()
})}

function Login() {
    const Email = document.querySelector('#email-singIn').value
    const password = document.querySelector('#password-singIn').value

    firebase.auth().signInWithEmailAndPassword(Email, password)
    .then(() => {
        setTimeout(() => {
            window.location.replace('index.html')
        }, 2000)
    }).catch((err) => {
        disabled()
        alertMessage().sendError(err)
        setTimeout(() => {
            alertMessage()
        },3000)
    })
}

function alertMessage(){
    const modalAlert = document.querySelector('.alert-container')
    modalAlert.classList.toggle('disabled');
    return {
        sendError(err){
            switch (err.code){
                case 'auth/wrong-password':
                    document.querySelector('.title-alert').innerHTML = 'Error!'
                    document.querySelector('.p-description').innerHTML = 'Senha Invalida!'
                    break
                case 'auth/invalid-email':
                    document.querySelector('.title-alert').innerHTML = 'Error!'
                    document.querySelector('.p-description').innerHTML = 'Email invalido'
                    break
                case 'auth/user-not-found':
                    document.querySelector('.title-alert').innerHTML = 'Error!'
                    document.querySelector('.p-description').innerHTML = 'Você ainda não é um usuario cadastrado.'
                default:
                    console.log(err)
            }
        }
    }
}