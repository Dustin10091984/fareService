import axios from "axios";
import { HOST } from "constants/index";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogAside from "./aside";
import BlogLayout from "./layout";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import Breadcrumb from "components/Breadcrumb"
import BlogComments from "./comments";
import { useMutation, useQuery } from "react-query";
import WriteComment, { IWriteCommentData } from "./writeComment";
import { toast } from "react-toastify";
import { axiosInstance, helperAxios } from "../../helper/axios/index";
import { useModal } from "react-hooks-use-modal";
import Skeleton from "react-loading-skeleton";
export interface IBlogDetailProps {}

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
  return blog;
};
const fetchComments = async (slug: string) => {
  const res = await axios.get(`${HOST}/api/comment/${slug}`);
  return  res.data?.data || [];
};

const postComment = async (comment: IWriteCommentData & { blog_id: number, comment_id?: number }) => {
  await axiosInstance.post(`${HOST}/api/comment`, comment);
}

export default function BlogDetail(props: IBlogDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  
  
  const blogQuery = useQuery(['blog-detail', slug], () => fetchBlog(slug));
  const commentsQuery = useQuery(['blog-comments', slug], () => fetchComments(slug));
  const commentMutation = useMutation(['blog-comment'], postComment);
  const [commentId, setCommentId] = useState<number>();
  
  const blog = blogQuery.data;
  const comments = commentsQuery.data;
  
  const onCommentModalClose = () => {
    setCommentId(undefined);
    commentClose();
  };
  const [Modal, commentOpen, commentClose] = useModal('root', {
    focusTrapOptions: {
      onDeactivate: onCommentModalClose
    }
  });

  const onReply = (commentId: number) => {
    setCommentId(commentId);
    commentOpen();
  }

  const writeComment = async (data: IWriteCommentData) => {
    try {
      await commentMutation.mutateAsync({
        ...data,
        blog_id: blog?.id,
        comment_id: commentId
      });
      await commentsQuery.refetch();
      toast.success("Success");
    } catch (e) {
      toast.error("Error occured");
    }
  }

  const content = (
    <>
      <div>
        {blog &&
          <img
            src={blog?.featured_image}
            className="m-3 rounded-[2.4rem] border-solid border-white border-8 shadow-normal"
          />
        }
        {blogQuery.isLoading && <Skeleton height={"40rem"} />}
      </div>
      <div>
        <h1 className="text-4xl my-3">{blog?.title || <Skeleton />}</h1>
        <div className="flex">
          <div className="text-primary-main grow">
            {blog?.category?.name || <Skeleton />}
          </div>
          <div className="text-gray-500 space-x-4 shrink-0 min-w-[10rem]">
            <span className="">
              <i className="la la-user"></i>
              {blog?.author}
            </span>
            <span>
              <i className="la la-clock"></i>
              {(blog && new Date(blog?.created_at).toDateString())}
            </span>
          </div>
        </div>
      </div>
      <div className="blog-content">
        {blog?.contents.map((c, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: c.content }}></div>
        ))}
        {blogQuery.isLoading && <Skeleton  count={40}/>}
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
              <div className="text-base font-bold text-primary-main grow shrink-0">
                Blog Post
              </div>
              <Breadcrumb data={breadCrumbData} />
            </div>
            {content}
          </div>
          <div>
            <BlogAside />
          </div>

          <div className="col-span-3">
            <div className="max-w-[100rem] m-auto space-y-8">
              <BlogComments comments={comments} onReply={onReply} />
              <WriteComment onSend={writeComment} />
            </div>
          </div>
        </div>
      </BlogLayout>
      <Modal>
        <WriteComment onSend={writeComment} />
      </Modal>
    </>
  );
}
