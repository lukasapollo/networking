let count = 0;

document.querySelector('.ctn-btn').addEventListener('click', (event) => {
    event.preventDefault()
    if(count == 0){
        disabled()
        Logout()
    }
    count++;
})
//
function Logout() {
    const userName = document.querySelector('#nameUser').value
    const Email = document.querySelector('#sendEmail').value
    const Password = document.querySelector('#sendPassword').value

    firebase
    .auth()
    .createUserWithEmailAndPassword(Email, Password)
    .then(() => {
        disabled()
        console.log('Cadastrado com sucesso!')
    }).catch(err => {
        console.log(err)
        disabled()
    })
}

function disabled(){
    const btnEntrar = document.querySelector('.btn-entrar')
    const btnLoader = document.querySelector('.loader-simples')
    btnEntrar.classList.toggle('disabled');
    btnLoader.classList.toggle('disabled');
}