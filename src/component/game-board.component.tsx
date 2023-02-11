import { useContext, useEffect } from "react";
import { CollectorContext } from "../context/collector.context";
import { GameContext } from "../context/game.context";
import { TimerContext } from "../context/timer.context";
import { VCContext } from "../context/voice-controller.context";
import { CollectorDirection } from "../enum/collector-direction.enum";
import { GameStage } from "../enum/game-stage.enum";
import { Grid } from "../model/grid.model";
import { GridRowComponent } from "./grid-row.component";

export const GameBoardComponent: React.FC<{}> = () => {
    const { stage, grid, startGame, checkForWinner, gridSize } = useContext(GameContext)
    const { startTimer } = useContext(TimerContext)
    const { startCollector, stopCollector, updateDirection } = useContext(CollectorContext)
    const { currentCommand } = useContext(VCContext)

    const startPlaying = () => {
        startGame()
    }

    useEffect(() => {
        if (stage == GameStage.IN_PROGRESS) {
            startTimer()
            startCollector()
        }
    }, [stage])

    useEffect(() => {
        checkForWinner()
    }, [grid])

    useEffect(() => {
        switch (currentCommand) {
            case "up":
                updateDirection(CollectorDirection.UP)
                break
            case "down":
                updateDirection(CollectorDirection.DOWN)
                break
            case "left":
                updateDirection(CollectorDirection.LEFT)
                break
            case "right":
                updateDirection(CollectorDirection.RIGHT)
                break
            case "start":
                if (stage == GameStage.READY) {
                    startPlaying()
                } else {
                    startCollector()
                }
                break
            case "stop":
                stopCollector()
                break
        }
    }, [currentCommand])

    return (
        <div className={`flex flex-col gap-[16px] mx-auto max-w-[${gridSize * 1.66}%] max-h-[${gridSize * 1.66}%]`}>
            <div className="flex flex-col gap-[1px]">
                {grid.map((gridRow: Grid[]) => {
                    return <GridRowComponent gridRow={gridRow} key={`${gridRow[0].position.x}_row_number`} />
                })}
            </div>
            {stage != GameStage.IN_PROGRESS && (
                <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[364px] text-[#ffffff] text-2xl text-bold"
                    onClick={startPlaying}>Click here or say start to start game</button>
            )}
        </div>
    );
}