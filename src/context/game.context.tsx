import { createContext, useReducer } from "react";
import { GameAction } from "../action/game.action";
import { GameStage } from "../enum/game-stage.enum";
import { GridSize } from "../enum/grid-size.enum";
import { GameState } from "../model/game-state.model";
import { Position } from "../model/grid.model";
import { GameReducer } from "../reducer/game.reducer";

const initialState = {
    stage: GameStage.YET_TO_START,
    speed: 2000,
    grideSize: GridSize.Medium,
    gridList: [],
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

    const startGame = () => {
        dispatch({
            type: GameAction.INIT_GAME,
            payload: {
                stage: GameStage.YET_TO_START
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

    const updateLoading = () => {
        dispatch({
            type: GameAction.UPDATE_LOADING,
            payload: {}
        });
    }

    const value = {
        stage: state.stage,
        speed: state.speed,
        grideSize: state.grideSize,
        gridList: state.gridList,
        boardStart: state.boardStart,
        boardEnd: state.boardEnd,
        startGame,
        updateLoading,
        updateGridSize,
        updateSpeed,
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
};