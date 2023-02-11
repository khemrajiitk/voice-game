import { group } from "console";
import { createContext, useReducer } from "react";
import { GameAction } from "../action/game.action";
import { GameStage } from "../enum/game-stage.enum";
import { GameState } from "../model/game-state.model";
import { Grid, Position } from "../model/grid.model";
import { GameReducer } from "../reducer/game.reducer";

const getGrid = (gridSize: number): Grid[][] => {
    const _grid = []
    for (let x = 1; x <= gridSize; x++) {
        const _gridRow = []
        for (let y = 1; y <= gridSize; y++) {
            _gridRow.push({
                id: `${new Date().getTime()}_${x}_${y}`,
                picked: false,
                includeObject: Math.round(Math.random()) == 0 ? false : true,
                position: {
                    x: x,
                    y: y
                }
            } as Grid)
        }
        _grid.push(_gridRow)
    }
    return _grid
}

const initialState = {
    loading: false,
    stage: GameStage.YET_TO_START,
    speed: 2000,
    gridSize: 8,
    grid: getGrid(8),
    score: 0,
    boardStart: {
        x: 0,
        y: 0
    } as Position, //position of board left top point
    boardEnd: {
        x: 0,
        y: 0
    } as Position // position of board right bottom point
} as GameState

export const GameContext = createContext<any>(initialState);

export const GameStateProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(GameReducer, initialState)

    const initGame = () => {
        dispatch({
            type: GameAction.INIT_GAME,
            payload: {
                stage: GameStage.YET_TO_START
            }
        });
    };

    const updateLoading = () => {
        dispatch({
            type: GameAction.UPDATE_LOADING,
            payload: {}
        });
    };

    const readyGame = (gridSize: number) => {
        updateLoading()
        dispatch({
            type: GameAction.READY_GAME,
            payload: {
                stage: GameStage.READY,
                grid: getGrid(gridSize)
            }
        });
    };

    const startGame = () => {
        dispatch({
            type: GameAction.START_GAME,
            payload: {
                stage: GameStage.IN_PROGRESS
            }
        });
    };

    const updateSpeed = (speed: number) => {
        dispatch({
            type: GameAction.UPDATE_SPEED,
            payload: {
                speed: speed
            }
        });
    };

    const updateGridSize = (gridSize: number) => {
        dispatch({
            type: GameAction.UPDATE_GRID_SIZE,
            payload: {
                gridSize: gridSize
            }
        });
    };

    const collectObject = (position: Position) => {
        dispatch({
            type: GameAction.UPDATE_GRID,
            payload: {
                position: { ...position }
            }
        });
    }

    const checkForWinner = () => {
        let winner = true;
        for (let x = 0; x < state.gridSize; x++) {
            for (let y = 0; y < state.gridSize; y++) {
                if (state.grid[x][y].includeObject == true && !state.grid[x][y].picked) {
                    winner = false;
                    break;
                }
            }
            if (winner == false) {
                break;
            }
        }
        if (winner) {
            stopGame()
        }
    }

    const stopGame = () => {
        dispatch({
            type: GameAction.STOP_GAME,
            payload: {
                stage: GameStage.COMPLETED
            }
        });
    };

    const updateScore = (score: number) => {
        dispatch({
            type: GameAction.UPDATE_SCORE,
            payload: {
                score: score
            }
        });
    }

    const value = {
        stage: state.stage,
        speed: state.speed,
        gridSize: state.gridSize,
        grid: state.grid,
        boardStart: state.boardStart,
        boardEnd: state.boardEnd,
        score: state.score,
        loading: state.loading,
        initGame,
        readyGame,
        startGame,
        collectObject,
        updateGridSize,
        updateSpeed,
        stopGame,
        updateScore,
        checkForWinner,
        updateLoading
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
};