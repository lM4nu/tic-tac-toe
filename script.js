const aiBtn = document.querySelector('#AI');
const playerBtn = document.querySelector('#twoPlayers');
const buttonsCont = document.querySelector('#menu-btns');
const inputs = document.querySelectorAll('.box') ;
const boardCont = document.querySelector('.boardCont');
const board = document.querySelector('.board');
const resetDiv = document.querySelector('#reset-btn-cont')
const resetBtn = document.querySelector('#reset-btn')
const winnerMsg = document.querySelector('.winner-msg')

let aiOn = false;

aiBtn.addEventListener('click', () =>{
    boardCont.classList.remove('hidden');
    buttonsCont.classList.add('hidden');
    aiOn = true;
});

playerBtn.addEventListener('click', () =>{
    boardCont.classList.remove('hidden');
    buttonsCont.classList.add('hidden');
});


let currentPlayerSymbol = 'X';

const gameBoard = ( () => {

let firstPlayerPositions = [];
let secondPlayerPositions = [];
let gameWin = false;
const winnerPositions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];


const checkWin = (playerArr) => {
    let aux = false
    winnerPositions.forEach( array => {
        if(compareTwoArr(playerArr,array)){
            gameWin = true;
            aux = true;
        }

    })
    return aux;

}

const compareTwoArr = (arr1,arr2) => {
    let aux = true;
    arr2.forEach(el => {
        if(!arr1.includes(el)){
           aux = false; 
        }
    });

    return aux;
}

const isBoxValid = (position) => {
    const box = board.querySelector(`#box-${position}`);
     return !Boolean(box.innerText);
}

const noMoreSpaces = () => {
    let aux = true;
    for (let i=0;i<9;i++){
        if(isBoxValid(i)){
            aux = false;
        }
    }
    return aux;

}

const cleanBoard = () => {
    board.querySelectorAll('div').forEach(box => box.innerHTML = "")
}

const reset = () => {
    cleanBoard();
    resetDiv.classList.add('hidden');
    winnerMsg.classList.add('hidden');
    boardCont.classList.add('hidden');
   firstPlayerPositions = [];
   secondPlayerPositions = [];
    currentPlayerSymbol = "X";
    gameWin = false;
    aiOn = false;
    buttonsCont.classList.remove('hidden')
}

const showWinner = (winner) => {
    winnerMsg.innerText = `Player ${winner} Wins`
   winnerMsg.classList.remove('hidden') 
    resetDiv.classList.remove('hidden');
}

const drawInput = (position,player) => {
    
    board.querySelector(`#box-${position}`).innerHTML = `<h1> ${player}</h1>`;
    if( checkWin(firstPlayerPositions)  ) {
        showWinner(1);

    }

    if( checkWin(secondPlayerPositions) ){
        showWinner(2);
    }
}


const currentPlayerPosition = (position) => {
if (currentPlayerSymbol == 'X'){
    firstPlayerPositions.push(position);
}else {
    secondPlayerPositions.push(position);
}
}


const switchPlayer = () => {
    if(currentPlayerSymbol == 'X') {
        currentPlayerSymbol = 'O';
    }else{
        currentPlayerSymbol = "X";
    }
}

const aiTurn = (symbol) => {
    if(noMoreSpaces() || gameWin) {
        return ;
    }
    
        let randomNumber = Math.floor(Math.random() * (8 - 0 + 1))
        
        while(firstPlayerPositions.includes(randomNumber) || secondPlayerPositions.includes(randomNumber) ) {
        randomNumber = Math.floor(Math.random() * (8 - 0 + 1));
        }

        secondPlayerPositions.push(randomNumber);
        drawInput(randomNumber,symbol);


}

const PlayerTurn = (posEl,player) => {

    if(noMoreSpaces() || gameWin) {
        return ;
    }

    const position = parseInt(posEl.getAttribute('id').match(/\d/).join('') ) ;
        
    
    if(isBoxValid(position)){
            currentPlayerPosition(position);
            drawInput(position,player);
            if(aiOn){
            aiTurn('O');
            }else {
                switchPlayer();
            }
        }

}




return{
    PlayerTurn,
    reset
}


})();

resetBtn.addEventListener('click', gameBoard.reset);


inputs.forEach(input => {
    input.addEventListener('click',(e) => {
        gameBoard.PlayerTurn(e.target,currentPlayerSymbol);
    })
})
