const db = firebase.firestore()

const verifyAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {  
        if(user){
            console.log(user)
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
            contentUser = val.data();
         }})
         document.querySelector('.container-btn-save').setAttribute('keyacess', `${contentUser.codeReference}`)
         document.querySelector('.container-loader').classList.add('disabled')
    })
}



function salveDate(event) {
    event.preventDefault()
    const keyCode = document.querySelector('.container-btn-save').getAttribute('keyacess')
    const keyPIX = document.querySelector('#value-pix').value
    const contact = document.querySelector('#value-pix').value
    const acessGroup = document.querySelector('#link-grupo').value

    db.collection('network').doc(keyCode).set({
        linkGroup: acessGroup,
        keyPix: keyPIX
    }, { merge: true }).then(() => {
            getContentNetwork(keyCode)
    })
   
}

function getContentNetwork(keyCode){
    console.log(keyCode)
}