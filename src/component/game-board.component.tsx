import { useContext, useEffect } from "react";
import { CollectorContext } from "../context/collector.context";
import { GameContext } from "../context/game.context";
import { TimerContext } from "../context/timer.context";
import { Grid } from "../model/grid.model";
import { GridRowComponent } from "./grid-row.component";

export const GameBoardComponent: React.FC<{}> = () => {
    const { grid, startGame, checkForWinner } = useContext(GameContext)
    const { startTimer } = useContext(TimerContext)
    const { startCollector } = useContext(CollectorContext)

    const startPlaying = () => {
        startGame()
        startTimer()
        startCollector()
    }

    useEffect(() => {
        checkForWinner()
    }, [grid])

    return (
        <div className="flex flex-col gap-[1px] mx-auto">
            {grid.map((gridRow: Grid[]) => {
                return <GridRowComponent gridRow={gridRow} />
            })}
            <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                onClick={startPlaying}>Start Game</button>
        </div>
    );
}