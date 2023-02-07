import { createContext, useReducer } from "react";
import { GameAction } from "../action/game.action";
import { GameStage } from "../enum/game-stage.enum";
import { GridSize } from "../enum/grid-size.enum";
import { GameState } from "../model/game-state.model";
import { Grid, Position } from "../model/grid.model";
import { GameReducer } from "../reducer/game.reducer";

const getGrid = (): Grid[][] => {
    const _grid = []
    for (let x = 1; x <= 20; x++) {
        const _gridRow = []
        for (let y = 1; y <= 20; y++) {
            _gridRow.push({
                id: `${new Date().getTime()}`,
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
    stage: GameStage.YET_TO_START,
    speed: 2000,
    grideSize: GridSize.Medium,
    grid: getGrid(),
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
                stage: GameStage.YET_TO_START,
                grid: getGrid()
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

    const updateGridSize = (gridSize: GridSize) => {
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
        for (let x = 1; x <= 20; x++) {
            for (let y = 1; y <= 20; y++) {
                if (state.grid[x - 1][y - 1].includeObject == true && !state.grid[x - 1][y - 1].picked) {
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
        grideSize: state.grideSize,
        grid: state.grid,
        boardStart: state.boardStart,
        boardEnd: state.boardEnd,
        score: state.score,
        initGame,
        startGame,
        collectObject,
        updateGridSize,
        updateSpeed,
        stopGame,
        updateScore,
        checkForWinner
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
};