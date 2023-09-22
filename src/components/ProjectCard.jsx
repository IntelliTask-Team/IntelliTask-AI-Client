import { Link } from "react-router-dom";

function ProjectCard({ title, description, _id, tasks, ai }) {
  return (
    <div className="border-2 mb-5 mt-5">
      <Link to={`/projects/${_id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{description} </p>
    </div>
  );
}

export default ProjectCard;
