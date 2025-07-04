const Footer = () => {
  return (
    <footer className="h-40 flex flex-col justify-center items-center bg-white/30 backdrop-blur-none text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg font-semibold">
          © {new Date().getFullYear()} Fake Image Graduation Project. All rights reserved.
        </p>
        <p className="mt-4 text-lg font-semibold">
          Made with ❤️ by the Fake Image Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;