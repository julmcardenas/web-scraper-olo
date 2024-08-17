import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [url, setUrl] = useState("")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      setData(data)
      setLoading(false)
    } catch (err:any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-2xl w-full px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-4">Web Scraper</h1>
        <p className="text-muted-foreground mb-8">Enter a URL to scrape and view the page information.</p>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-center border rounded-md bg-background">
            <input
              type="url"
              placeholder="Enter a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 p-3 border-none focus:ring-0"
            />
            <button type="submit" className="px-4 py-3 rounded-r-md">
              Scrape
            </button>
          </div>
        </form>
        {loading && (
          <div className="flex items-center justify-center mb-8">
            <div className="w-6 h-6 text-primary" />
            <span className="ml-2 text-muted-foreground">Loading...</span>
          </div>
        )}
        {error && <div className="bg-red-500 text-red-50 p-4 rounded-md mb-8">{error}</div>}
        {data && (
          <div className="bg-card p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
            <p className="text-muted-foreground mb-4">{data.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Headings</h3>
                <ul className="list-disc pl-4 space-y-2">
                  {data.headings.map((heading, i) => (
                    <li key={i}>{heading}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Links</h3>
                <ul className="list-disc pl-4 space-y-2">
                  {data.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-primary hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
