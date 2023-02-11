import { GameStage } from "../enum/game-stage.enum";
import { Grid, Position } from "./grid.model";

export interface GameState {
    loading: boolean
    stage: GameStage
    speed: number
    gridSize: number
    grid: Grid[][]
    score: number,
    boardStart: Position //position of board left top point
    boardEnd: Position // position of board right bottom point
}