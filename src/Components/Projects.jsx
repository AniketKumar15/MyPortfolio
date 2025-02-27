import projects from "../Data/projectsData";
import Card from "./Card";

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen text-white p-10">
      <h2 className="text-4xl font-bold text-center text-blue-500 mb-8">My Projects</h2>

      {/* Game Dev Projects */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-300 mb-5">🎮 Game Development - <a href="https://bright-moon-bm.itch.io/" className="text-[16px] text-blue-500" target="blank">View all Projects</a></h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.gameDev.map((project) => (
            <Card key={project.id} {...project} />
          ))}
        </div>
      </div>

      {/* Web Dev Projects */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-300 mb-5">💻 Web Development</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.webDev.map((project) => (
            <Card key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
