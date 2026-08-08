const KycSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-5 2xl:p-8 shadow-sm border border-gray-100 animate-pulse">
      {/* Title */}
      <div className="h-3 w-20 bg-gray-200 rounded mx-auto" />

      <div className="flex flex-col items-center justify-center mt-5">
        {/* Icon circle */}
        <div className="w-16 h-16 rounded-full bg-gray-200" />

        {/* Status badge */}
        <div className="h-5 w-28 bg-gray-200 rounded-full mt-3" />

        {/* Description */}
        <div className="w-full mt-4 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5 mx-auto" />
          <div className="h-3 bg-gray-200 rounded w-3/5 mx-auto" />
        </div>

        {/* Button */}
        <div className="h-10 w-full bg-gray-200 rounded-lg mt-4" />
      </div>
    </div>
  );
};

export default KycSkeleton;