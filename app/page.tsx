"use client";
import { useState } from "react";
import type { YouTubeSearchListResponse } from "./project/types/search-result";
import {
  Stack,
  Card,
  Input,
  Image,
  HStack,
  Badge,
  Button,
  Box,
  SimpleGrid,
  Center,
  Group,
  IconButton,
  InputGroup,
  Container,
} from "@chakra-ui/react";

import { ProjectHeader } from "./project/components/Header";
import { LuSearch } from "react-icons/lu";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<YouTubeSearchListResponse | null>(null);
  const [status, setStatus] = useState<"online" | "offline">("offline");

  const handleSearch = async () => {
    try {
      setLoading(true);
      const query = !searchTerm
        ? "What is quantum computing"
        : (searchTerm as string);
      const result = await fetch(
        `./api/search?q=${encodeURIComponent(query + " - eli5 easy")}`
      );
      if (!result.ok) throw new Error(`HTTP error ${result.status}`);
      setStatus(result.ok ? "online" : "offline");
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
    <Container minW={"100%"}>
      <SimpleGrid>
        <ProjectHeader
          title={"ELI5 Machine"}
          slogan={"Simple Search. Detailed Results. Instant Answers."}
          status={status}
        />
        <HStack>
          <Card.Root
            borderTopRadius={0}
            borderBottomRadius={0}
            minW={"100%"}
            zIndex={1}
          >
            <Center>
              <Card.Title p={2}>
                To get started, enter your subject into the search bar below.
              </Card.Title>
            </Center>
            <InputGroup
              endElement={
                <IconButton
                  position={"relative"}
                  right={-3}
                  aria-label="Search database"
                  bg="bg.subtle"
                  variant="outline"
                  onClick={handleSearch}
                >
                  <LuSearch />
                </IconButton>
              }
            >
              <Input
                borderRadius={0}
                minW={"100%"}
                flex="1"
                type="text"
                placeholder="ex: What is quantum computing"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Card.Root>
        </HStack>
        <Stack>
          <Card.Root borderTopRadius={0} p={0} m={0} borderTop={0}>
            <Center>
              <Card.Title>
                {result?.pageInfo?.totalResults} Search Results
              </Card.Title>
            </Center>

            <Card.Body p={0} m={0}>
              {loading && <p>Loading…</p>}
              <SimpleGrid
                columns={[1, null, 2, 3, 4]}
                gap={"20px"}
                py={10}
                px={{ base: 7, md: 14, lg: 28 }}
              >
                {error && <p className="text-red-500">{error}</p>}
                {result &&
                  result?.items?.map((video: any) => (
                    <Card.Root
                      key={video.id.videoId}
                      flexDirection="column"
                      overflow={"hidden"}
                      maxW={300}
                      minW={300}
                      maxH={500}
                    >
                      <Center>
                        <Image
                          objectFit={"contain"}
                          src={video.snippet.thumbnails.high.url}
                          alt={video.snippet.title}
                          maxW="300px"
                          // width={video.snippet.thumbnails.high.width}
                          // height={video.snippet.thumbnails.high.height}
                        />
                      </Center>
                      <Card.Body>
                        <Card.Title mb="2" as="h4">
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
                      </Card.Body>
                    </Card.Root>
                  ))}
              </SimpleGrid>
            </Card.Body>
          </Card.Root>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
