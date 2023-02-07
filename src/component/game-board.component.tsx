import { GridRowComponent } from "./grid-row.component";
import { GridComponent } from "./grid.component";

export const GameBoardComponent: React.FC<{}> = () => {
    const finalList = []
    for (let i = 0; i < 20; i++) {
        finalList.push(i)
    }
    return (
        <div className="flex flex-row gap-[1px] mx-auto">
            {finalList.map(() => {
                return <GridRowComponent />
            })}
        </div>
    );
}