const verifyAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {  
        if(user){
            document.querySelector('.container-loader').classList.add('disabled')
        } else {
            window.location.href = 'login.html'
        }
    })
}

window.onload =  () => {
    verifyAuth()
}