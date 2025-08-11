import React from "react";
import { RotateCcw } from "lucide-react";

type Props = {
    onRestart?: () => void;
}

const GameHeader: React.FC<Props> = ({ onRestart }) => {
    return (
        <div className="flex justify-between items-center w-full mb-4 rounded-t-lg px-6 py-2 bg-midnight-blue">
            <h2 className="text-2xl capitalize text-white">
                BOWLING<br />
                <span className="text-sm block">AFRICAIN</span>
            </h2>
            <button
                onClick={onRestart}
                className="font-semibold flex items-center gap-2 bg-sky-blue hover:bg-sky-blue-200 text-midnight-blue rounded px-4 py-2 transition-colors cursor-pointer"
            >
                <RotateCcw size={18} />
                Restart
            </button>
        </div>
    );
};

export default GameHeader;
