const SCREEN = window.document.getElementById("screen")
const BORD = window.document.getElementById("bord")
const CARD = window.document.getElementById("cards")
const TIME = window.document.getElementById("time")
const MOVES = window.document.getElementById("moves")
const ENDGAME = window.document.getElementById("endGame")
var nums = []
var opendCards = []
var pairs = 0
var minuts = 0
var seconds = 0
var m0 = "0"
var s0 = "0"
var start = null

setNumbers()
setBord()

function startGame(){
    window.document.location.reload()
}
function setNumbers(){
    nums.length = 0
    for(let i = 0; i < 20;){
        var addNum = Math.floor(Math.random() * 10)+1
        if(nums.filter(num => num == addNum).length < 2){
            nums[i] = addNum
            i++
        }
    }
}
function setBord(){
    CARD.style.pointerEvents = "none"
    CARD.className = "row bg-warning"
    for(let i = 0; i < nums.length; i++){
        CARD.innerHTML += `<div id="${i}" class="col-3 my-2"><img src="images/blank.png" width="100%" onclick="show(${i})"></div>`
    }
}
function show(num){
    setStyle(num, "primary")
    setTimeout(() => {
        window.document.getElementById(num).innerHTML = `<img src="images/${nums[num]}.png" width="100%">`
    }, 50)
    opendCards[opendCards.length] = num
    if(opendCards.length % 2 == 0){
        MOVES.innerText = opendCards.length/2
        if(nums[opendCards[opendCards.length-2]] != nums[opendCards[opendCards.length-1]]){
            CARD.style.pointerEvents = "none"
            setTimeout(() => {
                close();
                CARD.style.pointerEvents = "auto";
            }, 700)
        }
        else{
            pairs++
            if(pairs == nums.length/2){
                endGame()
            }
        }
    }
}
function close(){
    for(let i = opendCards.length-2; i < opendCards.length; i++){
        setStyle(opendCards[i], "danger")
        setTimeout(() => {
            window.document.getElementById(opendCards[i]).innerHTML = `<img src="images/blank.png" width="100%" onclick="show(${opendCards[i]})">`
        }, 260)
    }
}
function endGame(){
    gamePause()
    SCREEN.style.pointerEvents = "none"
    SCREEN.style.opacity = 0.3
    var grow = 0
    var shrink = 100
    ENDGAME.style.display = "block"
    var cong = setInterval(() =>{
        if(grow <= 100 && shrink == 100){
            ENDGAME.style.fontSize = `${grow}px`
            grow += 5
        }
        else{
            grow = 0
            ENDGAME.style.fontSize = `${shrink}px`
            shrink -= 5
            if(shrink == 0){
                shrink = 100
            }
        }
    }, 55);
    setTimeout(()=> {
        clearInterval(cong)
        ENDGAME.style.display = "none"
        SCREEN.style.opacity = 1
        SCREEN.style.pointerEvents = "auto"
    }, 5000)
    setInterval(() => {
        CARD.className = "row bg-warning",
        setTimeout(() => CARD.className = "row bg-success", 500)
    }, 1000);
}
function setStyle(id, color, text=""){
    window.document.getElementById(id).innerHTML = `<div class="bg-${color} w-100 h-100 text-center">${text}</div>`
}
function startTimer(){
    CARD.style.pointerEvents = "auto"
    start = setInterval(() => {
        seconds++
        TIME.innerHTML = `&#8987; <span onclick="gamePause()">${m0}${minuts}:${s0}${seconds} &#9656;</span>`
        if(seconds == 9){
            s0 = ""
        }
        if(m0 == 10){
            m0 = ""
        }
        if(seconds == 60){
            seconds = 0
            minuts++
            s0 = "0"
        }
        if(minuts == 60){
            minuts = 0
            m0 = "0"
        }
    }, 1000)
}
function gamePause(){
    clearInterval(start)
    CARD.style.pointerEvents = "none"
    TIME.innerHTML = `&#8987; <span onclick="startTimer()">${m0}${minuts}:${s0}${seconds} &#9726;</span>`
}