import { useContext, useEffect, useRef, useState } from "react";
import { TimerContext } from "../context/timer.context";
import { TimerStage } from "../enum/timer-stage.enum";

export const TimerComponent: React.FC<{}> = () => {
    const { stage, startTime } = useContext(TimerContext)
    const [currentTime, setCurrentTime] = useState(0)

    const intervalId = useRef<any>(null)

    const startTimer = () => {
        intervalId.current = setInterval(() => {
            if (stage == TimerStage.Started) {
                const currentTime = new Date().getTime()
                const _currentTime = (currentTime - startTime) / 1000
                setCurrentTime(_currentTime)
            }
        }, 500)
    }

    useEffect(() => {
        if (stage == TimerStage.Started) {
            startTimer()
        } else if (intervalId.current) {
            clearInterval(intervalId.current)
        }
    }, [stage])

    return (
        <p className="text-sm font-bold underline">
            {currentTime.toFixed(0)}
        </p>
    );
}