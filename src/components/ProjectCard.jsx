import { Link } from "react-router-dom";

function ProjectCard({ title, description, _id, tasks, ai }) {
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${_id}`}>
        <h2>{title}</h2>
      </Link>
      <p>{description} </p>
    </div>
  );
}

export default ProjectCard;
