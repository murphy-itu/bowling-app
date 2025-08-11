import { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";
import BonusDisplay from "./components/BonusDisplay";
import FrameTable from "./components/FrameTable";
import GameControls from "./components/GameControls";
import GameHeader from "./components/Header";
import type { Game } from "./interfaces/game";

function App() {

  const [game, setGame] = useState<Game | null>(null);
  const [maxScoreActuel, setMaxScoreActuel] = useState<number>(15);
  let copyactualFrame: number = game?.indiceActualFrame;
  const [bonusType, setBonusType] = useState<"strike" | "spare" | null>(null);

  useEffect(() => {

    restartGame();

  }, []);

  const onSubmitScore = async (score: number) => {
    let differenceScore: number = maxScoreActuel - score;

    if (score === maxScoreActuel) {
      if (game?.indiceActualFrame! <= 4) {
        (maxScoreActuel === 15)
          ? triggerBonus("strike")
          : triggerBonus("spare");
      } else {
        setBonusType(null);
      }
    }


    const response = await axiosInstance.post<Game>('/addPoint', { point: (differenceScore == 0) ? 15 : score });
    const data: Game = response.data;


    if (differenceScore == 0 || data.indiceActualFrame != copyactualFrame) {
      setMaxScoreActuel(15);
    } else {
      setMaxScoreActuel(differenceScore);
    }

    copyactualFrame = data.indiceActualFrame;
    setGame(data);
  }

  const triggerBonus = (type: "strike" | "spare") => {
    setBonusType(null);
    setTimeout(() => setBonusType(type), 10);
  };


  const restartGame = async () => {
    const response = await axiosInstance.post<Game>(`/restart`);
    const data: Game = response.data;
    console.log("res", data);
    setGame(data);
    setMaxScoreActuel(15);
    setBonusType(null);
  };

  return (
    <>
      <div className="min-h-[570px] flex flex-col justify-start items-start mx-16 my-4 rounded-lg font-roboto bg-blue-gray shadow-lg">
        <GameHeader onRestart={restartGame} />
        {game ? (
          <>
            <FrameTable game={game} />
            <GameControls
              game={game}
              onSubmitScore={onSubmitScore}
              maxScore={maxScoreActuel}
            />
          </>
        ) : (
          <div className="flex justify-center items-center p-8 mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
          </div>
        )}

      </div>
      <BonusDisplay type={bonusType} duration={2000} />
    </>
  );


}

export default App
