// Define interfaces for the expected YouTube API response structure
interface YouTubeResourceId {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

interface YouTubeSearchResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface YouTubeSearchResult {
  kind: string;
  etag: string;
  id: YouTubeResourceId;
  snippet: YouTubeSearchResultSnippet;
}

interface YouTubeSearchListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchResult[];
}

// In a real application, you would typically load your API key from an environment variable
// or a secure configuration, not hardcode it directly in client-side code.
const YOUTUBE_API_KEY: string = "AIzaSyCgLNwfvVPXx8RW0QQm02L-zGAWWK2MhOE"; // Replace with your actual API key

async function searchYouTube(
  query: string,
  maxResults: number = 5,
  type: "video" | "channel" | "playlist" | "any" = "video"
): Promise<YouTubeSearchListResponse | null> {
  if (
    !YOUTUBE_API_KEY ||
    YOUTUBE_API_KEY === "AIzaSyCgLNwfvVPXx8RW0QQm02L-zGAWWK2MhOE"
  ) {
    console.error(
      'Please replace "AIzaSyCgLNwfvVPXx8RW0QQm02L-zGAWWK2MhOE" with your actual YouTube Data API key.'
    );
    return null;
  }

  const API_URL: string = "https://www.googleapis.com/youtube/v3/search";
  const params = new URLSearchParams({
    part: "snippet", // 'snippet' is a required parameter [8]
    q: query,
    type: type, // You can specify 'video', 'channel', or 'playlist'
    maxResults: maxResults.toString(), // Maximum number of items to return (0-50) [1]
    key: YOUTUBE_API_KEY,
  });

  const requestUrl: string = `${API_URL}?${params.toString()}`;

  try {
    const response: Response = await fetch(requestUrl);
    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${JSON.stringify(
          errorData
        )}`
      );
    }
    const data: YouTubeSearchListResponse = await response.json();
    console.log("YouTube Search Results:", data);
    return data;
  } catch (error: any) {
    console.error("Error fetching YouTube search results:", error.message);
    return null;
  }
}

// Example usage:
searchYouTube("TypeScript tutorial", 10, "video").then(
  (results: YouTubeSearchListResponse | null) => {
    if (results && results.items) {
      console.log("\nFound videos:");
      results.items.forEach((item: YouTubeSearchResult) => {
        // Ensure item.id.videoId exists for video type
        if (item.id.videoId) {
          console.log(
            `- ${item.snippet.title} (Channel: ${item.snippet.channelTitle}, Video ID: ${item.id.videoId})`
          );
        }
      });
    }
  }
);

searchYouTube("Google Developers channel", 3, "channel").then(
  (results: YouTubeSearchListResponse | null) => {
    if (results && results.items) {
      console.log("\nFound channels:");
      results.items.forEach((item: YouTubeSearchResult) => {
        // Ensure item.id.channelId exists for channel type
        if (item.id.channelId) {
          console.log(
            `- ${item.snippet.title} (Channel ID: ${item.id.channelId})`
          );
        }
      });
    }
  }
);
