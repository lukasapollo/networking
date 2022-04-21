function disabled(){
    const btnEntrar = document.querySelector('.btn-entrar')
    const btnLoader = document.querySelector('.loader-simples')
    btnEntrar.classList.toggle('disabled');
    btnLoader.classList.toggle('disabled');
}

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const ID = urlParams.get("name")
    if(ID === null) {
        document.querySelector('.ctn-welcome').innerHTML = '<p><span class="welcome">Bem-vindo de volta!</span></p>'
    } else {

    }
    document.querySelector('#userLogin').innerHTML = `${ID}`
}

document.querySelector('.ctn-btn').addEventListener('click', (event) => {
    event.preventDefault()
        disabled()
})
