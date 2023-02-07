import { useContext, useEffect } from "react";
import { GameContext } from "../context/game.context";
import { TimerContext } from "../context/timer.context";

export const GameResultComponent: React.FC<{}> = () => {
    const { score, updateScore, initGame } = useContext(GameContext)

    const { initTimer, stopTimer, startTime } = useContext(TimerContext)

    useEffect(() => {
        const currentTime = new Date().getTime()
        stopTimer(currentTime)
        const score = (currentTime - startTime) / 1000
        updateScore(score)
        initTimer()
    }, [])

    return (
        <>
            <h1 className="text-2xl font-bold underline">
                Your Time taken in game: {(score).toFixed(0)} Seconds
            </h1>
            <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                onClick={initGame}>Start Again</button>
        </>
    );
}