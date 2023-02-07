import { useContext } from "react";
import { GameContext, GameStateProvider } from "../context/game.context";
import { TimerStateProvider } from "../context/timer.context";
import { GameStage } from "../enum/game-stage.enum";
import { GameBoardComponent } from "./game-board.component";
import { GameConfigComponent } from "./game-config.component";
import { GameResultComponent } from "./game-result.component";
import { HistoryComponent } from "./history.component";
import { TimerComponent } from "./timer.component";

export const GameComponentBase: React.FC = () => {
    const { stage } = useContext(GameContext)
    return (
        <div>
            <div className="flex flex-row w-[100%] h-[48px] bg-[#0087ff] fixed">
                <p className="px-[16px] py-[8px] text-2xl text-[#ffffff]">Voice Game</p>
                {stage == GameStage.IN_PROGRESS && (
                    <div className="flex flex-col right-[16px] absolute top-[4px]">
                        <TimerComponent />
                        <HistoryComponent />
                    </div>
                )}
            </div>

            <div className="flex flex-col px-[16px] py-[16px] pt-[52px]">
                {stage == GameStage.YET_TO_START && (
                    <GameConfigComponent />
                )}
                {stage == GameStage.IN_PROGRESS && (
                    <GameBoardComponent />
                )}
                {stage == GameStage.COMPLETED && (
                    <GameResultComponent />
                )}
            </div>
        </div>
    );
}

export const GameComponent = () => {

    return <GameStateProvider>
        <TimerStateProvider>
            <GameComponentBase />
        </TimerStateProvider>
    </GameStateProvider>
}