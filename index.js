const NUM = window.document.getElementById("num")
var nums = []
var opendCards = []
var pairs = 0

function startGame(){
    opendCards.length = 0
    setNumbers()
    setBord()
    endGame()
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
    NUM.innerHTML = null
    for(let i = 0; i < nums.length; i++){
        NUM.innerHTML += `<div id="${i}" class="col-3 my-2"><img src="images/blank.png" width="100%" onclick="show(${i})"></div>`
    }
}
function show(num){
    setStyle(num, "primary")
    setTimeout(() => {
        window.document.getElementById(num).innerHTML = `<img src="images/${nums[num]}.png" width="100%">`
    }, 50)
    opendCards[opendCards.length] = num
    if(opendCards.length % 2 == 0 && opendCards.length != 0){
        window.document.getElementById("moves").innerText = opendCards.length/2
        if(nums[opendCards[opendCards.length-2]] != nums[opendCards[opendCards.length-1]]){
            NUM.style.pointerEvents = "none"
            setTimeout(() => {
                close();
                NUM.style.pointerEvents = "auto";
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
    window.document.getElementById("endGame").target = "#endGame"
}
function setStyle(id, color, text=""){
    window.document.getElementById(id).innerHTML = `<div class="bg-${color} w-100 h-100">${text}</div>`
}