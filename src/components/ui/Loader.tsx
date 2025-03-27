const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-[999999]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
