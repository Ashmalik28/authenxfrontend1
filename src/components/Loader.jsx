const Loader = ({ height = 48, width = 48 }) => {
  return (
    <div className="flex justify-center items-center py-3">
      <div
        className="animate-spin rounded-full border-b-2 border-blue-700"
        style={{ height: `${height}px`, width: `${width}px` }}
      />
    </div>
  );
};

export default Loader;