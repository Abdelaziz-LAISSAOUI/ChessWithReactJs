import { useState } from 'react'
import '../App.css'
import Bishop from './Bishop'
import King from './King'
import Knight from './Knight'
import Pawn from './Pawn'
import Queen from './Queen'
import Rook from './Rook'
import Square from './Square'
// import { GameContext } from './GameContext'



function Board() {

    const [touchedPiece, setTouchedPiece] = useState({
        row: 99, col: 99, piece: null
    })
    const [turn, setTurn] = useState('white');
    // const [isCheck, setIsCheck] = useState(false);
    // const [isCheckmate, setIsCheckmate] = useState(false);

    const initialBoradState = Array.from({ length: 8 }, () => Array(8).fill(null));

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            i === 0 ? (
                // j === 0 || j === 7 ? initialBoradState[i][j] = 'bRook' :
                j === 0 || j === 7 ? initialBoradState[i][j] = <Rook color='black' /> :
                    j === 1 || j === 6 ? initialBoradState[i][j] = <Knight color='black' /> :
                        j === 2 || j === 5 ? initialBoradState[i][j] = <Bishop color='black' /> :
                            j === 3 ? initialBoradState[i][j] = <Queen color='black' /> :
                                j === 4 ? initialBoradState[i][j] = <King color='black' /> : null
            ) :
                i === 1 ? initialBoradState[i][j] = <Pawn color='black' /> :
                    i === 6 ? initialBoradState[i][j] = <Pawn color='white' /> :
                        i === 7 ? (
                            j === 0 || j === 7 ? initialBoradState[i][j] = <Rook color='white' /> :
                                j === 1 || j === 6 ? initialBoradState[i][j] = <Knight color='white' /> :
                                    j === 2 || j === 5 ? initialBoradState[i][j] = <Bishop color='white' /> :
                                        j === 3 ? initialBoradState[i][j] = <Queen color='white' /> :
                                            j === 4 ? initialBoradState[i][j] = <King color='white' /> : null
                        ) :
                            initialBoradState[i][j] = null
        }
    }

    const [board, setBoard] = useState(initialBoradState)

    // handle the Game
    const handleClick = (row, col) => { // chosing the piece to play with 
        if (!touchedPiece.piece) {
            if (board[row][col] !== null && board[row][col].props.color === turn) {
                const touched = {
                    piece: board[row][col],
                    row: row,
                    col: col
                }
                console.log(touched)
                setTouchedPiece(touched)
                board[row][col].props.color === 'white' ? setTurn('black') : setTurn('white') // see if we have to change it
            }
        }
        else {  // playing & validating
            if (board[row][col] === null || board[row][col].props.color !== touchedPiece.piece.props.color) {
                switch (touchedPiece.piece.type.name) {
                    case 'Pawn': {
                        if (handlePawnMovement(board, touchedPiece.row, touchedPiece.col, touchedPiece.piece.props.color, row, col)) {
                            let newBoardState = deepCopy2DArray(board)
                            newBoardState[row][col] = touchedPiece.piece
                            newBoardState[touchedPiece.row][touchedPiece.col] = null
                            setTouchedPiece({ ...touchedPiece, piece: null })
                            setBoard(newBoardState)
                        } else {
                            console.log("INCORRECT")
                            setTouchedPiece({ ...touchedPiece, piece: null })
                            turn === 'white' ? setTurn('black') : setTurn('white') // to choose another piece to play with
                        }
                        break;
                    }
                    case 'Rook':
                        //   handleRookMove(x, y);
                        break;
                    case 'Knight':
                        //   handleKnightMove(x, y);
                        break;
                    case 'Bishop':
                        //   handleBishopMove(x, y);
                        break;
                    case 'Queen':
                        //   handleQueenMove(x, y);
                        break;
                    case 'King':
                        //   handleKingMove(x, y);
                        break;
                    default: {
                        break;
                    }
                }

                // let newBoardState = deepCopy2DArray(board)
                // newBoardState[row][col] = touchedPiece.piece
                // newBoardState[touchedPiece.row][touchedPiece.col] = null
                // setTouchedPiece({ ...touchedPiece, piece: null })
                // setBoard(newBoardState)



            }
        }
    }

    const renderSquare = (piece, black, key, row, col) => {
        return (
            // <GameContext.Provider key={key} value={{ isBlackTurn, setIsBlackTurn, board, setBoard, touchedPiece, setTouchedPiece, isCheck, setIsCheck, isCheckmate, setIsCheckmate }}>
            <Square key={key} isItBlack={black} onSquareClick={() => {
                handleClick(row, col)
            }}>
                {piece}
            </Square>
            // </ GameContext.Provider>
        );
    }

    let b = false;  // b <==> isblackSquare 
    let boardRows = []

    // render squares
    for (let row = 0; row < 8; row++) {
        let squaresInRow = []
        for (let col = 0; col < 8; col++) {
            let key = row * 8 + col
            squaresInRow.push(renderSquare(board[row][col], b, key, row, col))
            b = !b
        }
        b = !b
        boardRows.push(<div key={row} className="board-row">{squaresInRow}</div>);
    }

    return (
        <>
            {boardRows}
        </>
    )
}

