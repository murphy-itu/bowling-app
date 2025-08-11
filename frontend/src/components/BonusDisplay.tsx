import React, { useEffect, useState } from "react";

interface BonusDisplayProps {
  type: "strike" | "spare" | null;
  duration?: number;
}

const BonusDisplay: React.FC<BonusDisplayProps> = ({ type, duration = 2000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [type, duration]);

  if (!visible || !type) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 font-roboto">
      <div
        className={`text-5xl font-extrabold drop-shadow-lg animate-bounce
        ${type === "strike" ? "text-red-500" : "text-blue-500"}`}
      >
        {type === "strike" ? "🎯 STRIKE! 🎉" : "👏 SPARE! 🎯"}
      </div>
    </div>
  );
};

export default BonusDisplay;
