import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaItchIo } from "react-icons/fa6";
import logo from '../assets/logo.png'

const Contact = () => {

  return (
    <footer className="bg-gray-900 text-white py-6 text-center" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-blue-400">Aniket Kumar</h2>
        <p className="text-gray-400 mt-2">Game & Web Developer | Passionate about creating unique experiences.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/AniketKumar15" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <FaGithub size={20} /> GitHub
          </a>
          <a href="https://twitter.com/anikumar_dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <FaXTwitter size={20} /> x.com
          </a>
          {/* <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <FaLinkedin size={20} /> LinkedIn
          </a> */}
          <a href="mailto:aniket87091@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <FaEnvelope size={20} /> Email
          </a>
          <a href="https://bright-moon-bm.itch.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
            <FaItchIo size={20} /> Itch.io
          </a>
        </div>
        <p className="text-gray-500 mt-6">&copy; {new Date().getFullYear()} Aniket Kumar. All rights reserved.</p>
      </div>
    </footer >
  );
};

export default Contact;
