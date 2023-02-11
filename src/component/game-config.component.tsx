import { useContext } from "react";
import { GameContext } from "../context/game.context";
import { VCContext } from "../context/voice-controller.context";
import { VCStage } from "../enum/voice-controller-stage.enum";

export const GameConfigComponent: React.FC<{}> = () => {
    const { speed, gridSize, updateSpeed, updateGridSize, readyGame } = useContext(GameContext)

    const { stage } = useContext(VCContext)

    return (
        <div className="flex flex-col md:w-[50%] w-[90%] mx-auto">
            <h1 className="text-xl font-bold">
                Please set Configurations
            </h1>
            <div className="flex flex-row px-[16px] gap-[16px] mt-[16px]">
                <p className="text-xl">
                    Grid Size(slect from 16, 24, 32):
                </p>
                <input placeholder="Please enter Grid Size" value={gridSize} type={"number"} className="min-w-[160px]" max={94} min={2} step={1}
                    onChange={(e: any) => {
                        updateGridSize(e.target.value)
                    }} />
            </div>

            <div className="flex flex-row px-[16px] gap-[16px] mt-[16px]">
                <p className="text-xl">
                    Speed:
                </p>
                <input placeholder="Please enter speed" value={speed} type={"number"} className=""
                    onChange={(e: any) => { updateSpeed(e.target.value) }} />
            </div>

            {stage == VCStage.Loading && (
                <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                >Loading...</button>
            )}
            {stage == VCStage.Starting && (
                <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                >Starting Voice Controller...</button>
            )}
            {stage == VCStage.Ready && (
                <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold"
                    onClick={() => {
                        if (gridSize < 2) {
                            alert("Please Enter grid size between 2 to 250")
                        } else { readyGame(gridSize) }
                    }}>Go to Game</button>
            )}

        </div>
    );
}