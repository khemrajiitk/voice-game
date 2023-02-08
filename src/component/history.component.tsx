import { useContext } from "react";
import { VCContext } from "../context/voice-controller.context";

export const HistoryComponent: React.FC<{}> = () => {
    const { currentCommand, lastCommand } = useContext(VCContext)
    return (
        <p className="text-sm font-bold underline">
            Current Command: {currentCommand}, Last Command: {lastCommand}
        </p>
    );
}