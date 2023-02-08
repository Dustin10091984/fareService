import * as React from "react";

export interface IBlogCommentsProps {
  comments: BlogComment[];
}
interface IBlogCommentProps {
  comment: BlogComment;
  level?: number;
}
const BlogComment = (props: IBlogCommentProps) => {
  let {
    comment,
    created_at = new Date(),
    user: { first_name, last_name, image: avatar } = {},
    replies = []
  } = props.comment;
  const { level = 0 } = props;

  if (!avatar) {
    avatar = "/assets/img/user.svg";
  }
  return (
    <>
      <div className="flex flex-row text-[1.6rem] gap-8 py-6 px-10" style={{marginLeft: `${7.6 * level}rem`}}>
        {level==0 && <img src={avatar} className="w-[5.6rem] h-[5.6rem] mt-2" />}
        <div className="flex flex-col gap-4 grow">
          <div className="flex flex-row gap-6 items-center">
            {level>0 && <img src={avatar} className="w-[4rem] h-[4rem]" />}
            <div className="grow font-medium text-base">
              {first_name}&ensp;{last_name}
            </div>
            <div className="text-gray-400">
              <i className="fas fa-clock mx-2"></i>
              {new Date(created_at).toDateString()}
            </div>
          </div>
          <hr className="border-2" />
          <p>{comment}</p>
          <div>
            <button className="fare-btn fare-btn-primary fare-btn-sm px-8 rounded-[8px]">
              <i className="la la-edit mr-2"></i>
              Reply
            </button>
          </div>
        </div>
      </div>
      <hr/>
      {
        replies.map(r =>
          <BlogComment comment={r} level={level + 1} />)
      }
    </>
  );
};

export default function BlogComments(props: IBlogCommentsProps) {
  const { comments = [] } = props;
  return (
    <div className="space-y-12">
      <div className="border-b-4 border-solid border-gray-200">
        <span className="inline-block -mb-[4px] pr-[20rem] font-bold text-2xl border-b-4 border-solid border-primary-main">{comments.length} COMMENTS</span>
      </div>
      <div className="shadow-normal rounded-[2.4rem] bg-white overflow-hidden">
        {comments
          .filter((c) => c.comment_id == null)
          .map((c) => (
            <BlogComment comment={c} />
          ))}
      </div>
    </div>
  );
}
