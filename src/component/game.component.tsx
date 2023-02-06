import { GameBoardComponent } from "./game-board.component";
import { GameConfigComponent } from "./game-config.component";
import { GameResultComponent } from "./game-result.component";

export const GameComponent: React.FC<{}> = () => {
    return (
        <div>
            <p className="w-[100%] h-[48px] px-[16px] py-[8px] text-2xl bg-[#0087ff] text-[#ffffff]">Voice Game</p>

            <div className="flex flex-col px-[16px] py-[16px]">
                <GameConfigComponent />
                <GameBoardComponent />
                <GameResultComponent />
            </div>
        </div>
    );
}