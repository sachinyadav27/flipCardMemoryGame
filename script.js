let boardSize,
    emojis,
    gameBoard,
    currentTurn,
    player1Score,
    player2Score,
    flippedCards,
    matchCount,
    playerTurn;

const emojiList = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "🤗",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "😬",
    "🤥",
    "😌",
    "😔",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "😤",
    "😠",
    "😡",
    "🤬",
    "😈",
    "👿",
    "👹",
    "👺",
    "💀",
    "☠️",
    "👻",
    "👽",
    "💩",
    "🤡",
    "👨‍👩‍👧‍👦",
    "🎃",
    "🎄",
    "🎆",
    "🎇",
    "🎈",
    "🎉",
    "🎊",
    "🎋",
    "🎍",
    "🎎",
    "🎏",
    "🎐",
    "🎑",
    "🎥",
    "🎬",
    "🎧",
    "🎤",
    "🎵",
    "🎶",
    "🎼",
    "🎹",
    "🎺",
    "🎻",
    "🎷",
    "🎸",
    "🎺",
    "🎻",
    "🎷",
    "🎸",
    "🎻",
    "🎷",
    "🎸",
];

function startGame(mode) {
    document.getElementById("mode-selection").classList.add("hidden");
    document.getElementById("game-play").classList.remove("hidden");

    switch (mode) {
        case "easy":
            boardSize = 4;
            break;
        case "medium":
            boardSize = 6;
            break;
        case "hard":
            boardSize = 8;
            break;
    }

    emojis = shuffleArray(generateEmojis(boardSize));
    createBoard(boardSize);
    currentTurn = "Player 1";
    player1Score = 0;
    player2Score = 0;
    playerTurn = 1;
    flippedCards = [];
    matchCount = 0;

    updateScoreBoard();
}

function generateEmojis(size) {
    const numEmojis = (size * size) / 2;
    const selectedEmojis = emojiList.slice(0, numEmojis);
    return [...selectedEmojis, ...selectedEmojis].sort(
        () => 0.5 - Math.random(),
    );
}

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createBoard(size) {
    gameBoard = document.getElementById("game-board");
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 60px)`;
    gameBoard.innerHTML = "";

    emojis.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener("click", () => handleCardClick(card));
        gameBoard.appendChild(card);
    });
}

function handleCardClick(card) {
    if (
        flippedCards.length < 2 &&
        !card.classList.contains("flipped") &&
        !card.classList.contains("matched")
    ) {
        card.classList.add("flipped");
        card.textContent = card.dataset.emoji;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        updateScore();
        matchCount += 2;
        if (matchCount === boardSize * boardSize) {
            alert(`${currentTurn} wins!`);
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
        switchTurn();
    }
    flippedCards = [];
}

function updateScore() {
    if (currentTurn === "Player 1") {
        player1Score++;
    } else {
        player2Score++;
    }
    updateScoreBoard();
}

function updateScoreBoard() {
    document.getElementById("player1-score").textContent = player1Score;
    document.getElementById("player2-score").textContent = player2Score;
    document.getElementById("current-turn").textContent = currentTurn;
}

function switchTurn() {
    currentTurn = currentTurn === "Player 1" ? "Player 2" : "Player 1";
    updateScoreBoard();
}

function restartGame() {
    document.getElementById("mode-selection").classList.remove("hidden");
    document.getElementById("game-play").classList.add("hidden");
}
