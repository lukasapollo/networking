document.querySelector(".ctn-btn").addEventListener('click', (event) => {
    event.preventDefault()
    const EmailRecuperacao = document.querySelector('#email-singIn').value
    
    firebase
    .auth()
    .sendPasswordResetEmail(EmailRecuperacao).then(() => {
        disabled()
        setTimeout(() => {
            window.location.href = "login.html"
        },5000)
    }).catch((err) => {
        console.log(err)
    })
})

function disabled(){
    const modalAlert = document.querySelector('.alert-container')
    modalAlert.classList.toggle('disabled');
}