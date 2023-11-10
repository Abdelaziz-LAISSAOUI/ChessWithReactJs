import { useState } from 'react'
import '../App.css'
import Bishop from './Bishop'
import King from './King'
import Knight from './Knight'
import Pawn from './Pawn'
import Queen from './Queen's
import Rook from './Rook'
import Square from './Square'
// import { GameContext } from './GameContext'

function Board() {
    const [touchedPiece, setTouchedPiece] = useState(1)
    // const [isBlackTurn, setIsBlackTurn] = useState(false);
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

    console.log(board)

    const handleClick = (row, col) => {
        if (touchedPiece === 1) {
            setTouchedPiece(board[row][col])
            console.log(board[row][col])
        }
        else {
            let newArr = deepCopy2DArray(board)
            newArr[row][col] = touchedPiece
            touchedPiece.func()
            setTouchedPiece(1)
            setBoard(newArr)
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
        // return (
        //     <Square key={key} peice={i} isItBlack={black} onSquareClick={() => {
        //         handleClick(row, col)
        //     }} />);
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


    // let newArr = deepCopy2DArray(board)

    // newArr[5][5] = <Bishop color='black' />


    return (
        <>
            {/* <button onClick={() => setBoard(newArr)}>update</button> */}
            {boardRows}
        </>
    )
}

export default Board

function deepCopy2DArray(array) {
    return array.map((row) => [...row]);
}