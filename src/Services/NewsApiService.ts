export type NewsItem = {
  author?: string;
  source?: Source;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
};

export type Source = {
  id: string;
  name: string;
};

export type ApiResponse = {
  articles: NewsItem[];
  totalResults: number;
  status: string;
  message?: string;
};

class NewsApiService {
  readonly API_URL = 'https://newsapi.org/v2/';

  async headlines(page: number = 1, limit: number = 10): Promise<ApiResponse> {
    console.log('API request page', page);
    const res = await fetch(
      `${this.API_URL}top-headlines?apiKey=0c086f4d1f6c43a0a1516d63843fbbed&category=technology&language=en&pageSize=${limit}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    );
    return await res.json();
  }
}

export const newsApiService = new NewsApiService();
