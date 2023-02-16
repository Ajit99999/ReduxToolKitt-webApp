import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
});
export const deletePost = createAsyncThunk("/posts/deletePost", async (id) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      return id;
    }
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
});
export const addPost = createAsyncThunk("/posts/addPosts", async (data) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
});
export const updatePost = createAsyncThunk(
  "/posts/updatePost",
  async (data) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const singlePost = await res.json();
      return singlePost;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }
);

const initialState = { posts: [], success: null, err: null };

export const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    postAdded: (state, action) => {
      state.posts.unshift(action.payload);
    },
    reactionAdded: (state, action) => {
      const postObj = state.posts.find((elem) => elem.id === action.payload.id);
      if (postObj) {
        postObj.emoji[action.payload.name]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.success = "pending";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.success = "sucessful";

      const loadedPostList = action.payload.map((post) => {
        post.emoji = {
          like: 0,
          love: 0,
          smile: 0,
        };
        return post;
      });
      state.posts = loadedPostList;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.err = action.error.message;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      action.payload.emoji = {
        like: 0,
        love: 0,
        smile: 0,
      };

      state.posts.unshift(action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      console.log(current(state.posts));
      const filteredState = state.posts.filter(
        (elem) => elem.id != action.payload
      );
      state.posts = [];
      state.posts = filteredState;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const filteredState = state.posts.map((elem) => {
        if (elem.id == action.payload.id) {
          action.payload.emoji = elem.emoji;
          return action.payload
        } else {
          return elem;
        }
      });
      state.posts = [];
      state.posts = filteredState;
    });
  },
});
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
