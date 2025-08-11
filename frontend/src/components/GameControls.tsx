import React, { useState } from "react";
import type { Game } from "../interfaces/game";

type Props = {
    game: Game;
    onSubmitScore?: (score: number) => void;
    maxScore?: number;
};

const GameControls: React.FC<Props> = ({ game, onSubmitScore, maxScore = 15 }) => {
    const [score, setScore] = useState<number>(0);

    const handleSubmit = () => {
        if (onSubmitScore) {
            onSubmitScore(score);
        }
        setScore(0);
    };

    const handleScoreSelect = (value: number) => {
        setScore(value);
    };

    // Générer les options de 0 à maxScore (limité à 15 maximum)
    const maxAllowedScore = Math.min(maxScore, 15);
    const scoreOptions = Array.from({ length: maxAllowedScore + 1 }, (_, i) => i);

    return (
        <div className="w-[90%] mx-auto mt-4 rounded-lg shadow-lg bg-white shadow-lg">
            <div className="grid grid-cols-3 h-full">
                {/* Section gauche - Formulaire */}
                <div className="col-span-2 border-r border-gray-200 p-6 flex flex-col justify-center">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-base mb-3 font-bold">
                                Nombre de quilles touchées
                            </label>

                            {/* Boutons de sélection */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {scoreOptions.map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => handleScoreSelect(value)}
                                        disabled={game.isFinished}
                                        className={`
                                            w-10 h-10 rounded-lg border font-semibold text-sm transition-all
                                            ${score === value
                                                ? 'bg-blue-100 border-sky-blue text-midnight-blue shadow-md'
                                                : 'bg-white border-gray-400 text-gray-700 hover:border-sky-blue hover:bg-blue-50'
                                            }
                                            ${game.isFinished ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                        `}
                                    >
                                        {value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={game.isFinished}
                            className="w-full font-semibold gap-2 bg-sky-blue hover:bg-sky-blue-200 text-midnight-blue rounded px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Valider
                        </button>
                    </div>
                </div>

                {/* Section droite - Informations */}
                <div className="col-span-1 p-6 flex flex-col justify-center space-y-4">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            État actuel
                        </h3>

                        <div className="space-y-3">
                            {!game.isFinished ? (
                                <>
                                    <div className="bg-light-green p-3 rounded-lg border border-green">
                                        <div className="text-sm text-midnight-blue">Frame actuel</div>
                                        <div className="text-2xl font-bold text-green">
                                            {game.indiceActualFrame + 1}
                                        </div>
                                    </div>

                                    <div className="bg-light-green p-3 rounded-lg border border-green">
                                        <div className="text-sm text-midnight-blue">Lancée actuelle</div>
                                        <div className="text-2xl font-bold text-green">
                                            {game.indiceActualLancer + 1}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-700 shadow-lg">
                                    <div className="text-sm text-yellow-700 font-medium">
                                        🎉 Partie terminée !
                                    </div>
                                    <div className="text-midnight-blue">
                                        <p className="text-base">votre score final est <span className="text-xl font-bold">{game.scoreFinal || 0}</span></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameControls;