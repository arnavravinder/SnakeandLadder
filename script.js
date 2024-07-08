document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const rollDiceButton = document.getElementById('rollDice');
    const diceResult = document.getElementById('diceResult');
    const playerInfo = document.getElementById('playerInfo');

    function createBoard() {
        for (let i = 100; i > 0; i--) {
            const cell = document.createElement('div');
            cell.textContent = i;
            board.appendChild(cell);
        }
    }

    createBoard();

    rollDiceButton.addEventListener('click', () => {
        const result = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = `Dice Result: ${result}`;
    });

    AOS.init();
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 25,
        speed: 400
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const rollDiceButton = document.getElementById('rollDice');
    const diceResult = document.getElementById('diceResult');
    const playerInfo = document.getElementById('playerInfo');

    let playerPosition = 1;
    const snakes = {
        16: 6,
        47: 26,
        49: 11,
        56: 53,
        62: 19,
        64: 60,
        87: 24,
        93: 73,
        95: 75,
        98: 78
    };

    const ladders = {
        1: 38,
        4: 14,
        9: 31,
        21: 42,
        28: 84,
        36: 44,
        51: 67,
        71: 91,
        80: 100
    };

    function createBoard() {
        for (let i = 100; i > 0; i--) {
            const cell = document.createElement('div');
            cell.textContent = i;
            cell.id = `cell-${i}`;
            board.appendChild(cell);
        }
    }

    function movePlayer(position) {
        const currentCell = document.querySelector(`#cell-${playerPosition}`);
        currentCell.classList.remove('player');

        playerPosition = position;

        if (snakes[playerPosition]) {
            playerPosition = snakes[playerPosition];
        } else if (ladders[playerPosition]) {
            playerPosition = ladders[playerPosition];
        }

        const newCell = document.querySelector(`#cell-${playerPosition}`);
        newCell.classList.add('player');
        playerInfo.textContent = `Player Position: ${playerPosition}`;
    }

    rollDiceButton.addEventListener('click', () => {
        const result = Math.floor(Math.random() * 6) + 1;
        diceResult.textContent = `Dice Result: ${result}`;

        let newPosition = playerPosition + result;
        if (newPosition > 100) newPosition = 100;

        movePlayer(newPosition);
    });

    createBoard();
    movePlayer(playerPosition);

    AOS.init();
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 25,
        speed: 400
    });
});
