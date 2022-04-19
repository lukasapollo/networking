let count = 0;

function disabled(){
    const btnEntrar = document.querySelector('.btn-entrar')
    const btnLoader = document.querySelector('.loader-simples')
    btnEntrar.classList.toggle('disabled');
    btnLoader.classList.toggle('disabled');
}

document.querySelector('.ctn-btn').addEventListener('click', (event) => {
    event.preventDefault()
    if(count == 0){
        disabled()
    }
    count++;
})