import { CollectorAction } from "../action/collector.action";
import { CollectorStage } from "../enum/collector-stage.enum";
import { Action } from "../model/action.model";
import { CollectorState } from "../model/collector.state";
import { Position } from "../model/grid.model";

export const CollectorReducer = (state: CollectorState, action: Action): CollectorState => {
    const { type, payload } = action

    switch (type) {
        case CollectorAction.INIT:
            return {
                ...state,
                stage: CollectorStage.Study,
                position: {
                    x: 1,
                    y: 1
                } as Position
            };
        case CollectorAction.START:
            return {
                ...state,
                stage: CollectorStage.Moving,
            };
        case CollectorAction.STOP:
            return {
                ...state,
                stage: CollectorStage.Study,
            };
        case CollectorAction.UPDATE_DIRECTION:
            return {
                ...state,
                direction: payload.direction
            };
        case CollectorAction.MOVE:
            return {
                ...state,
                position: { ...payload.position }
            };
        default:
            throw new Error(`No case for type ${type} found in CollectorReducer.`);
    }
}