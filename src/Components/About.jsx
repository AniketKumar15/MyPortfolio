import { useState } from "react";
import aboutProfilePic from "../assets/ProfilePhoto.jpeg"
import { FaGithub, FaLinkedin, FaXTwitter, FaItchIo } from "react-icons/fa6";
import './component.css';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center text-white px-6 pb-20 flex-wrap"
    >
      {/* Left Side - Image */}
      <div
        className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden rounded-lg shadow-lg border-4 border-blue-600 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={aboutProfilePic}
          alt="Aniket Kumar"
          className={`w-full h-full object-cover transition-all duration-500 ${!isHovered ? "grayscale" : ""
            }`}
        />
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${!isHovered ? "opacity-40" : "opacity-0"
            }`}
        ></div>
      </div>

      {/* Right Side - Text Content */}
      <div className="md:ml-14 mt-8 md:mt-0 max-w-lg text-center md:text-left">
        <h2 className="text-4xl font-bold text-blue-500">About Me</h2>
        <p className="mt-4 text-gray-300 text-lg leading-relaxed">
          Hey, I'm Aniket Kumar, a **Front-End Developer & Game Developer** who loves building immersive experiences.
          I specialize in **React.js & Tailwind CSS** for modern web design and use **Unity & C#** to bring interactive
          game ideas to life. Passionate about technology and always eager to learn something new!
        </p>
        {/* Social Media Icons */}
        <div className="mt-4 flex justify-center md:justify-start space-x-4 mb-6">
          <a
            href="https://github.com/Aniketkumar15"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
          >
            <FaGithub />
          </a>
          {/* <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
          >
            <FaLinkedin />
          </a> */}
          <a
            href="https://bright-moon-bm.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
          >
            <FaItchIo />
          </a>

          <a
            href="https://twitter.com/anikumar_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300 text-2xl"
          >
            <FaXTwitter />
          </a>
        </div>
        <a href="#projects" className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-all duration-300 boxShadow89">
          View My Work
        </a>
      </div>

    </section>
  );
};

export default About;
