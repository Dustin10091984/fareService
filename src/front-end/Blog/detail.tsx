import axios from "axios";
import { HOST } from "constants/index";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogAside from "./aside";
import BlogLayout from "./layout";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import Breadcrumb from "components/Breadcrumb"
import BlogComments from "./comments";

export interface IBlogDetailProps {}

export default function BlogDetail(props: IBlogDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogDetail>();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const fetchBlog = async (slug: string) => {
    const res = await axios.get(`${HOST}/api/blog/${slug}`);
    let blog: BlogDetail = res.data?.data;
    if (blog) {
      blog.contents = blog.contents.map((c) => {
        const converter = new QuillDeltaToHtmlConverter(
          JSON.parse(c.content)?.ops
        );
        return {
          ...c,
          content: converter.convert(),
        };
      });
    }
    setBlog(blog);
  };
  const fetchComments = async (slug: string) => {
    
    const res = await axios.get(`${HOST}/api/comment/${slug}`);
    const comments = res.data?.data || [];
    setComments(comments);
  }

  useEffect(() => {
    fetchBlog(slug);
    fetchComments(slug);
  }, [slug]);

  const content = blog && (
    <>
      <div>
        <img
          src={blog?.featured_image}
          className="m-3 rounded-[2.4rem] border-solid border-white border-8 shadow-normal"
        />
      </div>
      <div>
        <h1 className="text-4xl my-3">{blog?.title}</h1>
        <div className="flex">
          <div className="text-primary-main grow">
            {blog.category.name}
          </div>
          <div className="text-gray-500 space-x-4">
            <span className="">
              <i className="la la-user"></i>{blog.author}
            </span>
            <span>
              <i className="la la-clock"></i>
              {new Date(blog.created_at).toDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="blog-content">
        {blog?.contents.map((c, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: c.content }}></div>
        ))}
      </div>
    </>
  );
  const breadCrumbData = [
    {
      title: "Blog",
      to: "/blog"
    },
    {
      title: blog?.category.name,
      to: `/blog?categoryId=${blog?.category.id}`
    },
    {
      title: slug
    }
  ]
  return (
    <>
      <BlogLayout>
        <div className="grid lg:grid-cols-3 gap-32">
          <div className="col-span-2 blog-container space-y-16">
            <div className="flex gap-40 px-4">
              <div className="text-base font-bold text-primary-main grow shrink-0">Blog Post</div>
              <Breadcrumb data={breadCrumbData} />
            </div>
            {content}
            <BlogComments comments={comments} />
          </div>
          <div>
            <BlogAside />
          </div>
        </div>
      </BlogLayout>
    </>
  );
}
