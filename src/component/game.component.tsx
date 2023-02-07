import { GameStateProvider } from "../context/game.context";
import { GameBoardComponent } from "./game-board.component";
import { HistoryComponent } from "./history.component";
import { TimerComponent } from "./timer.component";

export const GameComponentBase: React.FC<{}> = () => {
    return (
        <div>
            <div className="flex flex-row w-[100%] h-[48px] bg-[#0087ff] fixed">
                <p className="px-[16px] py-[8px] text-2xl text-[#ffffff]">Voice Game</p>
                <div className="flex flex-col right-[16px] absolute top-[4px]">
                    <TimerComponent />
                    <HistoryComponent />
                </div>
            </div>

            <div className="flex flex-col px-[16px] py-[16px] pt-[52px]">
                {/* <GameConfigComponent /> */}
                <GameBoardComponent />
                {/* <GameResultComponent /> */}
            </div>
        </div>
    );
}

export const GameComponent = () => {

    return <GameStateProvider>
        <GameComponentBase />
    </GameStateProvider>
}