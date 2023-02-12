import { useContext, useEffect, useRef } from "react";
import { CollectorContext } from "../context/collector.context";
import { GameContext } from "../context/game.context";
import { CollectorDirection } from "../enum/collector-direction.enum";
import { CollectorStage } from "../enum/collector-stage.enum";
import { Grid } from "../model/grid.model";

export const CollectorComponent: React.FC<{ grid: Grid }> = ({ grid }) => {
    const { speed, gridSize, collectObject } = useContext(GameContext)
    const { position, stage, direction, moveCollector } = useContext(CollectorContext)

    const directionRef = useRef(direction)
    directionRef.current = direction

    const startMoving = () => {
        setTimeout(() => {
            if (grid.includeObject && !grid.picked) {
                collectObject(grid.position)
            }
            moveCollector(position, directionRef.current, gridSize)
        }, speed)
    }

    useEffect(() => {
        if ((grid.position.x == position.x && grid.position.y == position.y) && stage == CollectorStage.Moving) {
            startMoving()
        }
    }, [position, stage])

    return (
        <div className="w-[100%] h-[100%] ">
            {direction == CollectorDirection.UP &&
                <img src="arrow_up.png" className="w-[40%] h-[40%] absolute top-0 left-[30%]" />
            }
            {direction == CollectorDirection.DOWN &&
                <img src="arrow_down.png" className="w-[40%] h-[40%] absolute bottom-0 left-[30%]" />
            }
            {direction == CollectorDirection.LEFT &&
                <img src="arrow_left.png" className="w-[40%] h-[40%] absolute top-[30%] left-0" />
            }
            {direction == CollectorDirection.RIGHT &&
                <img src="arrow_right.png" className="w-[40%] h-[40%] absolute right-0 top-[30%]" />
            }
            <img src="collector.gif" className="w-[42%] h-[42%] absolute top-[29%] left-[29%]" />
        </div>
    );
}