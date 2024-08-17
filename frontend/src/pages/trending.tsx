import Navbar from "../components/NavBar";

export default function Trending() {
    return (
        <div>
            <Navbar isLoggedIn={false} />
            <h1>Trending</h1>
        </div>
    );
}