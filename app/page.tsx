"use client";
import Image from "next/image";
import { useState } from "react";
import type { YouTubeSearchListResponse } from "./types/search-result";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<YouTubeSearchListResponse | null>(null);

  const handleSearch = async () => {
    console.log("searchTerm value:", searchTerm, typeof searchTerm);
    //   setLoading(true);
    //   setError(null);
    //   setResult(null);
    //   try {
    //     const results: YouTubeSearchListResponse[] = await searchYouTube(searchTerm, 25, "video");
    //     setResult(results);
    //     const uniqueStatuses = Array.from(
    //       new Set(results.map((r) => r.status).filter((s): s is string => !!s))
    //     );
    //     setAvailableStatuses(uniqueStatuses);
    //     setCurrentPage(1);
    //     setError(
    //       results.length === 0 ? "No valid license found or parse error" : null
    //     );
    //   } catch (err: unknown) {
    //     let message = "Verification function not found for this state.";
    //     if (err instanceof Error) {
    //       message = err.message;
    //     }
    //     setError(message);
    //   } finally {
    //     setLoading(false);
    //     console.log("Search completed", {
    //       firstName,
    //       lastName,
    //       licenseNumber,
    //       selectedState,
    //       result,
    //     });
      }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tighter sm:text-6xl">
            To get started, <br /> enter your subject into the search bar below.
          </h1>
          <input
            style={{
              border: "2px solid white",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              width: "300px",
            }}
            placeholder="Type subject here..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* search term must be seperated by + if there are multiple words */}
          <button
            onClick={(e) => {
              e.preventDefault();

              window.open(
                `https://www.youtube.com/results?search_query=${searchTerm
                  .split(" ")
                  .join("+")}+eli5`,
                "_blank"
              );
            }}
          >
            Search
          </button>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <h1>Results</h1>
          <div>{/*---->results go here <---- */}</div>
        </div>
      </main>
    </div>
  );
}
