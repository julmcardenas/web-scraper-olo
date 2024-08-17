import React from "react";

import Input from "./ui/Input";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Card from "./ui/Card";

export default function Result() {
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
    <div className="min-h-screen bg-[#f7f3f0] flex flex-col items-center p-4">
      {/* <header className="w-full max-w-5xl flex items-center justify-between p-4 bg-[#d1a3ff] text-white">
        <div className="flex items-center space-x-2">
          <LogInIcon className="w-8 h-8" />
          <span className="text-xl font-bold">reviewpal</span>
        </div>
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search a product, or enter a YouTube URL."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d1a3ff]"
          />
        </div>
        <Button variant="ghost" className="text-white">
          {/* <MenuIcon className="w-6 h-6" /> */}
      {/* </Button> */}
      {/* </header>/*/}
      <main className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 row-span-1">
          <div className="text-center">
            <h1 className="text-3xl font-bold">2020 Macbook Air Review</h1>
            <div className="mt-2 flex justify-center items-center space-x-2">
              <p variant="secondary" className="text-lg">
                88
              </p>
              <span className="text-lg font-semibold text-green-600">Great</span>
            </div>
            <div className="mt-4">
              <img
                src="/placeholder.svg"
                alt="Macbook Air"
                className="border border-black"
                width="500"
                height="300"
                style={{ aspectRatio: "500/300", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-black">
            {/* <CardHeader>
              <CardTitle className="text-lg font-bold">Our Verdict</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our research shows people overall enjoy the new M1 chip for everyday use; this MacBook still holds up in
                2024. Its impressive performance, long battery life, and efficient multitasking capabilities have made
                it a popular choice among users. The M1 chip's continuing...
              </p>
            </CardContent> */}
          </Card>
          <Card className="border border-black">
            {/* <CardHeader>
              <CardTitle className="text-lg font-bold">Check out the videos:</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="/placeholder.svg"
                alt="Video thumbnail"
                className="border border-black"
                width="250"
                height="150"
                style={{ aspectRatio: "250/150", objectFit: "cover" }}
              />
            </CardContent> */}
          </Card>
        </div>
        <div className="col-span-1 row-span-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border border-black bg-[#e0d4ff] h-full">
            {/* <CardHeader>
              <CardTitle className="text-lg font-bold">Pros</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4">
                <li>Long Battery Life</li>
                <li>Sleek Design</li>
                <li>FaceTime</li>
                <li>No Crashes</li>
                <li>Secure</li>
              </ul>
            </CardContent> */}
          </Card>
          <Card className="border border-black h-full">
            {/* <CardHeader>
              <CardTitle className="text-lg font-bold">Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4">
                <li>Long Battery Life</li>
                <li>Sleek Design</li>
                <li>FaceTime</li>
                <li>No Crashes</li>
                <li>Secure</li>
              </ul>
            </CardContent> */}
          </Card>
        </div>
        <div className="col-span-1 row-span-3">
          <Card className="border border-black bg-[#e0d4ff] h-full">
            {/* <CardHeader>
              <CardTitle className="text-lg font-bold">What people are saying</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our research shows people overall like enjoy the new m1 chip for everyday use, this MacBook still holds
                up in 2024 as a solid choice for programmers, the etc... (summary from the comments)...
              </p>
              <p className="mt-2">
                Common points:
                <ul className="list-disc pl-4">
                  <li>Short battery life</li>
                  <li>Good aesthetic</li>
                  <li>Sleek Design</li>
                  <li>Battery Problems</li>
                  <li>High Price point</li>
                </ul>
              </p>
            </CardContent> */}
          </Card>
        </div>
      </main>
    </div>
  );
}

function LogInIcon(props) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
