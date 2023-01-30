import * as React from "react";
import BlogLayout from "./layout";
import BlogThumbnail from "./thumbnail";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { HOST } from "./../../constants/index";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BlogState } from "store/Slices/blog/blogSlice";
import BlogAside from "./aside";

export interface IBlogListProps {}

export default function BlogList(props: IBlogListProps) {
  const { topCategoryBlogs } = useSelector<RootState, BlogState>(
    (state) => state.blogReducer
  );
  const { search } = useLocation();
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  let urlParams = new URLSearchParams(search);
  let categoryId = urlParams.get("categoryId");

  React.useEffect(() => {
    fetchBlogs(Number(categoryId));
  }, [categoryId]);
  const fetchBlogs = async (categoryId: number) => {
    let params = {} as any;
    if (categoryId) {
      params = { categoryId };
    }
    const res = await axios.get(`${HOST}/api/blog`, {
      params,
    });
    setBlogs(res.data.data || []);
  };
  const sliderSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
  };
  return (
    <BlogLayout>
      <div className="shadow-normal rounded-[2.4rem] overflow-hidden bg-white pb-20">
        <Slider {...sliderSettings}>
          {[...topCategoryBlogs, ...topCategoryBlogs].map((b) => (
            <div className="p-1 relative">
              <span className="absolute text-primary-main mx-5 my-4">
                {b.category.name}
              </span>
              <BlogThumbnail
                size="lg"
                titleClass="mt-20"
                imagePosition="after"
                blog={b}
                shadow={false}
              />
            </div>
          ))}
        </Slider>
      </div>
      {/*  */}
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="col-span-2">
          {blogs.map((b) => (
            <BlogThumbnail size="base" blog={b} />
          ))}
        </div>
        <div>
          <BlogAside />
        </div>
      </div>
      {/* <div className="w-[33%]">
        <BlogThumbnail size="sm" showContent={false} showInfo={false} />
        <BlogThumbnail orientation="vertical" />
      </div> */}
    </BlogLayout>
  );
}
