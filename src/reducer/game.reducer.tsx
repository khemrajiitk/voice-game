import { GameAction } from "../action/game.action";
import { Action } from "../model/action.model";
import { GameState } from "../model/game-state.model";

export const GameReducer = (state: GameState, action: Action): GameState => {
    const { type, payload } = action

    switch (type) {
        case GameAction.INIT_GAME:
            return {
                ...state,
                stage: payload.stage
            };
        default:
            throw new Error(`No case for type ${type} found in GameReducer.`);
    }

}