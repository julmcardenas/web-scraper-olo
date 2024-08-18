import Navbar from "../components/NavBar";
import '../app.css';  // Import the CSS file

export default function Trending() {
    return (
        <div className="landing-container">
            <div className="landing-content">
                <div className="search-bar-container">
                <button className="search-bar-button">Search</button>
                    <div className="search-bar-field">
                        <input type="text" placeholder="'Ex. 2020 Macbook Air'" className="search-input" />
                    </div>
                </div>
                {'Hello, World!'}
            </div>
        </div>
    );
}
