const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center justify-between gap-3 px-1 mb-4">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="font-bold text-base md:text-lg">{title}</h3>
    </div>
  </div>
);

export default SectionHeader;
