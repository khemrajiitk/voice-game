import { useContext, useEffect } from "react";
import { GameContext } from "../context/game.context";
import { TimerContext } from "../context/timer.context";
import { GridRowComponent } from "./grid-row.component";

export const GameBoardComponent: React.FC<{}> = () => {
    const { stopGame } = useContext(GameContext)
    const { startTime, startTimer } = useContext(TimerContext)

    useEffect(() => {
        startTimer()
    }, [])

    const finalList = []
    for (let i = 0; i < 20; i++) {
        finalList.push(i)
    }
    return (
        <div className="flex flex-col gap-[1px] mx-auto">
            {finalList.map(() => {
                return <GridRowComponent />
            })}
            <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                onClick={stopGame}>Stop Game</button>
        </div>
    );
}