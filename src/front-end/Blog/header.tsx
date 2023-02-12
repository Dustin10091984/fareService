import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { BlogState } from "store/Slices/blog/blogSlice";
import { Link, useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";

export interface IBlogHeaderProps {}

export default function BlogHeader(props: IBlogHeaderProps) {
  const location = useLocation();
  const history = useHistory();
  const { categories } = useSelector<RootState, BlogState>(
    (state) => state.blogReducer
  );
  let urlParams = new URLSearchParams(location.search);
  const search = urlParams.get("search");
  let categoryId = urlParams.get("categoryId") ?? "";
  const onSearch = (str: string) => {
    urlParams.set("search", str);
    history.push(`/blog?${urlParams.toString()}`);
  }
  //const categories = ['News', 'Trends', 'Inspirational', 'Lifestyle', 'Resources']
  return (
    <div className="shadow-normal rounded-[2.4rem] p-6  bg-white flex flex-col lg:flex-row lg:justify-between">
      <div className="flex flex-grow-1">
        {categories.map((c) => (
          <Link
            to={`/blog?categoryId=${c.id}`}
            className={clsx(["px-12 py-3 text-center hover:text-primary-main"], {"text-primary-main": c.id == Number(categoryId)})}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="grow lg:max-w-[40rem]">
        <img
          src="/assets/img/search-normal.svg"
          className="mb-1 mx-[1rem] w-[2.5rem] h-[2.5rem] inline -mr-[3.5rem] relative"
        />
        <input
          className="outline-none py-3 pl-[4.5rem] w-100 bg-gray-100 border-0 rounded-[1.6rem]"
          placeholder="Search"
          defaultValue={search}
          onKeyDown={(e) => {e.which == 13 && onSearch(e.currentTarget.value)}}
        />
      </div>
    </div>
  );
}
