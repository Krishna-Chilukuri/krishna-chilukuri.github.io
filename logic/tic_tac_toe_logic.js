var xoMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var winList =   [[[0, 0], [0,1], [0, 2]], [[1,0], [1,1], [1,2]], [[2,0], [2,1], [2,2]],
                [[0, 0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]],
                [[0,0], [1,1], [2,2]], [[0,2], [1,1], [2,0]]];

const coordinateToCell = [["cell1", "cell2", "cell3"], 
                        ["cell4", "cell5", "cell6"],
                        ["cell7", "cell8", "cell9"]];

var modeOfGame = 0;
var gameOver = false;

const resultPara = document.querySelector(".resultPara");
const ticTacCells = document.querySelector(".tictactoeCell");

function resetGame() {
    xoMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    console.log("XO MATRIX SET TO 0");
    gameOver = false;
    for (let index = 1; index < 10; index++){
        // const element = array[index];
        // let index11 = String(index);
        // const cellID = 'cell ${index1}';
        const cellID = 'cell'+index;
        document.getElementById(cellID).innerHTML = "";
        console.log(cellID, typeof(cellID));
    }
    // document.getElementById("cell4").onclick = playerMove(1,0);
}

function checkForWin(val){

    return winList.some(listof3 => {
        // console.log(xoMatrix[listof3[0][0]][listof3[0][1]], xoMatrix[listof3[1][0]][listof3[1][1]], xoMatrix[listof3[2][0]][listof3[2][1]])
        if (xoMatrix[listof3[0][0]][listof3[0][1]] == xoMatrix[listof3[1][0]][listof3[1][1]] && xoMatrix[listof3[1][0]][listof3[1][1]] == xoMatrix[listof3[2][0]][listof3[2][1]] && xoMatrix[listof3[2][0]][listof3[2][1]] == val) {
            // console.log("INSIDE THE IF")
            return true;            
        }
    });
}

function isGameNotOver(){
    return xoMatrix.some(row => {
        return row.some(cell => {
            // console.log(cell)
            if(cell == 0){
                return true;
            }
        });
    });
}

function getCellsAvailable(){
    emptyCells = [];
    for (let rowIndex = 0; rowIndex < xoMatrix.length; rowIndex++) {
        const row = xoMatrix[rowIndex];
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const element = row[colIndex];
            if(element == 0){
                emptyCells.push([rowIndex, colIndex]);
            }   
        }        
    }
    return emptyCells;
}

function returnScore(depth){
    if(checkForWin(1)) {
        return depth - 10;
    }
    else if (checkForWin(2)) {
        return 10 - depth;
    } 
    else {
        return 0
    }
}

function checkForUserWin(cell){
    xoMatrix[cell[0]][cell[1]] = 1;
    if(checkForWin(1)){
        xoMatrix[cell[0]][cell[1]] = 0;
        return true;
    }
    xoMatrix[cell[0]][cell[1]] = 0;
    return false;
}

function checkForAIWin(cell){
    xoMatrix[cell[0]][cell[1]] = 2;
    if(checkForWin(2)){
        xoMatrix[cell[0]][cell[1]] = 0;
        return true;
    }
    xoMatrix[cell[0]][cell[1]] = 0;
    return false;
}

