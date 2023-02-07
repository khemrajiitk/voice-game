import { TimerAction } from "../action/timer.action";
import { Action } from "../model/action.model";
import { TimerState } from "../model/timer-state.model";

export const TimerReducer = (state: TimerState, action: Action): TimerState => {
    const { type, payload } = action

    switch (type) {
        case TimerAction.INIT_TIMER:
            return {
                ...state,
                stage: payload.stage,
                startTime: 0,
                endTime: 0,
            };
        case TimerAction.START_TIMER:
            return {
                ...state,
                stage: payload.stage,
                startTime: new Date().getTime()
            };
        case TimerAction.STOP_TIMER:
            return {
                ...state,
                stage: payload.stage,
                endTime: payload.endTime
            };
        default:
            throw new Error(`No case for type ${type} found in TimerReducer.`);
    }

}