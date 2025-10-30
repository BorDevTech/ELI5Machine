"use client";
import { useState } from "react";
import type { YouTubeSearchListResponse } from "./types/search-result";
import {
  Stack,
  Card,
  Input,
  Image,
  HStack,
  Badge,
  Button,
  Box,
} from "@chakra-ui/react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<YouTubeSearchListResponse | null>(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const result = await fetch(
        `./api/search?q=${encodeURIComponent(searchTerm as string)} - eli5 easy`
      );
      if (!result.ok) throw new Error(`HTTP error ${result.status}`);
      const data = await result.json();
      setResult(data);
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
    } catch (err: unknown) {
      let message = "Verification function not found for this state.";
      if (err instanceof Error) {
        message = err.message;
      }
      setError((err as Error).message);
    } finally {
      setLoading(false);
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
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tighter sm:text-6xl">
            To get started, <br /> enter your subject into the search bar below.
          </h1>
          <Stack>
            <Card.Root>
              <Card.Title mt="2">First Name</Card.Title>
              <Input
                borderRadius={"5px"}
                border={"2px solid white"}
                w={"300px"}
                p={10}
                type="text"
                placeholder="First Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Card.Root>
          </Stack>

          {/* search term must be seperated by + if there are multiple words */}
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <h1>Results</h1>
          <div>
            {loading && <p>Loading…</p>}
            {error && <p className="text-red-500">{error}</p>}
            {result &&
              result?.items?.map((video: any) => (
                <Card.Root
                  key={video.id.videoId}
                  flexDirection="row"
                  overflow="hidden"
                  maxW="xl"
                >
                  <Image
                    objectFit={"contain"}
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    maxW="300px"
                    // width={video.snippet.thumbnails.high.width}
                    // height={video.snippet.thumbnails.high.height}
                  />
                  <Box>
                    <Card.Body>
                      <Card.Title mb="2">
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {video.snippet.title}
                        </a>
                      </Card.Title>
                      <Card.Description>
                        {video.snippet.description}
                      </Card.Description>
                      {/* <HStack mt="4">
                        <Badge>Hot</Badge>
                        <Badge>Caffeine</Badge>
                      </HStack> */}
                    </Card.Body>
                    {/* <Card.Footer>
                      <Button>Buy Latte</Button>
                    </Card.Footer> */}
                  </Box>
                </Card.Root>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
