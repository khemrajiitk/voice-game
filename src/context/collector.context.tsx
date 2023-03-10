import { createContext, useReducer } from "react";
import { CollectorAction } from "../action/collector.action";
import { CollectorDirection } from "../enum/collector-direction.enum";
import { CollectorStage } from "../enum/collector-stage.enum";
import { CollectorState } from "../model/collector.state";
import { Position } from "../model/grid.model";
import { CollectorReducer } from "../reducer/collector.reducer";

const initialState = {
    stage: CollectorStage.Study,
    direction: CollectorDirection.RIGHT,
    position: {
        x: 1,
        y: 1
    } as Position
} as CollectorState

export const CollectorContext = createContext<any>(initialState);

export const CollectorStateProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(CollectorReducer, initialState)

    const initCollector = () => {
        dispatch({
            type: CollectorAction.INIT,
            payload: {}
        });
    }
    const startCollector = () => {
        dispatch({
            type: CollectorAction.START,
            payload: {}
        });
    };

    const stopCollector = () => {
        dispatch({
            type: CollectorAction.STOP,
            payload: {}
        });
    };

    const updateDirection = (direction: CollectorDirection) => {
        dispatch({
            type: CollectorAction.UPDATE_DIRECTION,
            payload: {
                direction: direction
            }
        });
    };

    const moveCollector = (position: Position, direction: CollectorDirection, gridSize: number) => {
        let _x = 1
        let _y = 1

        switch (direction) {
            case CollectorDirection.LEFT:
                _x = position.x
                if (position.y == 1) {
                    _y = gridSize
                } else {
                    _y = position.y - 1
                }
                break;
            case CollectorDirection.RIGHT:
                _x = position.x
                if (position.y == gridSize) {
                    _y = 1
                } else {
                    _y = position.y + 1
                }
                break;
            case CollectorDirection.UP:
                _y = position.y
                if (position.x == 1) {
                    _x = gridSize
                } else {
                    _x = position.x - 1
                }
                break;
            case CollectorDirection.DOWN:
                _y = position.y
                if (position.x == gridSize) {
                    _x = 1
                } else {
                    _x = position.x + 1
                }
                break;
            default:
                alert(`In valid Direction of collector. Moving at start`);
        }
        dispatch({
            type: CollectorAction.MOVE,
            payload: {
                position: {
                    x: _x,
                    y: _y,
                }
            }
        });
    };

    const value = {
        stage: state.stage,
        position: state.position,
        direction: state.direction,
        initCollector,
        startCollector,
        stopCollector,
        moveCollector,
        updateDirection
    };

    return <CollectorContext.Provider value={value}>{children}</CollectorContext.Provider>
};