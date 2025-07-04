import { motion, useScroll, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#43e97b",
          zIndex: 50,
        }}
      />

      {/* About Section */}
      <motion.div
        className="min-h-screen p-6 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="min-h-screen w-11/12 mx-auto m-5 rounded-2xl bg-white flex items-center justify-center p-6 relative overflow-hidden text-gray-800">
          <div className="max-w-3xl w-full card rounded-xl p-8 text-text-primary space-y-12 relative z-10">

            {/* Introduction */}
            <div className="h-100">
              <h1 className="text-5xl font-extrabold mt-15 mb-20 text-[#43e97b]">Welcome to our project! </h1>
              <p className="text-4xl font-semibold mb-10">
                Below is a brief overview of our project and its purpose
              </p>
            </div>

            {/* Who We Are */}
            <div className="h-screen flex flex-col items-center justify-center gap-4">
              <h2 className="text-4xl font-extrabold mb-20 capitalize text-[#43e97b]">Who We Are</h2>
              <p className="text-2xl font-semibold normal-case">
                We are a team of passionate developers and machine learning enthusiasts dedicated to addressing the challenges of fake images and videos through innovative technology.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                Our team is committed to creating a platform that empowers users to discern the authenticity of digital media, fostering a more informed and trustworthy online environment.
              </p>
            </div>

            {/* Our Mission */}
            <div className="h-screen flex flex-col items-center justify-center gap-4">
              <h2 className="text-4xl font-extrabold mb-20 capitalize text-[#43e97b]">Our Mission</h2>
              <p className="text-2xl font-semibold normal-case">
                Our mission is to combat the spread of misinformation by providing tools that help users identify manipulated media, thereby promoting trust and authenticity in digital content.
              </p>
            </div>

            {/* Our Approach */}
            <div className="h-screen flex flex-col items-center justify-center gap-4">
              <h2 className="text-4xl font-extrabold mb-20 capitalize text-[#43e97b]">Our Approach</h2>
              <p className="text-2xl font-semibold normal-case">
                Our platform is designed to be user-friendly, allowing anyone to easily upload and analyze media files for potential manipulation.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                We leverage advanced machine learning algorithms and computer vision techniques to analyze images and videos, detecting signs of manipulation and providing users with reliable assessments of authenticity.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                Using deep learning models, we can identify subtle alterations that may not be visible to the naked eye, ensuring a high level of accuracy in our assessments.
              </p>
            </div>

            {/* How It Works */}
            <div>
              <h2 className="text-4xl font-extrabold mb-20 capitalize text-[#43e97b]">How It Works</h2>
              <p className="text-2xl font-semibold normal-case">
                You can easily upload images or videos to our platform, and our system will analyze them for signs of manipulation. The results will indicate whether the media is likely real, fake.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                We use a combination of techniques, including deep learning models trained on large datasets, to detect alterations in images and videos. Our system is designed to be user-friendly, providing clear and actionable results.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                When you upload a media file, our system first preprocesses the file to know whether it is an image or a video. It then applies various algorithms to analyze the content, looking for signs of manipulation such as inconsistencies in pixel data, unusual patterns, or artifacts.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                The website is powered with three models, two for image (one for human and one for non-human) and one for video. Each model specializes in its category, ensuring accurate detection of manipulations.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                But you don't need to worry about the technical details. Our platform handles all the complexity behind the scenes, providing you with a simple and intuitive interface to get results quickly.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                The analysis process involves several steps, including feature extraction, model inference, and result interpretation. Our models are designed to handle a wide range of media types and manipulation techniques, ensuring robust performance across different scenarios.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                The models are trained on a diverse set of images (Different Types Of GAN: Generative Adversarial Network) and videos, allowing them to generalize well across different types of content. The results are presented in an easy-to-understand format, indicating the likelihood of the media being real or fake.
              </p>
            </div>

            {/* Get Involved */}
            <div className="h-screen flex flex-col items-center justify-center gap-4">
              <h2 className="text-4xl font-extrabold mb-20 capitalize text-[#43e97b]">Get Involved</h2>
              <p className="text-2xl font-semibold normal-case">
                Join us in our mission to create a more trustworthy digital world. Whether you're a developer, researcher, or simply interested in the topic, we welcome your contributions and support.
              </p>
              <p className="text-2xl font-semibold normal-case mt-10">
                Get in touch with us through our contact page or follow us on social media to stay updated on our progress and initiatives.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            key="scroll-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 flex items-center justify-center rounded-full shadow-lg text-white bg-[#43e97b] hover:scale-110 hover:shadow-2xl transition-all duration-300"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-7 h-7 font-bold" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;