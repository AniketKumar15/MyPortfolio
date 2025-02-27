import { motion } from "framer-motion";
import { useState } from "react";

const TiltImg = ({ src, alt, isRounded = false }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 30; // Reduced intensity for smoother effect
    const y = ((e.clientY - top) / height - 0.5) * -30; // Negative to invert natural tilt

    setRotateX(y);
    setRotateY(x);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className="flex justify-center mt-10 md:mt-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 ${isRounded ? "rounded-full" : "rounded-lg"} border-4 border-blue-500 shadow-xl object-cover`}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      />
    </motion.div>
  );
};

export default TiltImg;
