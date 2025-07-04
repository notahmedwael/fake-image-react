import { FadeContent, Bounce } from '@appletosolutions/reactbits';
import RotatingText from '../src/blocks/TextAnimations/RotatingText/RotatingText';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/white-logo.png';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/upload');
  };

  return (
    <motion.div
      className="min-h-screen p-6 text-center relative overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="flex flex-col items-center text-center gap-10 max-w-xl px-4">
          <FadeContent duration={1200}>
            <div className="text-3xl sm:text-4xl font-bold leading-snug">
              ever came across an image that made you doubt if it's
              <RotatingText
                texts={['Real ✅', 'Fake ❌', 'Uncertain 🤔']}
                mainClassName="mt-4 px-3 text-3xl text-white overflow-hidden py-1 justify-center rounded-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </div>
          </FadeContent>

          <button
            type="button"
            onClick={handleButtonClick}
            className="overflow-hidden relative w-30 p-2 h-12 bg-[#43e97b] text-white border-none rounded-md text-lg font-bold cursor-pointer z-10 group"
          >
            TEST IT!
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right" />
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right" />
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right" />
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
              Explore!
            </span>
          </button>
        </div>

        {/* Right Section (Logo) */}
        <Bounce>
          <img
            src={logo}
            alt="Fake Image Logo"
            className="h-48 w-48 sm:h-64 sm:w-64 md:h-[28rem] md:w-[28rem] object-contain"
          />
        </Bounce>
      </div>
    </motion.div>
  );
};

export default Home;