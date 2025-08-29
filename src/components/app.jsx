// src/App.jsx
import Aurora from "./components/Aurora";
import "./App.css"; // yahan container styles honge

export default function App() {
  return (
    <div className="landing">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.8}
      />
      <div className="content">
        <img src="/assets/images/Avengers-Logo.png" alt="Marvel" className="logo" />
        <h1>MARVEL FAN PORTAL</h1>
        <p>Choose your hero. Join the multiverse.</p>
      </div>
    </div>
  );
}
