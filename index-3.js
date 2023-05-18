let container=document.getElementById("container");
let boxes=document.querySelectorAll(".box");
let btnRes=document.querySelector("#restart");
let staus=document.querySelector("#result")
let conditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let options=["","","","","","","","",""];
let running=false;
let currentPlayer="X";
initialze()
function initialze(){
running=true;
boxes.forEach(box=>{
    box.addEventListener("click",boxClicked);
    btnRes.addEventListener('click',restart);
});
}
let click=new Audio("click.wav");
function boxClicked(){
  let index=this.classList[1];
  boxes[index].classList.add("cl")
  setTimeout(()=>{
    boxes[index].classList.remove("cl")
   
  },150)

  click.play()
 if(options[index]!==""||!running){
    boxes[index].classList.remove("cl")
    return click.pause();
 }
 updateBox(this,index)
 checkWinner()
}
function updateBox(cell,index){
cell.innerText=`${currentPlayer}`;
options[index]=`${currentPlayer}`
}
function changePlayer(){
if(currentPlayer=="X"){
    currentPlayer="O"
}else{
    currentPlayer="X"
}
staus.innerText=`${currentPlayer}'s turn`;
}
function checkWinner(){
    let isWon=false
    for(let i=0;i<conditions.length;i++){
        let condition=conditions[i]//[without the parent array]
        let box1=options[condition[0]]//[First row]//[0,1,2]
        let box2=options[condition[1]];
         let box3=options[condition[2]];
         console.log(box1,box2,box3)
         if(box1==""||box2==""||box3==""){
            continue;
         }
          if(box1==box2&&box2==box3){
            isWon=true;
     let win=new Audio("win.mp3");
     win.play()
           boxes[condition[0]].classList.add("win")
           boxes[condition[1]].classList.add("win")
           boxes[condition[2]].classList.add("win")
           break;
          }
    }
    if(isWon){
        staus.innerText=`${currentPlayer} Wins!`;
        running=false
    }else if(!options.includes("")){
        staus.innerText=`Draw!`;
        running=false
    }else{
        changePlayer()
    }
}
function restart(){
    options=["","","","","","","","",""];
    currentPlayer="X";
    staus.innerText=`${currentPlayer}'s turn`;
    running=true
    boxes.forEach(box=>{
        box.innerHTML="";
        box.classList.remove("win")
    })
}

