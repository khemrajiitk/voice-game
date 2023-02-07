import { GameStage } from "../enum/game-stage.enum";
import { GridSize } from "../enum/grid-size.enum";
import { Grid, Position } from "./grid.model";

export interface GameState {
    stage: GameStage
    speed: number
    grideSize: GridSize
    gridList: Grid[]
    score: number,
    boardStart: Position //position of board left top point
    boardEnd: Position // position of board right bottom point
}