function miniMax(depth, currentMove){
    if(currentMove == 3) {
        currentMove = 1;
        depth += 1;
    }
    // let a = prompt("dkakjdsbn");
    if(!isGameNotOver()) {
        let retArr = [];
        retArr.push(returnScore(depth));
        // return [returnScore(depth)];
        return retArr;
    }
    // let aa = prompt("dkakjdsbn");
    let scores = [];
    let moves = getCellsAvailable();

    moves.forEach(move => {
        // console.log(move);
        // let xx = prompt("AKHDjk");
        if(currentMove == 1 && checkForAIWin(move)) {
            scores.push(10 - depth);
        }
        else if (currentMove == 2 && checkForUserWin(move)) {
            scores.push(depth - 10);
        } 
        else {
            if(currentMove == 1) {
                xoMatrix[move[0]][move[1]] = 2;
            }
            else {
                xoMatrix[move[0]][move[1]] = 1;
            }
            // xoMatrix[move[0]][move[1]] = currentMove - 1;//CHECK THIS
            // console.log("PUSH START");
            let retVal = miniMax(depth, currentMove + 1);
            // console.log(retVal, retVal[0]);
            // if(retVal[0] == undefined) {
                // console.log("UNDEFINED RETURNED");
                // let xad = prompt("WAITING!!!!");
            // }
            scores.push(retVal[0]);
            // console.log(scores);
            xoMatrix[move[0]][move[1]] = 0;
        }
    });
    if(currentMove == 1){
        let maxScoreInd = 0;
        for (let index = 0; index < scores.length; index++) {
            const element = scores[index];
            if(element > scores[maxScoreInd]) {
                maxScoreInd = index;
            }
        }
        // let maxScoreInd = scores.indexOf(Math.max(scores));
        let choice = moves[maxScoreInd];
        // console.log("RETURNING FROM IF", maxScoreInd, choice, scores);
        // console.log("SCORES IS: ",scores)
        return [scores[maxScoreInd], choice, scores, moves]
    }
    else{
        let minScoreInd = 0;
        for (let index = 0; index < scores.length; index++) {
            const element = scores[index];
            if (element < scores[minScoreInd]){
                minScoreInd = index;
            }
        }
        // let minScoreInd = scores.indexOf(Math.min(scores));
        let choice = moves[minScoreInd];
        // console.log("RETURNING FROM ELSE", minScoreInd, scores);
        return [scores[minScoreInd], choice, scores, moves]
    }
}

function blockAllInputs() {
    console.log("INPUTS DISABLED");
    // ticTacCells.disabled = true;
    gameOver = true;
    // document.getElementById("cell1").disabled = true;
    // document.getElementById("cell4").onclick = blockThis();
}


const playerMove = (x, y, cellId) => {
    if (!gameOver && xoMatrix[x][y] == 0){
        xoMatrix[x][y] = 1;
        console.log(cellId, typeof(cellId));
        // <img src="../resources/xIcon." alt="">
        {/* <img src="../resources/oIcon." alt=""> */}
        document.getElementById(cellId).innerHTML='<img src="../resources/xIcon.png" alt="X"/>';
        // document.getElementById("cell1")
        console.log("User played his move properly!!");
        if(!isGameNotOver()) {
            console.log("It's a Win - Win situation");
            resultPara.textContent = "It's a Win - Win situation";
            blockAllInputs();
            //Block all other inputs except for reset
            // Result para ni set cheyyali with the above msg
        }
        else if(checkForWin(1)) {
            console.log("U Won the game");
            resultPara.textContent = "U Won the game";
            blockAllInputs();
            //Block all other inputs except for reset
            // Result para ni set cheyyali with the above msg
        }
        else {
            let retCell = miniMax(0, 1)[1];
            console.log("Return Cell from minimax: ",retCell);
            xoMatrix[retCell[0]][retCell[1]] = 2;
            console.log("COORDINATES: ",retCell[0], retCell[1]);
            let retCellID = coordinateToCell[retCell[0]][retCell[1]];
            console.log("ETST",retCellID)
            document.getElementById(retCellID).innerHTML='<img src="../resources/oIcon.png" alt="O"/>';

            console.log("AI move completed!!!!");
            if(!isGameNotOver()) {
                console.log("It's a Win - Win situation");
                resultPara.textContent = "It's a Win - Win situation";
                blockAllInputs();
                //Block all other inputs except for reset
                // Result para ni set cheyyali with the above msg
            }
            else if(checkForWin(2)) {
                console.log("COM Won the game!!!");
                resultPara.textContent = "COM Won the game!!!";
                blockAllInputs();
                //Block all other inputs except for reset
                // Result para ni set cheyyali with the above msg
            }
        }
    }
    else if(gameOver) {
        console.log("GAME IS OVER!!! Click Reset or Reload page");
    }
    else {
        console.log("User clicked on a previously assigned cell!!");
    }
    // console.log("FAIL!!");
    console.log(xoMatrix[0], xoMatrix[1], xoMatrix[2]);
}

// playerMove(1,1);