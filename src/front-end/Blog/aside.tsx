import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BlogState } from "store/Slices/blog/blogSlice";
import BlogGroupHeaderLabel from "./groupHeaderLabel";
import BlogThumbnail from "./thumbnail";

export interface IBlogAsideProps {}

export default function BlogAside(props: IBlogAsideProps) {
  const { recentBlogs } = useSelector<RootState, BlogState>(
    (state) => state.blogReducer
  );
  return (
    <div className="space-y-4">
      <BlogGroupHeaderLabel name="RECENT POSTS" />
      {recentBlogs.map((b) => (
        <BlogThumbnail
          size="sm"
          showContent={false}
          showInfo={false}
          blog={b}
          shadow={false}
          titleClass={""}
        />
      ))}
    </div>
  );
}
