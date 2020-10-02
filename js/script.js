let width = 28;
let grid = document.querySelector('.grid');
let scoreHTML = document.getElementById('score');
let squares = [];
let score = 0;

/*definition
0 - path
1 - wall
2 - ghost
3 - power
4 - empty

*/

let template = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,0,2,2,0,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function createBoard() {
    for (let i= 0; i<template.length; i++) {
        let square =  document.createElement('div');
        grid.appendChild(square);
        squares.push(square);

        if (template[i] === 0) {
            squares[i].classList.add('path')
        } else if (template[i] === 1) {
            squares[i].classList.add('wall')
        } else if (template[i] === 2) {
            squares[i].classList.add('ghost')
        } else if (template[i] === 3) {
            squares[i].classList.add('power')
        }

    }
}

createBoard();

/*
up - 38
left - 37
right -39
down - 40

*/

let pacmanPosition = 490;
squares[pacmanPosition].classList.add('pacman')

function control(e) {
    squares[pacmanPosition].classList.remove('pacman')
    switch(e.keyCode) {
        case 38:
            if( !squares[pacmanPosition - width].classList.contains('ghost') && !squares[pacmanPosition - width].classList.contains('wall') && pacmanPosition - width >=0) {
                pacmanPosition = pacmanPosition - width; 
            }
        break
        case 39:
            if( !squares[pacmanPosition + 1].classList.contains('ghost') &&  !squares[pacmanPosition + 1].classList.contains('wall') && pacmanPosition % width < width -1) {
                pacmanPosition = pacmanPosition + 1;
            }
            if (pacmanPosition === 391) {
                pacmanPosition = 364;
            }
        break
        case 40:
            if( !squares[pacmanPosition + width].classList.contains('ghost') && !squares[pacmanPosition + width].classList.contains('wall') && pacmanPosition + width < width * width) {
                pacmanPosition = pacmanPosition + width;
            }
        break
        case 37:
            if(  !squares[pacmanPosition -1].classList.contains('ghost') && !squares[pacmanPosition - 1].classList.contains('wall') && pacmanPosition % width !==0) {
                pacmanPosition = pacmanPosition - 1;
            }
            if (pacmanPosition === 364) {
                pacmanPosition = 391;
            }
        break
    }
    squares[pacmanPosition].classList.add('pacman');
    eat()
    powerEaten()
    gameOver()
    winner()

}

document.addEventListener('keyup', control)


function eat() {
    if (squares[pacmanPosition].classList.contains('path')) {
        squares[pacmanPosition].classList.remove('path')
        score++;
        scoreHTML.innerHTML = score;

    }
}

function powerEaten() {
    if (squares[pacmanPosition].classList.contains('power')) {
        squares[pacmanPosition].classList.remove('power')
        score += 10;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhost, 8000)

    }
}

function unScareGhost() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
    constructor(className, startPosition, speed) {
        this.className = className;
        this.startPosition = startPosition;
        this.speed = speed;
        this.currentPosition = startPosition;
        this.isScared = false;
        this.timerId = NaN;

    }
}

ghosts = [
    new Ghost('pink', 348, 250),
    new Ghost('red', 376, 400),
    new Ghost('blue', 351, 300),
    new Ghost('purple', 379, 500)
]

ghosts.forEach(ghost => {
    squares[ghost.currentPosition].classList.add(ghost.className)
    squares[ghost.currentPosition].classList.add('ghostInv')

});
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
   let directions = [-1, +1, -width, +width];
   let direction = directions[Math.floor(Math.random() * directions.length)];

   ghost.timerId = setInterval(function(){
       if (!squares[ghost.currentPosition + direction].classList.contains('wall') && !squares[ghost.currentPosition + direction].classList.contains('ghostInv')) {
            squares[ghost.currentPosition].classList.remove(ghost.className);
            squares[ghost.currentPosition].classList.remove('ghostInv', 'scared-ghost')
            ghost.currentPosition += direction;
            squares[ghost.currentPosition].classList.add(ghost.className);
            squares[ghost.currentPosition].classList.add('ghostInv');
       } else {
            direction = directions[Math.floor(Math.random() * directions.length)];
       }
       if (ghost.isScared) {
        squares[ghost.currentPosition].classList.add('scared-ghost')
        }

        if (ghost.isScared && squares[ghost.currentPosition].classList.contains('pacman')) {
            squares[ghost.currentPosition].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentPosition = ghost.startPosition;
            score +=100;
            squares[ghost.currentPosition].classList.add(ghost.className, 'ghost')
        }
        gameOver()
   }, ghost.speed)
}

function gameOver() {
    if (squares[pacmanPosition].classList.contains('ghostInv') && !squares[pacmanPosition].classList.contains('scared-ghost')) {

        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreHTML.innerHTML = "Game Over"
    }
}

function winner(){
    if (score === 274) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        scoreHTML.innerHTML = "you win"
    }
}