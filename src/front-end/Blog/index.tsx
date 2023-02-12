import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import BlogList from "./list";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  BlogState,
  fetchCategories,
  fetchPopularBlogs,
  fetchRecentBlogs,
  fetchTopCategoryBlogs,
} from "store/Slices/blog/blogSlice";
import BlogDetail from "./detail";

export interface IBlogPageProps {}

export default function BlogPage(props: IBlogPageProps) {
  const dispatch = useDispatch();
  const { categories } = useSelector<RootState, BlogState>(
    (state) => state.blogReducer
  );
  const initialize = async () => {
    await dispatch(fetchCategories());
    await dispatch(fetchRecentBlogs());
    await dispatch(fetchPopularBlogs());
    
  };
  useEffect(() => {
    initialize();
  }, []);
  useEffect(() => {
    dispatch(fetchTopCategoryBlogs(categories));
  }, [categories]);
  return (
    <Switch>
      <Route path="/blog" exact>
        <BlogList />
      </Route>
      <Route path="/blog/:slug">
        <BlogDetail />
      </Route>
    </Switch>
  );
}
