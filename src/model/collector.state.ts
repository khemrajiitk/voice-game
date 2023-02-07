import { CollectorDirection } from "../enum/collector-direction.enum"
import { CollectorStage } from "../enum/collector-stage.enum"
import { Position } from "./grid.model"

export interface CollectorState {
    stage: CollectorStage
    direction: CollectorDirection
    position: Position
}