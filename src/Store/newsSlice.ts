import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { newsApiService, NewsItem } from '../Services/NewsApiService';

type NewsState = {
  data: NewsItem[];
  error?: string;
  loadingMore: boolean;
  refreshing: boolean;
  currentPage: number;
};

const initialState: NewsState = {
  data: [],
  error: undefined,
  loadingMore: false,
  refreshing: false,
  currentPage: 1
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    loadNewData: state => {
      return {
        ...state,
        refreshing: true
      };
    },
    loadMore: state => {
      return {
        ...state,
        loadingMore: true
      };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadNewDataAsync.pending, state => {
        state.refreshing = true;
      })
      .addCase(loadNewDataAsync.fulfilled, (state, action) => {
        state.refreshing = false;
        if (action.payload.status === 'error') {
          state.error = action.payload.message;
        } else {
          //See if we loaded any new items upon refresh
          const currentIds = state.data.map(it => it.url);
          const newItems = action.payload.articles.filter(it => !currentIds.includes(it.url));
          if (newItems.length > 0) {
            console.log(`Found ${newItems.length} new items, add on top of list`);
            //TODO: potentially add here a new flag indicating that new items are ready to display, like Twitter does
            state.data = [...action.payload.articles, ...state.data];
          } else {
            console.log('No new items found on loading new data.');
          }
        }
      })
      .addCase(loadNewDataAsync.rejected, (state, action) => {
        state.refreshing = false;
        state.error = action.error?.message ?? 'Unknown error';
      })
      .addCase(loadMoreDataAsync.pending, state => {
        state.loadingMore = true;
      })
      .addCase(loadMoreDataAsync.fulfilled, (state, action) => {
        state.loadingMore = true;
        if (action.payload.status === 'error') {
          state.error = action.payload.message;
        } else {
          const moreItems = action.payload.articles;
          if (moreItems.length > 0) {
            state.data = [...state.data, ...action.payload.articles];
            state.currentPage = state.currentPage + 1;
            console.log(`Loaded ${moreItems.length} more items from bottom.`);
          } else {
            console.log('Loaded all items.Reached end.');
            //TODO: potentially add another state variable to signal end of list, and stop trying to load items.
          }
        }
      })
      .addCase(loadMoreDataAsync.rejected, (state, action) => {
        state.loadingMore = true;
        state.error = action.error?.message ?? 'Unknown error';
      });
  }
});

export const loadNewDataAsync = createAsyncThunk('news/api/fetchNew', async () => {
  console.log('Load new data async....');
  return await newsApiService.headlines();
});

export const loadMoreDataAsync = createAsyncThunk(
  'news/api/fetchMore',
  async (currentPage: number) => {
    return await newsApiService.headlines(currentPage + 1);
  }
);

export default newsSlice.reducer;
export const { loadNewData, loadMore } = newsSlice.actions;
