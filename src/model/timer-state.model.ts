import { TimerStage } from "../enum/timer-stage.enum"

export interface TimerState {
    startTime: number
    endTime: number
    stage: TimerStage
}