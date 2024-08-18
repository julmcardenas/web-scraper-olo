import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";
import Navbar from "../components/NavBar";
export default function Results() {
  const { state } = useLocation();
  const { pros, cons, score, review, videos, title } = state;
  function CheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  function XIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }
  return (
    <>
      <div className="result-container w-screen min-h-screen bg-[#f7f3f0] flex flex-col items-center p-8">
        <main className="result-grid w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">


          <div className="col-span-1 row-span-1">
            <h1 className="text-3xl font-bold text-black">{title}</h1>

            <div className="videoframe-container">
              {videos[0] ? (
                <div
                  key={videos[0].url}
                  className="videoframe-main cursor-pointer"
                  style={{
                    backgroundImage: `url(${videos[0].thumbnail})`,
                  }}
                  onClick={() =>
                    window.open(videos[0].link, "_blank", "noopener,noreferrer")
                  }
                ></div>
              ) : (
                <div>No video available</div>
              )}
            </div>

            <div className="score-container border-3 border-dotted border-background-6 mt-4 p-4 h-full">
              <div className="score-text-box">
                <h1 className="text-4xl font-bold text-black">
                  This product scores...{" "}
                </h1>
                <div className="mt-4 justify-center">
                  <Badge
                    variant="success"
                    className="font-extrabold text-8xl p-8"
                  >
                    {score}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold text-text-75 mt-2">
                  Recommended
                </h1>
              </div>
            </div>
          </div>


          <div className="col-span-1 row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Our Verdict</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{review}</p>
              </CardContent>
            </Card>


            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Check out the videos:
                </CardTitle>
              </CardHeader>

              <CardContent>
                {videos.map((video, index) => (
                  <div
                    key={index}
                    style={{
                      aspectRatio: "500/300",
                      objectFit: "cover",
                      height: "300",
                      width: "500",
                      padding: "1em",
                      borderRadius: "1em",
                      border: "1px solid black",
                      cursor: "pointer",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${video?.thumbnail})`, // Optional: Set a background thumbnail
                    }}
                    onClick={() =>
                      window.open(video.link, "_blank", "noopener,noreferrer")
                    }
                  ></div>
                ))}
              </CardContent>
            </Card>
          </div>


          <div className="col-span-1 row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Pros</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4">
                  {pros.map((pro, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckIcon className="text-green-600" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">Cons</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4">
                  {cons.map((con, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <XIcon className="text-red-600" />
                      <span>{con}</span>
                    </div>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-1 row-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  What people are saying
                </CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
