import { VCStage } from "../enum/voice-controller-stage.enum"

export interface VCState {
    lastCommand: string
    currentCommand: string
    stage: VCStage
}