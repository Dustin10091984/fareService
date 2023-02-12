import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { HOST } from "../../../constants";

const blogs: Blog[] = [
  {
    id: 1,
    title: "Home Cleaning",
    slug: "Home cleaning...",
    created_at: new Date().toString(),
    featured_image:
      "https://staging-api.farenow.com/storage/sub_services/62a19b3dbb92f-1654758205.jpg",
    category: {
      id: 1,
      name: "Cleaning Service",
    },
    contents: [],
  },
  {
    id: 2,
    title: "Commercial Cleaning",
    slug: "Comercial cleaning...",
    created_at: new Date().toString(),
    featured_image:
      "https://staging-api.farenow.com/storage/sub_services/62a1997257715-1654757746.jpg",
    category: {
      id: 1,
      name: "Cleaning Service",
    },
    contents: [],
  },
  {
    id: 3,
    title: "Sanitization",
    slug: "Sanitization...",
    created_at: new Date().toString(),
    featured_image:
      "https://staging-api.farenow.com/storage/sub_services/62a19d8f693a3-1654758799.jpg",
    category: {
      id: 1,
      name: "Cleaning Service",
    },
    contents: [],
  },
  {
    id: 4,
    title: "TV Repaire",
    slug: "TV repaire...",
    created_at: new Date().toString(),
    featured_image:
      "https://staging-api.farenow.com/storage/sub_services/62a19f9ad53ec-1654759322.jpg",
    category: {
      id: 2,
      name: "Electrical Service",
    },
    contents: [],
  },
  {
    id: 5,
    title: "AC Repaire",
    slug: "AC repaire...",
    created_at: new Date().toString(),
    featured_image:
      "https://staging-api.farenow.com/storage/sub_services/629e2ed83c3a8-1654533848.jpg",
    category: {
      id: 2,
      name: "Electrical Service",
    },
    contents: [],
  },
];

export interface BlogState {
  categories: BlogCategory[];
  topCategoryBlogs: Blog[];
  recentBlogs: Blog[];
  popularBlogs: Blog[];
}

const initialState: BlogState = {
  categories: [],
  topCategoryBlogs: [],
  recentBlogs: [],
  popularBlogs: [],
};

export const blogSlice = createSlice({
  name: "Blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchTopCategoryBlogs.fulfilled, (state, action) => {
      state.topCategoryBlogs = action.payload;
    });
    builder.addCase(fetchRecentBlogs.fulfilled, (state, action) => {
      state.recentBlogs = action.payload;
    });
    builder.addCase(fetchPopularBlogs.fulfilled, (state, action) => {
      state.popularBlogs = action.payload;
    })
  },
});

export const fetchCategories = createAsyncThunk("categories", async () => {
  const res = await axios.get(`${HOST}/api/category`);
  return res.data["data"] || [];
});

export const fetchTopCategoryBlogs = createAsyncThunk(
  "topCategoryBlog",
  async (categories: BlogCategory[], thunkApi) => {
    const res = await axios.get(`${HOST}/api/blog?trend=true`);
    return res.data["data"] || [];
  }
);

export const fetchRecentBlogs = createAsyncThunk("recentBlogs", async () => {
  const res = await axios.get(`${HOST}/api/blog`);
  return (res.data["data"] || []).slice(0, 4);
});

export const fetchPopularBlogs = createAsyncThunk("popularBlogs", async () => {
  const res = await axios.get(`${HOST}/api/blog?popular=true`);
  return (res.data["data"] || []);
});
export default blogSlice.reducer;
