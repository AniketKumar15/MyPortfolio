import { motion } from "framer-motion";
import { useState } from "react";
import myPic from '../assets/myPic.png'
import './component.css'

const Hero = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    setRotateX(y * 50); // Adjust tilt intensity
    setRotateY(x * 50);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left px-6 pt-20 pb-20 md:px-20 text-white" id="home">
      {/* Left Side (Text Content) */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">Hi, I'm <span className="text-blue-500">Aniket</span></h1>
        <h1 className="text-4xl md:text-6xl font-bold"><span className="text-blue-500">Kumar</span> From India</h1>
        <p className="text-lg text-gray-300">
          Game Developer(Unity) | Front-End Developer
        </p>
        <div className="space-x-3">
          <button className="mt-4 px-6 py-3 bg-white hover:text-blue-400 rounded-lg text-black font-medium boxShadow89 hoverShadow">
            Download Resume
          </button>
          <a href="https://github.com/AniketKumar15" target="blank" className="mt-4 px-6 py-3 bg-white hover:text-blue-400 rounded-lg text-black font-medium boxShadow89 hoverShadow cursor-pointer">
            Github
          </a>
        </div>

      </div>

      {/* Right Side (Image with Tilt Effect) */}
      <motion.div
        className="md:w-1/2 flex justify-center mt-10 md:mt-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px" }}
      >
        <motion.img
          src={myPic}
          alt="Aniket Kumar"
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-blue-500 shadow-xl object-cover"
          animate={{ rotateX, rotateY }}
          transition={{ type: "spring", stiffness: 150, damping: 10 }}
        />
      </motion.div>

    </section>
  );
};

export default Hero;
