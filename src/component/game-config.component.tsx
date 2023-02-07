export const GameConfigComponent: React.FC<{}> = () => {
    return (
        <div className="flex flex-col md:w-[50%] w-[90%] mx-auto">
            <h1 className="text-xl font-bold">
                Please set Configurations
            </h1>
            <div className="flex flex-row px-[16px] gap-[16px] mt-[16px]">
                <p className="text-xl">
                    Grid Size:
                </p>
                <input placeholder="Please enter speed" type={"number"} className="min-w-[160px]" max={12} min={4} step={4} />
            </div>

            <div className="flex flex-row px-[16px] gap-[16px] mt-[16px]">
                <p className="text-xl">
                    Speed:
                </p>
                <input placeholder="Please enter speed" type={"number"} className="" />
            </div>

            <button className="mt-[24px] p-[8px] bg-[#0087ff] rounded-md w-[248px] text-[#ffffff] text-2xl text-bold">Start Game</button>
        </div>
    );
}