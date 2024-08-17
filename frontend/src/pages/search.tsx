import Navbar from "../components/NavBar";

export default function Search() { 
    return (
        <div>
            <Navbar isLoggedIn={false} />
            <h1>Search</h1>
        </div>
    );
}