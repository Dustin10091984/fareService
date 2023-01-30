import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { BlogState } from "store/Slices/blog/blogSlice";

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
          <div className="w-[14rem] py-3 text-center">{c.name}</div>
        ))}
      </div>
      <input className="flex-grow-1 mx-3 bg-gray-100 border-0 rounded-[1.6rem] lg:max-w-[40rem] p-3" />
    </div>
  );
}
