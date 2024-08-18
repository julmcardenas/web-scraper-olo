import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import Search from "./pages/search";
import SearchHistory from "./pages/history";
import Landing from "./pages/landing";
import Trending from "./pages/trending";
import Results from "./pages/results";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Product from "./pages/product.tsx";
import Recent from "./pages/recent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/history",
    element: <SearchHistory />,
  },
  {
    path: "/trending",
    element: <Trending />,
  },
  {
    path: "/results",
    element: <Results />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/recent",
    element: <Recent />,
  },
]);

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      {/* <RouterProvider router={router} /> */}
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/search" element={<Search />} />
          <Route path="/history" element={<SearchHistory />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/results" element={<Results />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/recent" element={<Recent />} />
        </Routes>
      </Router>
    </ClerkProvider>
  </StrictMode>
);
//   {/* <App /> */}
// </StrictMode>,)
