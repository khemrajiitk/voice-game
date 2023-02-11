import { Grid } from "../model/grid.model";
import { GridComponent } from "./grid.component";

export const GridRowComponent: React.FC<{ gridRow: Grid[] }> = ({ gridRow }) => {
    return (
        <div className="flex flex-row gap-[1px]">
            {gridRow.map((grid: Grid) => {
                return <GridComponent grid={grid} key={grid.id} />
            })}
        </div>
    );
}