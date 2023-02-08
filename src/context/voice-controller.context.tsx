import { createContext, useReducer } from "react";
import { VCAction } from "../action/voice-controller.action";
import { VCStage } from "../enum/voice-controller-stage.enum";
import { VCState } from "../model/voice-controller.state";
import { VCReducer } from "../reducer/voice-controller.reducer";

const initialState = {
    lastCommand: "",
    currentCommand: "",
    stage: VCStage.Loading
} as VCState

export const VCContext = createContext<any>(initialState);

export const VCStateProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(VCReducer, initialState)

    const initVC = () => {
        dispatch({
            type: VCAction.INIT_VC,
            payload: {}
        });
    };

    const updateCommand = (command: string) => {
        dispatch({
            type: VCAction.UPDATE_COMMAND,
            payload: {
                command: command
            }
        });
    };

    const updateStage = (stage: VCStage) => {
        dispatch({
            type: VCAction.UPDATE_STATGE,
            payload: {
                stage: stage
            }
        });
    };

    const value = {
        stage: state.stage,
        currentCommand: state.currentCommand,
        lastCommand: state.lastCommand,
        updateCommand,
        updateStage,
        initVC
    };

    return <VCContext.Provider value={value}>{children}</VCContext.Provider>
};