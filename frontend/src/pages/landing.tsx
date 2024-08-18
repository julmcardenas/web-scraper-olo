import Navbar from "../components/NavBar";
import "../app.css"; // Import the CSS file
import mockupImage from '../assets/Mockup.png'; // Adjust the path as needed

export default function Trending() {
  return (
    <>
      <div className="landing-container bg-background-1">
        <div className="nav-placeholder h-[80px] bg-background-5 w-full"></div>

        <div className="landing-content">
          <div className="search-section">
            <div className="search-bar-container mt-20 mr-0">
              <button className="search-bar-button text-text-1">SEARCH</button>
              <div className="search-bar-field">
                <input
                  type="text"
                  placeholder="'Ex. 2020 Macbook Air'"
                  className="search-input"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="search-caption mt-4 text-white text-md">
                Everything you need to know about your product in seconds.
              </p>
            </div>
          </div>

          <div className="hero-section mt-10">
            <h1 className="text-text-1 font-extrabold text-4xl">
                Real People. Real Reviews.
            </h1>
          </div>
          
          <div className="mockup-section w-full h-full mt-4">
            <img className="mockup" src={mockupImage} alt="Mockup" />
          </div>
        </div>
      </div>
    </>
  );
}
