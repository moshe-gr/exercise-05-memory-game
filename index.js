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
var stordNums = JSON.parse(window.localStorage.getItem("nums"))
var stopendCards = JSON.parse(window.localStorage.getItem("opendCards"))
var stpairs = parseInt(window.localStorage.getItem("pairs"))
var stminuts = parseInt(window.localStorage.getItem("minuts"))
var stseconds = parseInt(window.localStorage.getItem("seconds"))
var stm0 = window.localStorage.getItem("m0")
var sts0 = window.localStorage.getItem("s0")

if(stordNums.length == 0){
    setNumbers()
}
setBord()
setTimeout(()=>startTimer(),800)

function startGame(){
    window.localStorage.removeItem("nums")
    setNumbers()
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
    window.localStorage.setItem("nums", JSON.stringify(nums))
}
function setBord(){
    CARD.style.pointerEvents = "none"
    CARD.className = "row bg-warning"
    for(let i = 0; i < stordNums.length; i++){
        CARD.innerHTML += `<div id="${i}" class="col-3 my-2"><img src="images/blank.png" width="100%" onclick="show(${i})"></div>`
    }
}
function show(num){
    setStyle(num, "primary")
    setTimeout(() => {
        window.document.getElementById(num).innerHTML = `<img src="images/${stordNums[num]}.png" width="100%">`
    }, 50)
    opendCards[opendCards.length] = num
    if(opendCards.length % 2 == 0){
        MOVES.innerText = opendCards.length/2
        if(stordNums[opendCards[opendCards.length-2]] != stordNums[opendCards[opendCards.length-1]]){
            CARD.style.pointerEvents = "none"
            setTimeout(() => {
                close();
                CARD.style.pointerEvents = "auto";
            }, 700)
        }
        else{
            pairs++
            if(pairs == stordNums.length/2){
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
    ENDGAME.innerHTML = `<div id="cong" style="color: rgb(220, 20, 130);">"congratulations!"</div><br><br><br><br>`
    ENDGAME.innerHTML += `<div id="finalInfo" class="card w-25" style="left:37%;"><div>Time: ${m0}${minuts}:${s0}${seconds}</div>
    <div class="btn btn-danger m-2">Moves: <strong>${opendCards.length/2}</strong></div></div>`
    rating()
    ENDGAME.innerHTML += `<button class="btn btn-success m-2" onclick="startGame()">New game</button>`
    SCREEN.style.pointerEvents = "none"
    SCREEN.style.opacity = 0.3
    var grow = 0
    var shrink = 100
    setInterval(() =>{
        if(grow <= 100 && shrink == 100){
            window.document.getElementById("cong").style.fontSize = `${grow}px`
            grow += 5
        }
        else{
            grow = 0
            window.document.getElementById("cong").style.fontSize = `${shrink}px`
            shrink -= 5
            if(shrink == 0){
                shrink = 100
            }
        }
    }, 55);
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
function rating(){
    if(opendCards.length/2 < 20){
        window.document.getElementById("finalInfo").innerHTML += `<div>Your rating: &#9733;&#9733;&#9733;</div>`
    }
    else if(opendCards.length/2 < 25){
        window.document.getElementById("finalInfo").innerHTML += `<div>Your rating: &#9733;&#9733;&#9734;</div>`
    }
    else{
        window.document.getElementById("finalInfo").innerHTML += `<div>Your rating: &#9733;&#9734;&#9734;</div>`
    }
}