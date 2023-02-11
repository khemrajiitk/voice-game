import { useContext, useEffect } from "react";
import { CollectorContext } from "../context/collector.context";
import { GameContext } from "../context/game.context";
import { CollectorStage } from "../enum/collector-stage.enum";
import { Grid } from "../model/grid.model";
import { CollectorComponent } from "./collector.component";

export const GridComponent: React.FC<{ grid: Grid }> = ({ grid }) => {
    const { speed, gridSize, collectObject } = useContext(GameContext)
    const { position, stage, direction, moveCollector } = useContext(CollectorContext)

    const startMoving = () => {
        setTimeout(() => {
            if (grid.includeObject && !grid.picked) {
                collectObject(grid.position)
            }
            moveCollector(position, direction)
        }, speed)
    }

    useEffect(() => {
        if ((grid.position.x == position.x && grid.position.y == position.y) && stage == CollectorStage.Moving) {
            startMoving()
        }
    }, [position, stage])

    const gridSizeClass = `w-[${gridSize}px] h-[${gridSize}px]`

    return (
        <div className={`${gridSizeClass} bg-amber-700 relative`}>
            {(grid.includeObject && !grid.picked) && (
                <>
                    <img src="flower.jpeg" width={8} height={8} className="absolute left-0" />
                    <img src="green_flower.jpg" width={8} height={8} className="absolute right-0" />
                    <img src="yellow_flower.jpeg" width={8} height={8} className="absolute left-0 bottom-0" />
                    <img src="orange_flower.webp" width={8} height={8} className="absolute right-0 bottom-0" />
                </>
            )}
            {(grid.position.x == position.x && grid.position.y == position.y) && (
                <CollectorComponent />
            )}
        </div>
    );
}