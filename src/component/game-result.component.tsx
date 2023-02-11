import { useContext, useEffect, useState } from "react";
import { CollectorContext } from "../context/collector.context";
import { GameContext } from "../context/game.context";
import { TimerContext } from "../context/timer.context";
import { VCContext } from "../context/voice-controller.context";
import { GAME_SCORE } from "../enum/common.enum";
import { Score } from "../model/score.model";
import { getCacheList } from "../util/cache-helper";

export const GameResultComponent: React.FC<{}> = () => {
    const { score, updateScore, initGame } = useContext(GameContext)
    const { initTimer, stopTimer, startTime } = useContext(TimerContext)
    const { initVC } = useContext(VCContext)
    const { initCollector } = useContext(CollectorContext)

    const [scoreList, setScoreList] = useState([])

    useEffect(() => {
        const currentTime = new Date().getTime()
        stopTimer(currentTime)
        const score = (currentTime - startTime) / 1000
        updateScore(score)
        initTimer()
        initCollector()
    }, [])

    const restartGame = () => {
        initVC()
        initGame()
    }

    useEffect(() => {
        const _scoreList: any = getCacheList(GAME_SCORE)
        setScoreList(_scoreList)
    }, [])

    return (
        <>
            <h1 className="text-2xl font-bold underline">
                Your Time taken in game: {(score).toFixed(0)} Seconds
            </h1>
            {scoreList.length > 0 && (<div className="flex flex-col">
                <h5>You score List</h5>
                {scoreList.map((score: Score) => {
                    return <p>Score: {score.score.toFixed(0)} Seconds, Time: {new Date(score.time).toDateString()}</p>
                })}
            </div>)}
            <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                onClick={restartGame}>Start Again</button>
        </>
    );
}