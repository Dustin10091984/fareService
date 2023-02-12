import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BlogState } from "store/Slices/blog/blogSlice";
import BlogGroupHeaderLabel from "./groupHeaderLabel";
import BlogThumbnail from "./thumbnail";

export interface IBlogAsideProps {}

export default function BlogAside(props: IBlogAsideProps) {
  const { recentBlogs, categories, popularBlogs } = useSelector<RootState, BlogState>(
    (state) => state.blogReducer
  );

  const recentPosts = recentBlogs
    .slice(1)
    .map((b) => (
      <BlogThumbnail
        size="sm"
        showContent={false}
        showInfo={false}
        blog={b}
        shadow={false}
        titleClass={""}
        className="bg-transparent"
      />
    ));

  const popularPosts = popularBlogs.map((b) => (
    <BlogThumbnail size="xs" showContent={false} showInfo={false} blog={b} />
  ));

  const categoryTags = categories.map((c) => (
    <div className="bg-gray-200 rounded-2xl px-4 py-3 font-medium text-base">
      {c.name}
    </div>
  ));
  return (
    <div className="space-y-16">
      <div className="space-y-8">
        <BlogGroupHeaderLabel name="RECENT POSTS" />
        {recentPosts}
      </div>

      {recentBlogs[0] && (
        <BlogThumbnail
          size="base"
          blog={recentBlogs[0]}
          orientation={"vertical"}
        />
      )}
      <div className="space-y-8">
        <BlogGroupHeaderLabel name="POPULAR POSTS" />
        {popularPosts}
      </div>
      <div className="space-y-8">
        <BlogGroupHeaderLabel name="CATEGORIES" />
        <div className="flex gap-6">{categoryTags}</div>
      </div>
    </div>
  );
}
