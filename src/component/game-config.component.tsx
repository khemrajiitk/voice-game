import { useContext } from "react";
import { GameContext } from "../context/game.context";

export const GameConfigComponent: React.FC<{}> = () => {
    const { speed, grideSize, updateSpeed, updateGridSize, startGame } = useContext(GameContext)

    return (
        <div className="flex flex-col md:w-[50%] w-[90%] mx-auto">
            <h1 className="text-xl font-bold">
                Please set Configurations
            </h1>
            <div className="flex flex-row px-[16px] gap-[16px] mt-[16px]">
                <p className="text-xl">
                    Grid Size(slect from 16, 24, 32):
                </p>
                <input placeholder="Please enter Grid Size" value={grideSize} type={"number"} className="min-w-[160px]" max={12} min={4} step={4}
                    onChange={(e: any) => { updateGridSize(e.target.value) }} />
            </div>

            <div className="flex flex-row px-[16px] gap-[16px] mt-[16px]">
                <p className="text-xl">
                    Speed:
                </p>
                <input placeholder="Please enter speed" value={speed} type={"number"} className=""
                    onChange={(e: any) => { updateSpeed(e.target.value) }} />
            </div>

            <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                onClick={startGame}>Start Game</button>
        </div>
    );
}