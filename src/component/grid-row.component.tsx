import { GridComponent } from "./grid.component";

export const GridRowComponent: React.FC<{}> = () => {
    const finalList = []
    for (let i = 0; i < 20; i++) {
        finalList.push(i)
    }
    return (
        <div className="flex flex-row gap-[1px]">
            {finalList.map(() => {
                return <GridComponent />
            })}
        </div>
    );
}