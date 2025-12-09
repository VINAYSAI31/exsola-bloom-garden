import celebleft from "@/assets/celebleft.png";
import celebriight from "@/assets/celebriight.png";

type LaunchCelebrationProps = {
  show: boolean;
};

const confettiPieces = [
  { side: "left", offsetX: 0, color: "bg-yellow-400", delay: 0 },
  { side: "left", offsetX: 12, color: "bg-pink-400", delay: 80 },
  { side: "left", offsetX: -10, color: "bg-blue-400", delay: 140 },
  { side: "left", offsetX: 22, color: "bg-emerald-400", delay: 220 },
  { side: "left", offsetX: -18, color: "bg-orange-400", delay: 260 },
  { side: "left", offsetX: 30, color: "bg-purple-400", delay: 320 },
  { side: "right", offsetX: 0, color: "bg-orange-400", delay: 0 },
  { side: "right", offsetX: -12, color: "bg-lime-400", delay: 80 },
  { side: "right", offsetX: 16, color: "bg-blue-400", delay: 140 },
  { side: "right", offsetX: -22, color: "bg-pink-400", delay: 220 },
  { side: "right", offsetX: 18, color: "bg-amber-400", delay: 260 },
  { side: "right", offsetX: -30, color: "bg-emerald-400", delay: 320 },
];

const LaunchCelebration = ({ show }: LaunchCelebrationProps) => {
  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes confetti-left {
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(140px,-360px) rotate(720deg); opacity: 0; }
        }
        @keyframes confetti-right {
          0% { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(-140px,-360px) rotate(-720deg); opacity: 0; }
        }
      `}</style>

      {/* left party popper */}
      <div className="absolute bottom-2 left-4 w-24 h-36 rotate-[-18deg]">
        <img 
          src={celebleft} 
          alt="Party popper left" 
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* right party popper */}
      <div className="absolute bottom-2 right-4 w-24 h-36 rotate-[18deg]">
        <img 
          src={celebriight} 
          alt="Party popper right" 
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {confettiPieces.map((piece, idx) => (
        <span
          key={idx}
          className={`absolute w-2.5 h-5 rounded-sm ${piece.color} shadow-md`}
          style={{
            bottom: "46px",
            [piece.side]: piece.side === "left" ? "30px" : "30px",
            transform: `translate(${piece.offsetX}px, 0)`,
            animation: `${piece.side === "left" ? "confetti-left" : "confetti-right"} 1.3s ease-out ${piece.delay}ms infinite`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 animate-pulse" />
    </div>
  );
};

export default LaunchCelebration;

