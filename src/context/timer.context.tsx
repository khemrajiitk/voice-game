import { createContext, useReducer } from "react";
import { TimerAction } from "../action/timer.action";
import { TimerStage } from "../enum/timer-stage.enum";
import { TimerState } from "../model/timer-state.model";
import { TimerReducer } from "../reducer/timer.reducer";

const initialState = {
    startTime: 0,
    endTime: 0,
    stage: TimerStage.NotInit
} as TimerState

export const TimerContext = createContext<any>(initialState);

export const TimerStateProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(TimerReducer, initialState)

    const initTimer = () => {
        dispatch({
            type: TimerAction.INIT_TIMER,
            payload: {
                stage: TimerStage.NotInit
            }
        });
    };

    const startTimer = () => {
        dispatch({
            type: TimerAction.START_TIMER,
            payload: {
                stage: TimerStage.Started
            }
        });
    };

    const stopTimer = (endTime: number) => {
        dispatch({
            type: TimerAction.STOP_TIMER,
            payload: {
                stage: TimerStage.Stopped,
                endTime: endTime
            }
        });
    };

    const value = {
        stage: state.stage,
        startTime: state.startTime,
        endTime: state.endTime,
        initTimer,
        startTimer,
        stopTimer,
    };

    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
};