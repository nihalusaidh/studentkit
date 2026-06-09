import { Link } from "react-router-dom";

function ToolCard({ title, description, link }) {
  return (
    <Link
      to={link}
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-slate-100"
    >
      <h3 className="text-xl font-semibold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600 text-sm leading-6">{description}</p>
    </Link>
  );
}

export default ToolCard;