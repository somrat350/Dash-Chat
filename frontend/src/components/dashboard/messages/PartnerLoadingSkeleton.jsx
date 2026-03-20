const PartnerLoadingSkeleton = () => {
  return [...new Array(6)].map((_, i) => (
    <div
      key={i}
      className="flex items-center gap-3 p-3 border-b border-base-content/20 bg-base-100"
    >
      <div className="skeleton bg-primary/40 w-12 h-12 rounded-full shrink-0"></div>

      <div className="flex-1 space-y-2">
        <div className="skeleton bg-primary/40 h-4 w-24"></div>
        <div className="skeleton bg-primary/40 h-3 w-full max-w-35"></div>{" "}
      </div>

      <div className="self-start mt-1">
        <div className="skeleton bg-primary/40 h-3 w-8"></div>
      </div>
    </div>
  ));
};

export default PartnerLoadingSkeleton;
