let inputDir={x: 0,y: 0};
let lastPastTime=0;
let snakeArr=[{x: 13,y: 15}]
let food={x: 6,y: 7};
let score=0;
let speed=8
const foodSound=new Audio("D:\JUHI\snake game\music_food.mp3");
const gameOver=new Audio("D:\JUHI\snake game\music_gameover.mp3");
const moveSnake=new Audio("D:\JUHI\snake game\music_move.mp3");
const music=new Audio("D:\JUHI\snake game\music_music.mp3");
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPastTime)/1000<(1/speed))
    {
        return;
    }
    lastPastTime=ctime;
    gameEngine();
}
function isCollide (snake)
{
    //if you bump into yourself
    for(i=1;i<snakeArr.length;i++)
    {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
    }
    //if you collide with the wall
    if(snake[0].x >=28 || snake[0].x<=1 || snake[0].y >=28 || snake[0].y<=1)
        return true;
}
function gameEngine()
{
    music.play();
    //updating snake array and food
    if(isCollide(snakeArr))
    {
        gameOver.play();
        music.pause();
            inputDir={x: 0,y: 0};
            alert("Game Over!! Press any key to continue..");
            snakeArr=[{x: 13,y: 15}];
            music.play();
            score=0;
            document.getElementById("score").innerHTML="Score:"+score;
    }
//when ate food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=26;
        food=({x: Math.round(a + (b-a)*Math.random()),y: Math.round(a + (b-a)*Math.random())});
        foodSound.play();
        score=score+1;
        console.log(score);
        document.getElementById("score").innerHTML="Score:"+score;
    }
    //moving the snake
    for (let i=snakeArr.length-2; i>=0; i--)
    {
        // const element=array[i];
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e ,index)=>{
       snakeElement=document.createElement('div');
       snakeElement.style.gridRowStart=e.y;
       snakeElement.style.gridColumnStart=e.x;
       if(index==0)
       {
        snakeElement.classList.add('head');
       }
       else
       {
        snakeElement.classList.add('snake');
       }
        board.appendChild(snakeElement);
    });
    //display food
        foodElement=document.createElement('div');
        foodElement.src="D:\JUHI\snake game\ant.png";
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
     
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir={x: 0,y: 1};
    switch (e.key)
    {   case "ArrowUp":
            console.log("up");
            moveSnake.play();
            inputDir.x=0;
            inputDir.y=-1;
            break;
         
        case "ArrowDown":
            console.log("down");
            moveSnake.play();

            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("left");
            moveSnake.play();

            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("right");
            moveSnake.play();

            inputDir.x=1;
            inputDir.y=0;
            break;
                
         default :
            break;
    }
})