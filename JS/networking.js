const db = firebase.firestore()

const verifyAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {  
        if(user){
            getContentUser(user)
            console.log(user)
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
        console.log(contentUser)
        data.docs.forEach((val, i) => {
          if(val.id == user.email){
            contentUser = val.data()
         }})
         referenceCode(contentUser.codeReference)
         searchDownlines(contentUser)
         document.querySelector('.container-loader').classList.add('disabled')
    })
}

function referenceCode(code){
    document.querySelector('#copyValue').value = `https://sdm-sistema.web.app/logout.html?ref=${code}`
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


function searchDownlines(keySearch){
    db.collection('network').onSnapshot((data) => {
        let listDownlines;
        data.docs.forEach((docs) => {
          if(docs.id == keySearch.codeReference){
                document.querySelector('.qtd-ref').innerText = docs.data().indicados.length   
                listDownlines = docs.data().indicados
          }})

         listDownlines.forEach((downline) => {
            console.log(downline)
            document.querySelector('.container-card-list').innerHTML += `
            <div class="item-list">
                <div>
                    <span>${downline.username}</span>
                </div>
                <div class="email-list">
                    <span>${downline.email}</span>
                </div>
                <div>
                    <button onclick="infoUser('${downline.code}', 'event')">ver</button>
                </div>
            </div>
            `
        })
    })
}

function infoUser(code) {
    const modalUser = document.querySelector('.modalUser-container')
    modalUser.classList.toggle('disabled')
    console.log(code.target)
}