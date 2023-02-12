import clsx from "clsx";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import * as React from "react";
import { useHistory } from "react-router-dom";

export interface IBlogThumbnailProps {
  size?: "xs" | "sm" | "base" | "lg";
  imagePosition?: "before" | "after";
  orientation?: "vertical" | "horizontal";
  showContent?: boolean;
  showInfo?: boolean;
  titleClass?: string;
  blog: Blog;
  shadow?: boolean;
  className?: string;
}

export default function BlogThumbnail(props: IBlogThumbnailProps) {
  const {
    size = "base",
    imagePosition = "before",
    orientation = "horizontal",
    showContent = true,
    showInfo = true,
    titleClass = "",
    blog,
    shadow = true,
    className = "",
  } = props;

  let height = {
    xs: 8,
    sm: 12,
    base: orientation == "vertical" ? 24 : 21,
    lg: 36,
  };
  let width = {
    xs: "basis-1/2 md:max-w-[12rem]",
    sm: "basis-1/2 md:max-w-[18rem]",
    base: "basis-1/3 md:max-w-[30rem]",
    lg: "basis-2/3 md:max-w-[75rem]",
  };
  const history = useHistory();
  const onClick = () => {
    history.push(`/blog/${blog.slug}`);
  }

  const contents = React.useMemo(() => {
    const contents = blog.contents.map((c) => {
      const converter = new QuillDeltaToHtmlConverter(JSON.parse(c.content)?.ops);
      const content = converter.convert();
      const dom = document.createElement("div");
      dom.innerHTML = content;
      return dom.innerText;
    });
    return contents;

  }, [blog.contents]);
  
  return (
    <div
      className={clsx([
        "bg-white rounded-[2.4rem] flex gap-6 flex-col p-4 cursor-pointer",
        orientation == "vertical"
          ? ""
          : imagePosition == "before"
          ? "md:flex-row"
          : "md:flex-row-reverse",
        {
          "shadow-normal": shadow,
        },
        className,
      ])}
      onClick={onClick}
    >
      <div
        className={clsx([
          "flex-shrink-0",
          { [width[size]]: orientation == "horizontal" },
        ])}
      >
        <img
          src={blog.featured_image}
          className={clsx([`object-cover rounded-3xl w-100`])}
          style={{ height: `${height[size]}rem` }}
        />
      </div>
      <div
        className={clsx([
          "flex flex-col gap-6 text-[1.6rem] grow",
          ["sm", "xs"].includes(size) ? "px-2 py-2" : "px-4 py-2",
        ])}
      >
        <h1
          className={clsx([
            "font-medium",
            ["sm", "xs"].includes(size) ? "text-base" : "text-2xl",
            titleClass,
          ])}
        >
          {blog.title}
        </h1>
        {showInfo && (
          <div className="flex gap-4 text-gray-500">
            <span className="">
              <i className="la la-user"></i>{blog.author}
            </span>
            <span>
              <i className="la la-clock"></i>
              {new Date(blog.created_at).toDateString()}
            </span>
          </div>
        )}
        {showContent && <p className="text-ellipsis overflow-hidden content-thumb">{contents.join("\n").slice(300)}</p>}
      </div>
    </div>
  );
}
