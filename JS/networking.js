const db = firebase.firestore()

const verifyAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {  
        if(user){
            getContentUser(user)
        } else {
            window.location.href = 'login.html'
        }
    })
}

window.onload =  () => {
    verifyAuth()
}

function getContentUser(user){
    db.collection('usuarios').onSnapshot((data) => {
        let contentUser;
        data.docs.forEach((val, i) => {
          if(val.id == user.email){
            contentUser = val.data()
         }})
         referenceCode(contentUser.codeReference)
         document.querySelector('.container-loader').classList.add('disabled')
    })
}

function referenceCode(code){
    document.querySelector('#copyValue').value = `www.sdm-sistema.web.app?ref=${code}`
}

document.querySelector('#copyURL').addEventListener('click', () => {
    const copiedURL = document.querySelector('#copyValue')
    copiedURL.select()
    document.execCommand("copy")
    document.querySelector('#copyURL').innerHTML = "Copiado!"
    setTimeout(() =>{
        document.querySelector('#copyURL').innerHTML = "Copy URL"
    },5000)
})
