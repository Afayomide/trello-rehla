import { Link } from "react-router-dom";
import "./home.css";
import Tasks from "./tasks";

export default function Home() {
  return (
    <div className="home-page">
      <nav className="home-nav">
      <Link className="h1" to="/">
          <h1>Trello Test</h1>
        </Link>
        <Link className="history" to="/history">
          <h2>History</h2>
        </Link>
      </nav>
      <Tasks />
    </div>
  );
}
