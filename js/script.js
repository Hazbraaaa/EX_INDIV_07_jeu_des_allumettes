// init variables

const stack = document.querySelector('#stack');
const selectionPlayerOne = document.querySelector('#selection-playerOne');
const selectionPlayerTwo = document.querySelector('#selection-playerTwo');
const infoContainer = document.querySelector('#info-container');
let matchesRemaining = 20;


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
    for (let i = 0; i < matches; i++) {
        stack.innerHTML += `<img src="loic.png" alt="One Match" height="100px">`;
    }
    return matches;
}


// execute code

makeStack(matchesRemaining);
infoContainer.innerText = `Nombre de Loic restants = ${matchesRemaining}`;

selectionPlayerOne.addEventListener('change', () => {
    if (selectionPlayerOne.value > matchesRemaining) {
        infoContainer.innerText = `Nombre de Loic restants = ${matchesRemaining}\nChoisis plus petit !`;
    }
    else {
        matchesRemaining = takeMatches(selectionPlayerOne.value);
        selectionPlayerOne.disabled = true;
        selectionPlayerTwo.disabled = false;
        selectionPlayerTwo.value = "";
        infoContainer.innerText = `Nombre de Loic restants = ${matchesRemaining}`;
        if (matchesRemaining == 0) {
            infoContainer.innerText = "Bravo Joueur 2 !";
        }
    }
})

selectionPlayerTwo.addEventListener('change', () => {
    if (selectionPlayerTwo.value > matchesRemaining) {
        infoContainer.innerText = `Nombre de Loic restants = ${matchesRemaining}\nChoisis plus petit !`;
    }
    else {
        matchesRemaining = takeMatches(selectionPlayerTwo.value);
        selectionPlayerTwo.disabled = true;
        selectionPlayerOne.disabled = false;
        selectionPlayerOne.value = "";
        infoContainer.innerText = `Nombre de Loic restants = ${matchesRemaining}`;
        if (matchesRemaining == 0) {
            infoContainer.innerText = "Bravo Joueur 1 !";
        }
    }
})