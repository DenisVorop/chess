import React from 'react'

import BoardComponent from './components/BoardComponent'

import { Board } from './models/Board'
import { Player } from './models/Player'
import { Colors } from './models/Colors'

import './app.css'
import LostFigures from './components/LostFigures'
import Timer from './components/Timer'

const App = () => {
    const [board, setBoard] = React.useState(new Board())
    const [whitePlayer, setWhitePlayer] = React.useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = React.useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(null)

    React.useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer)
    }, [])

    function restart() {
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className="app">
            <Timer
                restart={restart}
                currentPlayer={currentPlayer}
            />
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div className='losts'>
                <LostFigures
                    title='Черные фигуры'
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title='Белые фигуры'
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    )
}

export default App
