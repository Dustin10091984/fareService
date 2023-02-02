import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { BlogState } from "store/Slices/blog/blogSlice";
import { Link } from "react-router-dom";

export interface IBlogHeaderProps {}

export default function BlogHeader(props: IBlogHeaderProps) {
  const { categories } = useSelector<RootState, BlogState>(
    (state) => state.blogReducer
  );
  //const categories = ['News', 'Trends', 'Inspirational', 'Lifestyle', 'Resources']
  return (
    <div className="shadow-normal rounded-[2.4rem] p-6  bg-white flex flex-col lg:flex-row lg:justify-between">
      <div className="flex flex-grow-1">
        {categories.map((c) => (
          <Link
            to={`/blog?categoryId=${c.id}`}
            className="px-12 py-3 text-center hover:text-primary-main"
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
        />
      </div>
    </div>
  );
}
