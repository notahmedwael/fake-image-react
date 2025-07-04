const Navbar = () => {

  return (
    <nav className="p-4 fade-in">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <a title='HomePage' href="/" className="flex items-center space-x-2 text-4xl font-extrabold text-text-primary ml-20">
          <span
            className="font-rubik text-4xl text-[#43e97b] tracking-widest"
          >
            F A K E I M A G E
          </span>
        </a>
        <div className="flex items-center space-x-4 m-5">
          <a href="/" className="text-lg font-bold hover:text-[#43e97b] px-3 py-2">Home</a>
          <a href="/upload" className="text-lg font-bold hover:text-[#43e97b] px-3 py-2">Upload</a>
          <a href="/about" className="text-lg font-bold hover:text-[#43e97b] px-3 py-2">About</a>
          <a href="/contact-us" className="text-lg font-bold hover:text-[#43e97b] px-3 py-2">Contact Us</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;