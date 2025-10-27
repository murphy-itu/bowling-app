import React from "react";
import type { Game } from "../interfaces/game";

type Props = {
    game: Game;
};

const FrameTable: React.FC<Props> = ({ game }) => {
    return (
        <table className="w-[90%] border border-gray-400 text-center mx-auto mt-6 rounded-lg text-midnight-blue shadow-lg">
            <thead>
                <tr className="bg-gray-300">
                    <th className="border border-gray-400 px-2 py-1">Frame</th>
                    {game.frames?.map((_, index) => (
                        <th key={index} className={`border border-gray-400 px-2 py-1 ${(!game.isFinished && index == game.indiceActualFrame) ? "bg-light-green" : ""}`}>
                            {(index != 5) ? index + 1 : "Bonus"}
                        </th>
                    ))}
                    <th className="border border-gray-400 px-2 py-1">Total</th>
                </tr>
            </thead>
            <tbody>
                {/* Première ligne - Lancer */}
                <tr className="bg-white">
                    <th className="border border-gray-400 px-2 py-4">Lancer</th>
                    {game.frames?.map((frame, index) => (
                        <th key={index} className={`border border-gray-400 px-2 py-1 ${(!game.isFinished && index == game.indiceActualFrame) ? "bg-light-green" : ""}`}>
                            <div className="grid grid-cols-3 gap-1">
                                {frame.lancers?.map((lancer, idx) => {
                                    return (
                                        <span key={idx} className={`border border-gray-400 rounded px-2 py-2 ${(!game.isFinished && index == game.indiceActualFrame && idx == game.indiceActualLancer) ? "bg-green border-green" : ""}`}>
                                            {index < 5 && lancer.isStrike
                                                ? "X"
                                                : index < 5 && lancer.isSpare
                                                    ? "/"
                                                    : lancer.point ?? "\u00A0"}
                                        </span>
                                    )
                                })}
                            </div>
                        </th>
                    ))}
                    <th rowSpan={2} className="border border-gray-400 px-2 py-8 text-xl">
                        {game.scoreFinal}
                    </th>
                </tr>

                <tr className="bg-white">
                    <th className="border border-gray-400 px-2 py-4">Score par Frame</th>
                    {game.frames?.map((frame, index) => (
                        <th key={index} className={`border border-gray-400 px-2 py-1 ${(!game.isFinished && index == game.indiceActualFrame) ? "bg-light-green" : ""}`}>
                            {(frame.totalAAfficher != 0 && index < 5) ? frame.totalAAfficher : "\u00A0"}
                        </th>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

export default FrameTable;