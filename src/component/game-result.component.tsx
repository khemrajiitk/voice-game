import { useContext, useEffect } from "react";
import { CollectorContext } from "../context/collector.context";
import { GameContext } from "../context/game.context";
import { TimerContext } from "../context/timer.context";
import { VCContext } from "../context/voice-controller.context";

export const GameResultComponent: React.FC<{}> = () => {
    const { score, updateScore, initGame } = useContext(GameContext)
    const { initTimer, stopTimer, startTime } = useContext(TimerContext)
    const { initVC } = useContext(VCContext)
    const { stopCollector } = useContext(CollectorContext)

    useEffect(() => {
        const currentTime = new Date().getTime()
        stopTimer(currentTime)
        const score = (currentTime - startTime) / 1000
        updateScore(score)
        updateScore(score)
        initTimer()
        stopCollector()
    }, [])

    const restartGame = () => {
        initVC()
        initGame()
    }

    return (
        <>
            <h1 className="text-2xl font-bold underline">
                Your Time taken in game: {(score).toFixed(0)} Seconds
            </h1>
            <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                onClick={restartGame}>Start Again</button>
        </>
    );
}