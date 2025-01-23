const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='bg-foreground-custom relative h-[calc(100%-200px)] w-full'>
      {children}
    </div>
  );
};

export default Wrapper;