export default Board

function deepCopy2DArray(array) {
    return array.map((row) => [...row]);
}


function handlePawnMovement(board, currentRow, currentCol, color, nextRow, nextCol) {
    let possibleMovement = []

    if (color === "white") {


        if (currentRow > 0 && !board[currentRow - 1][currentCol]) // move with one square
            possibleMovement.push({ row: currentRow - 1, col: currentCol })

        if (currentRow === 6) { // first move with two squares 
            if (!board[currentRow - 2][currentCol])
                possibleMovement.push({ row: currentRow - 2, col: currentCol })
        }

        // eating to right
        if (currentCol !== 7 && board[currentRow - 1][currentCol + 1])
            possibleMovement.push({ row: currentRow - 1, col: currentCol + 1 })
        // eating to left 
        if (currentCol !== 0 && board[currentRow - 1][currentCol - 1])
            possibleMovement.push({ row: currentRow - 1, col: currentCol - 1 })

    } else {/**************** color === "black" ***************/

        if (currentRow < 7 && !board[currentRow + 1][currentCol]) //move with one square
            possibleMovement.push({ row: currentRow + 1, col: currentCol })

        if (currentRow === 1) { // first move with two squares 
            if (!board[currentRow + 1][currentCol])
                possibleMovement.push({ row: currentRow + 2, col: currentCol })
        }
        // eating to right
        if (currentCol !== 7 && board[currentRow + 1][currentCol + 1])
            possibleMovement.push({ row: currentRow + 1, col: currentCol + 1 })
        // eating to left 
        if (currentCol !== 0 && board[currentRow + 1][currentCol - 1])
            possibleMovement.push({ row: currentRow + 1, col: currentCol - 1 })

    }

    console.log("current %d %d", currentRow, currentCol)
    console.log(possibleMovement)
    console.log(nextRow, nextCol)

    for (let i = 0; i < possibleMovement.length; i++) {
        let { row, col } = possibleMovement[i]
        if (row === nextRow && col === nextCol)
            return true;
    }
    return false;
}

/*
function handlePawnTranformation() {
}

function handleRookMovement(currentRow, currenetCol, nextRow, nextCol) {
    return true;
}
function handleBishopMovement(currentRow, currenetCol, nextRow, nextCol) {
    return true;
}
function handleKingMovement(currentRow, currenetCol, nextRow, nextCol) {
    return true;
}
function handleQueenMovement(currentRow, currenetCol, nextRow, nextCol) {
    return true;
}
function handleSquareMovement(currentRow, currenetCol, nextRow, nextCol) {
    return true;
}
function handleKnightMovement(currentRow, currenetCol, nextRow, nextCol) {
    return true;
}
*/