import aiText from "../assets/Ai.png";
import ProjectPlexus from "../assets/pp.png";
import portfolioEx from "../assets/portfolioEx.png";



const projects = {
  gameDev: [
    {
      id: 1,
      title: "Dont't Trust Me",
      description: "A deceptive puzzle game where every hint is a lie. Can you think in reverse and uncover the truth?",
      image: "https://img.itch.zone/aW1nLzE5OTk3OTIxLmpwZw==/315x250%23c/nNs%2FH1.jpg",
      link: "https://bright-moon-bm.itch.io/dont-trust-me",
    },
    {
      id: 2,
      title: "Stellar Vortex",
      description: "A top-down 2D space shooter built in Unity with C#.",
      image: "https://img.itch.zone/aW1nLzE5MTM3NzQ5LnBuZw==/315x250%23c/KHh%2B7O.png",
      link: "https://bright-moon-bm.itch.io/stellar-vortex",
    },
    {
      id: 3,
      title: "The Ball",
      description: "A maze game where you are control a ball in many mazes built in Unity with C#",
      image: "https://img.itch.zone/aW1nLzE0NzQwMjE1LnBuZw==/315x250%23c/IpmJv9.png",
      link: "https://bright-moon-bm.itch.io/the-ball",
    },
    {
      id: 4,
      title: "Move Invert",
      description: "A Endless Runner, Where you control a cube and must skillfully dodge obstacles. But there's a catch - left is right, and right is left!",
      image: "https://img.itch.zone/aW1nLzE5OTQyODg4LnBuZw==/315x250%23c/y61YAN.png",
      link: "https://bright-moon-bm.itch.io/move-invert",
    },
    {
      id: 5,
      title: "Knife Ult",
      description: "You Have to shoot enemies by throwing knife. Every kill gives you some amount of money and you can spend it to buy knife and health.",
      image: "https://img.itch.zone/aW1nLzEyMjIzMDMyLnBuZw==/315x250%23c/LOX0Tx.png",
      link: "https://bright-moon-bm.itch.io/knife-ult",
    },
  ],
  webDev: [
    {
      id: 1,
      title: "Project Plexus",
      description: "A personal portfolio website made with HTML, CSS, JS, That Contain So many Js projects.",
      image: ProjectPlexus,
      link: "https://aniketkumar15.github.io/ProjectPlexus/",
    },
    {
      id: 2,
      title: "AI text generator",
      description: "An ai text generator using React js, Tailwind and Gemini api.",
      image: aiText,
      link: "https://ai-text-generator-ten.vercel.app/",
    },
    {
      id: 3,
      title: "Portfolio Example",
      description: "A portfolio website which is made by using react js and tailwind css.",
      image: portfolioEx,
      link: "https://portfolio-example-livid.vercel.app/",
    },
  ],
  // Add more categories like softwareDev, AIProjects, etc.
};

export default projects;
