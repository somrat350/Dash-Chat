import { useRef } from "react";
import { gsap } from "gsap";

const StatCard = ({ title, value, icon }) => {
  const cardRef = useRef(null);
  const onEnter = () => gsap.to(cardRef.current, { y: -5, duration: 0.3 });
  const onLeave = () => gsap.to(cardRef.current, { y: 0, duration: 0.3 });

  return (
    <div 
      ref={cardRef} 
      onMouseEnter={onEnter} 
      onMouseLeave={onLeave} 
      className="bg-base-200 rounded-2xl p-3 md:p-4 flex items-center gap-3 border border-base-300 shadow-sm"
    >
      <div className="p-2 md:p-3 bg-primary/10 text-primary rounded-xl shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <h2 className="text-lg md:text-xl font-bold truncate">{value}</h2>
        <p className="text-[9px] md:text-[10px] font-bold uppercase opacity-50 truncate">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;