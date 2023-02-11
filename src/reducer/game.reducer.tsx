import { GameAction } from "../action/game.action";
import { Action } from "../model/action.model";
import { GameState } from "../model/game-state.model";

export const GameReducer = (state: GameState, action: Action): GameState => {
    const { type, payload } = action

    switch (type) {
        case GameAction.INIT_GAME:
            return {
                ...state,
                stage: payload.stage,
                grid: payload.grid
            };
        case GameAction.READY_GAME:
            return {
                ...state,
                stage: payload.stage,
                grid: [...payload.grid]
            };
        case GameAction.START_GAME:
            return {
                ...state,
                stage: payload.stage
            };
        case GameAction.UPDATE_SPEED:
            return {
                ...state,
                speed: payload.speed
            };
        case GameAction.UPDATE_GRID_SIZE:
            return {
                ...state,
                gridSize: payload.gridSize
            };
        case GameAction.STOP_GAME:
            return {
                ...state,
                stage: payload.stage
            };
        case GameAction.UPDATE_SCORE:
            return {
                ...state,
                score: payload.score
            };
        case GameAction.UPDATE_GRID:
            const _grid = [...state.grid]
            _grid[payload.position.x - 1][payload.position.y - 1].picked = true
            return {
                ...state,
                grid: [..._grid]
            };
        case GameAction.UPDATE_LOADING:
            const _loading = !state.loading
            return {
                ...state,
                loading: _loading
            };
        default:
            throw new Error(`No case for type ${type} found in GameReducer.`);
    }

}