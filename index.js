const NUM = window.document.getElementById("num")
var nums = []
var open = []

function startGame(){
    open.length = 0
    setNumbers()
    setBord()
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
        NUM.innerHTML += `<img src="images/blank.png" id="${i}" class="col-3 my-2" onclick="show(${i})">`
    }
    bordSet = true
}
function show(num){
    window.document.getElementById(num).src = `images/${nums[num]}.png`
    window.document.getElementById(num).onclick = function() {'a'}
    open[open.length] = num
    if(open.length % 2 == 0 && open.length != 0){
        if(nums[open[open.length-2]] != nums[open[open.length-1]]){
            NUM.style.pointerEvents = "none"
            setTimeout(() => {
                close();
                NUM.style.pointerEvents = "auto";
            }, 1000)
        }
    }
}
function close(){
    for(let i = open.length-2; i < open.length; i++){
        window.document.getElementById(open[i]).src = `images/blank.png`
        window.document.getElementById(open[i]).onclick = function() {show(open[i])}
    }
}