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
  const { topCategoryBlogs, recentBlogs: relatedBlogs } = useSelector<
    RootState,
    BlogState
  >((state) => state.blogReducer);
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

  const relatedBlogsSection = relatedBlogs.slice(0, 4).map((b) => {
    return (
      <BlogThumbnail
        blog={b}
        orientation="vertical"
        size="base"
        showContent={false}
        titleClass="text-[2rem]"
      />
    );
  });
  return (
    <>
      <BlogLayout>
        {topCategoryBlogs?.length > 0 && (
          <div className="shadow-normal rounded-[2.4rem] overflow-hidden bg-white pb-20 relative">
            <span className="absolute text-primary-main mx-5 my-4 z-10">
              Trends
            </span>
            <Slider {...sliderSettings}>
              {topCategoryBlogs.map((b) => (
                <div className="p-1 relative">
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
        )}
        {/*  */}
        <div className="grid lg:grid-cols-3 gap-32">
          <div className="col-span-2 space-y-16">
            {blogs.map((b) => (
              <BlogThumbnail size="base" blog={b} />
            ))}
          </div>
          <div>
            <BlogAside />
          </div>
        </div>
      </BlogLayout>

      <section className="bg-gray-200 p-16">
        <div className="container">
          <h1 className="font-bold text-2xl text-center mb-12">
            You may also like
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,_25%)] justify-center gap-12 px-32">
            {relatedBlogsSection}
          </div>
        </div>
      </section>
    </>
  );
}
