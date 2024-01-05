import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createPostApi,
  getAllPostsApi,
  getMyPostsApi,
  getRecentPostsApi,
  getSinglePostApi,
} from './post.api';
import { notifications } from '@mantine/notifications';

export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: Date;
  created_by: string;
  created_by_ref: {
    name: string;
  };
  sectionTitle: string;
}

export interface PostState {
  status: 'idle' | 'loading' | 'failed';
  posts: Post[];
  recentPosts: Post[];
  myPosts: Post[];
  singlePost: Post | null;
}

const initialState: PostState = {
  status: 'idle',
  posts: [],
  recentPosts: [],
  myPosts: [],
  singlePost: null,
};

export const createPost = createAsyncThunk(
  'post/create',
  async (data: { title: string; content: string; category: string }, { dispatch }) => {
    const response = await createPostApi(data.title, data.category, data.content);
    dispatch(getRecentPosts());
    dispatch(getAllPosts());
    dispatch(getMyPosts());
    return response.data;
  }
);

export const getRecentPosts = createAsyncThunk('/post/recent', async () => {
  const response = await getRecentPostsApi();
  return response.data;
});

export const getAllPosts = createAsyncThunk('/post/', async () => {
  const response = await getAllPostsApi();
  return response.data;
});

export const getMyPosts = createAsyncThunk('/post/myPosts', async () => {
  const response = await getMyPostsApi();
  return response.data;
});

export const getSinglePost = createAsyncThunk('/post/singlePost', async (id: string) => {
  const response = await getSinglePostApi(id);
  return response.data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'idle';
        if (!action.payload.success) {
          notifications.show({
            title: 'Post Creation Failed',
            message: 'Something went wrong',
            autoClose: true,
            color: 'red',
          });
        } else {
          notifications.show({
            title: 'Posted',
            message: 'Post created successfully',
            autoClose: true,
            color: 'green',
          });
        }
      })
      .addCase(createPost.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getRecentPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRecentPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.recentPosts = action.payload.data;
        console.log('fetched recent posts');
      })
      .addCase(getRecentPosts.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getMyPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.myPosts = action.payload.data;
        console.log('fetched my posts');
      })
      .addCase(getMyPosts.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload.data;
        console.log('fetched all posts');
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(getSinglePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.singlePost = action.payload.data;
        console.log('fetched single post');
      })
      .addCase(getSinglePost.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
