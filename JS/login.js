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
})}