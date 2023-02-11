import React from "react";
import { Grid } from "../model/grid.model";
import { GridComponent } from "./grid.component";

const GridRowComponentBase: React.FC<{ gridRow: Grid[] }> = ({ gridRow }) => {
    return (
        <div className="flex flex-row gap-[1px]">
            {gridRow.map((grid: Grid) => {
                return <GridComponent grid={grid} />
            })}
        </div>
    );
}

export const GridRowComponent = React.memo(GridRowComponentBase);