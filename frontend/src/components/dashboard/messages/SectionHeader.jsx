const SectionHeader = ({ title, icon, onNext, onPrev }) => (
  <div className="flex items-center justify-between gap-3 px-1">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="font-bold text-base md:text-lg">{title}</h3>
    </div>
    <div className="flex gap-2">
      <button onClick={onPrev} className="btn btn-xs btn-circle btn-ghost bg-base-200">❮</button>
      <button onClick={onNext} className="btn btn-xs btn-circle btn-ghost bg-base-200">❯</button>
    </div>
  </div>
);

export default SectionHeader;