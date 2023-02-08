import { VCAction } from "../action/voice-controller.action";
import { Action } from "../model/action.model";
import { VCState } from "../model/voice-controller.state";

export const VCReducer = (state: VCState, action: Action): VCState => {
    const { type, payload } = action

    switch (type) {
        case VCAction.UPDATE_COMMAND:
            let lastCommand = state.currentCommand
            return {
                ...state,
                currentCommand: payload.command,
                lastCommand: lastCommand
            };
        case VCAction.UPDATE_STATGE:
            return {
                ...state,
                stage: payload.stage
            };
        default:
            throw new Error(`No case for type ${type} found in VCReducer.`);
    }
}