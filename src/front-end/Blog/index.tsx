import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import BlogList from "./list";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  BlogState,
  fetchCategories,
  fetchRecentBlogs,
  fetchTopCategoryBlogs,
} from "store/Slices/blog/blogSlice";

export interface IBlogPageProps {}

export default function BlogPage(props: IBlogPageProps) {
  const dispatch = useDispatch();
  const { categories } = useSelector<RootState, BlogState>(
    (state) => state.blogReducer
  );
  const initialize = async () => {
    await dispatch(fetchCategories());
    await dispatch(fetchRecentBlogs());
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
    </Switch>
  );
}
