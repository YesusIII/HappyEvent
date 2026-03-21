document.body.classList.replace('no-js', 'js')
document.body.style.overflow = 'hidden'
//Changement de la classe body à l'activation de js
//blocage du scroll et 


//const date Fixe du mariage
const dateMariage = new Date('2026-07-25T15:00:00')

//const ID dans l'overlay
const overlayClass = document.querySelector('.welcome')
const btnEnter = document.getElementById('btnEnter')
// const ID dans couple-section
const yess = document.getElementById('yes')
const brideDivPortrait = document.querySelector('.bride')
const groomDivPortrait = document.querySelector('.groom')
// const ID dans location
const addIcs = document.getElementById('btnIcs')
// const ID dans photos
const switchCaroussel = document.getElementById('buttonChange')
const carousselFirstImg = document.getElementById('carousselDefault')
const carousselSecondImg = document.getElementById('carousselChange')
const carousselWidth = getComputedStyle(document.documentElement)
.getPropertyValue('--caroussel-width').trim()
// -------------    Debut des scripts   ------------

// -------------Condition jour superieur à 0 : counter actif
function counter() {
    const now = new Date()
    const diff = dateMariage - now
    const joursRestant = Math.floor(diff / (24 * 60 * 60 * 1000))
    const jours   = Math.floor(diff / (1000 * 60 * 60 * 24))
    const heures  = String(Math.floor(diff / (1000 * 60 * 60) % 24)).padStart(2, '0')
    const minutes = String(Math.floor(diff / (1000 * 60) % 60)).padStart(2, '0')
    const secondes = String(Math.floor(diff / 1000 % 60)).padStart(2, '0')

    if (jours > 0) {
    document.querySelectorAll('.counter').forEach(el => {
        el.textContent = jours + " : " + heures +" : " + minutes +" : " + secondes
    })
    document.getElementById('inDays').style.display = "block"
    document.getElementById('dayLeft').textContent = jours} 
else {
    document.getElementById('inDays').style.display = "none"}
}
// -------------Lancement du Compteur 
document.addEventListener('DOMContentLoaded', () => {
    counter()
    setInterval(counter, 1000)

})

// -------------Confetis 
// a placer dans dossier separé
const confettisDiv = document.getElementById('confetti') 
function Confettis() {
    confettisDiv.innerHTML = ''
    const couleurs = ['#f4436c', '#f9c846', '#7c3aed', '#10b981', '#60a5fa']
    const nbPieces = 60

    
    for (let i = 0; i < nbPieces; i++) {
        const piece = document.createElement('div')
        const w = 6 + Math.random() * 10 + 'px'
        const h = 6 + Math.random() * 10 + 'px'
        const isSerpentin = Math.random() > 0.7

        piece.classList.add('confetti-piece')
        piece.style.left = Math.random() * 100 + 'vw'
        piece.style.background = couleurs[Math.floor(Math.random() * couleurs.length)]
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
        piece.style.animationDuration = (1.5 + Math.random() * 2) + 's'
        piece.style.animationDelay = Math.random() * 1 + 's'
        piece.style.width = w
        piece.style.height = h
        piece.style.zIndex = "500"

        if (isSerpentin) {
            piece.style.width = '3px'
            piece.style.height = 14 + Math.random() * 10 + 'px'
            piece.style.borderRadius = '2px'
        } else {
            piece.style.width = 6 + Math.random() * 10 + 'px'
            piece.style.height = 6 + Math.random() * 10 + 'px'
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
        }
        confettisDiv.appendChild(piece)
    }
    setTimeout(function() {
        confettisDiv.innerHTML = ''
    }, 4000)
}

//btnEnter : Sortie de l'overlay
btnEnter.addEventListener('click', function(){
    overlayClass.classList.add('hide')
    groomDivPortrait.classList.add('visible')
    brideDivPortrait.classList.add('visible')
    Confettis()
    setTimeout(function() {
    overlayClass.style.display = 'none'}, 2000)
    document.querySelector('main').style.filter = 'none'
    document.querySelector('header').style.filter = 'none'
    document.querySelector('nav').style.filter = 'none'
    document.body.style.overflow = 'auto'
})

//Bouton OUI :  declencheur & Anim
yess.addEventListener('click', function(){
    Confettis()
})

// Bouton Add to calendar 
addIcs.addEventListener('click', function(){
function genererFichierICS() {
    const contenu = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    DTSTART:20260725T150000
    DTEND:20260725T180000
    SUMMARY:Mariage de Camille & Théo
    LOCATION:Mairie de Saint-Germain-de-Pasquier
    END:VEVENT
    END:VCALENDAR`
    const blob = new Blob([contenu], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mariage-camille-theo.ics'
    a.click()
    } 
})

//Bouton Top lors du scroll a 50px
function scrollBtnTop (){
    if (!document.getElementById('btnTop')) {
        const scroll = document.createElement('button')
        const sticky = document.querySelector('.sticky')
        scroll.id = "btnTop"
        scroll.textContent = "⬆↑⬆"
        sticky.appendChild(scroll)
            scroll.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })

            })
    }
}
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        scrollBtnTop()
    }
    else {
        const btnTop = document.getElementById('btnTop')
        if (btnTop) btnTop.remove()
    }
})

//Caroussel toggle des images
switchCaroussel.addEventListener('click', () => {
    carousselFirstImg.classList.toggle('hidden')
    carousselSecondImg.classList.toggle('active')
})

