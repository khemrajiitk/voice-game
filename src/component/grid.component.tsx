import React from "react";
import { useContext } from "react";
import { CollectorContext } from "../context/collector.context";
import { Grid } from "../model/grid.model";
import { CollectorComponent } from "./collector.component";

const GridComponentBase: React.FC<{ grid: Grid }> = ({ grid }) => {
    const { position } = useContext(CollectorContext)

    return (
        <div className={`w-[24px] h-[24px] bg-amber-700 relative`}>
            {(grid.includeObject && !grid.picked) && (
                <>
                    <img src="flower.jpeg" width={8} height={8} className="absolute left-0" />
                    <img src="green_flower.jpg" width={8} height={8} className="absolute right-0" />
                    <img src="yellow_flower.jpeg" width={8} height={8} className="absolute left-0 bottom-0" />
                    <img src="orange_flower.webp" width={8} height={8} className="absolute right-0 bottom-0" />
                </>
            )}
            {(grid.position.x == position.x && grid.position.y == position.y) && (
                <CollectorComponent grid={grid}/>
            )}
        </div>
    );
}

export const GridComponent = React.memo(GridComponentBase);