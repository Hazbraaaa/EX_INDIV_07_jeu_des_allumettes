// init variables

const stack = document.querySelector('#stack');
const infoContainer = document.querySelector('#info-container');
const playersContainer = document.querySelector('#players-container');
let matchesRemaining = 20;
let numberOfPlayers = Number(prompt("Nombre de joueurs ? Max = 4"));
let players = [];
let currentPlayer = 0;


// init functions

function takeMatches(number) {
    matchesRemaining -= number;
    stack.innerHTML = "";
    for (let i = 0; i < matchesRemaining; i++) {
        stack.innerHTML += `<img src="loic.png" alt="One Match" height="100px">`;
    }
    return matchesRemaining;
}

function makeStack(matches) {
    infoContainer.innerText = `Nombre de Loic restants = ${matchesRemaining}`;
    for (let i = 0; i < matches; i++) {
        stack.innerHTML += `<img src="loic.png" alt="One Match" height="100px">`;
    }
    return matches;
}

function createPlayers(numberOfPlayers) {
    for (let i = 1; i <= numberOfPlayers; i++) {
        players.push(i);
    }
    players.forEach((player) => {
        const playerDiv = document.createElement('div');
        const label = document.createElement('label');
        const select = document.createElement('select');

        label.innerText = `Joueur ${player} : `;
        playerDiv.classList.add('player');
        select.classList.add('selection');
        select.setAttribute("id", `player${player}`);
        for (let i = 0; i < 4; i++) {
            const option = document.createElement('option');
            if (i == 0) {
                option.innerText = "--Choisis un nombre de Loic--";
                option.value = "";
            }
            else {
                option.innerText = i;
                option.value = i;
            }
            select.appendChild(option);
        }
        playerDiv.appendChild(label);
        playerDiv.appendChild(select);
        playersContainer.appendChild(playerDiv);
    })
}

function updateTurn(allPlayers) {
    allPlayers.forEach((select, index) => {
        if (index == currentPlayer) {
            select.disabled = false;
        }
        else {
            select.disabled = true;
        }
    });
}

function nextTurn(allPlayers) {
    if (currentPlayer >= numberOfPlayers - 1) {
        currentPlayer = 0;
    }
    else {
        currentPlayer += 1;
    }
    updateTurn(allPlayers);
}

function activateSelection() {
    const allPlayers = document.querySelectorAll('.selection');
    
    updateTurn(allPlayers);
    players.forEach((player) => {
        const selectionPlayer = document.querySelector(`#player${player}`);

        selectionPlayer.addEventListener('change', () => {
            if (selectionPlayer.value > matchesRemaining) {
                infoContainer.innerText = `Nombre de Loic restants = ${matchesRemaining}\nChoisis plus petit !`;
            }
            else {
                matchesRemaining = takeMatches(selectionPlayer.value);
                selectionPlayer.value = "";
                infoContainer.innerText = `Nombre de Loic restants = ${matchesRemaining}`;
                if (matchesRemaining == 0) {
                    infoContainer.innerText = `Joueur ${player} a perdu !`;
                }
                nextTurn(allPlayers);
            }
        });
    });
}


// execute code

createPlayers(numberOfPlayers);
makeStack(matchesRemaining);
activateSelection();