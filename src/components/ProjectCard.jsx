import { Link } from "react-router-dom";

function ProjectCard({ title, description, _id, tasks, ai }) {
  return (
    <Link to={`/projects/${_id}`}>
      <div className="bg-white p-5 my-5 rounded-xl mx-auto shadow flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-xl font-medium pb-2">{title}</h2>
          <p className="pr-3">{description} </p>
        </div>
        <div className="inline-block max-h-8 text-sm px-4 py-2 leading-none font-medium border rounded bg-vert text-white hover:bg-emerald-700 mt-4 lg:mt-0">
          View
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
