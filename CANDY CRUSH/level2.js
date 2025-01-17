// Array de colores básicos
var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple", "Rock"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var movesLeft = 10; // Nuevo: Movimientos disponibles

var currTile;
var otherTile;

window.onload = function() {
    startGame();

    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

// Función para generar un caramelo aleatorio
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

// Función para iniciar el juego
function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // Añadir funcionalidad de arrastrar
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

// Función para verificar si aún quedan movimientos disponibles
function hasMovesLeft() {
    return movesLeft > 0;
}

// Función para descontar un movimiento
function decrementMovesLeft() {
    movesLeft--;
    if (!hasMovesLeft()) {
        alert("Game Over! No more moves left.");
    }
}

// Funciones de arrastrar y soltar
function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    // No se necesita implementación específica
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;
    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent && hasMovesLeft()) { // Nuevo: Verificar si hay movimientos disponibles
        decrementMovesLeft(); // Nuevo: Descontar un movimiento

        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            currTile.src = currImg;
            otherTile.src = otherImg;
        }
    }
}

// Función para verificar combinaciones válidas
function checkValid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
        for (let c = 0; c < columns-3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
        for (let c = 0; c < columns-4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            let candy5 = board[r][c+4];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
        for (let r = 0; r < rows-3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
        for (let r = 0; r < rows-4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            let candy5 = board[r+4][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

var alertShown = false; // Variable para controlar si el alert ya se mostró

// Función para aplastar caramelos
function crushCandy() {
    crushLShape();
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;
    document.getElementById("movesLeft").innerText = movesLeft;

    // Verificar si el puntaje es mayor a 300 y si el alert no se ha mostrado previamente
    if (score > 1500 && !alertShown) {
        alert("¡Tu puntaje es mayor a 300! ¡Algo emocionante puede suceder!");
        // Marcar el alert como mostrado
        alertShown = true;
        // Mostrar el botón cuando se alcanza el puntaje de 300
        document.getElementById("buttonContainer").style.display = "block";
    }
}

// Función para detectar combinaciones en L o T
function crushLShape() {
    for (let r = 0; r < rows-2; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r+1][c];
            let candy5 = board[r+2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
                let color = candy1.src.split("/").pop().split(".")[0];
                candy1.src = getWrappedCandy(color);
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
            }
        }
    }

    for (let r = 0; r < rows-2; r++) {
        for (let c = 2; c < columns; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r][c-1];
            let candy5 = board[r][c-2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
                let color = candy1.src.split("/").pop().split(".")[0];
                candy1.src = getWrappedCandy(color);
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
            }
        }
    }

    for (let r = 2; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r-1][c];
            let candy5 = board[r-2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
                let color = candy1.src.split("/").pop().split(".")[0];
                candy1.src = getWrappedCandy(color);
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
            }
        }
    }
}

// Función para detectar combinaciones de cinco caramelos en fila
function crushFive() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            let candy5 = board[r][c+4];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
                let color = candy1.src.split("/").pop().split(".")[0];
                candy1.src = getColorBomb();
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            let candy5 = board[r+4][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && candy4.src === candy5.src && !candy1.src.includes("blank")) {
                let color = candy1.src.split("/").pop().split(".")[0];
                candy1.src = getColorBomb();
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
            }
        }
    }
}

// Función para detectar combinaciones de cuatro caramelos en fila
function crushFour() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
                let color = candy1.src.split("/").pop().split(".")[0];
                candy1.src = getStripedCandy(color);
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && candy3.src === candy4.src && !candy1.src.includes("blank")) {
                let color = candy1.src.split("/").pop().split(".")[0];
                candy1.src = getStripedCandy(color);
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

// Función para detectar combinaciones de tres caramelos en fila
function crushThree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 80;
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 80;
            }
        }
    }
}

// Función para obtener una imagen de caramelo envuelto
function getWrappedCandy(color) {
    return "./images/" + color + "-Wrapped.png";
}

// Función para obtener una imagen de caramelo rayado
function getStripedCandy(color) {
    return "./images/" + color + "-Striped.png";
}

// Función para obtener una imagen de bomba de color
function getColorBomb() {
    return "./images/colorBomb.png";
}

// Función para deslizar caramelos hacia abajo
function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

// Función para generar nuevos caramelos en la parte superior del tablero
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
