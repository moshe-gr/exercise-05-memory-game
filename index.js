var nums = []
var open = []
var bordSet = false
const NUM = window.document.getElementById("num")
function setNumbers(){
    for(let i = 0; i < 20;){
        var addNum = Math.floor(Math.random() * 10)+1
        if(nums.filter(num => num == addNum).length < 2){
            nums[i] = addNum
            i++
        }
    }
}
function setBord(){
    for(let i = 0; i < nums.length; i++){
        NUM.innerHTML += `<img src="images/blank.png" id="${i}" class="col-3 my-2" onClick="show(${i})">`
    }
    bordSet = true
}
function startGame(){
    close(0)
    open.length = 0
    nums.length = 0
    setNumbers()
    if(!bordSet){
        setBord()
    }
}
function show(num){
    window.document.getElementById(num).src = `images/${nums[num]}.png`
    open[open.length] = num
    if(open.length % 2 == 0 && open.length != 0){
        if(nums[open[open.length-2]] != nums[open[open.length-1]]){
            NUM.style.pointerEvents = "none"
            setTimeout(() => {
                close(open.length-2);
                NUM.style.pointerEvents = "auto";
            }, 1000)
        }
    }
}
function close(start){
    for(let i = start; i < open.length; i++){
        window.document.getElementById(open[i]).src = `images/blank.png`
    }
}