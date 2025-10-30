export interface YouTubeResourceId {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

export interface YouTubeSearchResultSnippet {
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

export interface YouTubeSearchResult {
  kind: string;
  etag: string;
  id: YouTubeResourceId;
  snippet: YouTubeSearchResultSnippet;
}

export interface YouTubeSearchListResponse {
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
