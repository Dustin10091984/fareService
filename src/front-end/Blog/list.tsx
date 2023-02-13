import * as React from "react";
import BlogLayout from "./layout";
import BlogThumbnail from "./thumbnail";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { HOST } from "./../../constants/index";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { BlogState } from "store/Slices/blog/blogSlice";
import BlogAside from "./aside";
import { useQuery } from "react-query";
import Paginate from "components/Paginate";
import Skeleton from 'react-loading-skeleton'

export interface IBlogListProps {}

const fetchBlogs = async (params: { categoryId: string, search: string, page: number}) => {
  const res = await axios.get(`${HOST}/api/blog`, {
    params,
  });
  return res.data as {data: Blog[], meta: any};
};

export default function BlogList(props: IBlogListProps) {
  const { topCategoryBlogs, recentBlogs: relatedBlogs } = useSelector<
    RootState,
    BlogState
  >((state) => state.blogReducer);
  const location = useLocation();
  const history = useHistory();
  let urlParams = new URLSearchParams(location.search);
  let categoryId = urlParams.get("categoryId") ?? "";
  let search = urlParams.get("search") ?? "";
  let page = Number(urlParams.get("page")) || 1;
  
  const blogsQuery = useQuery(['blogs', categoryId, search, page], () => fetchBlogs({ categoryId, search, page }));
  const { data: blogs = [], meta: { current_page = 1, last_page = 1 } = {} } = blogsQuery.data || {};

  
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
  const onPageChange = ({ id, params }) => {
    history.push(`/blog${params}`);
  }
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
            {blogsQuery.isLoading && <Skeleton count={5} height="24rem"/>}
            {blogs.map((b) => (
              <BlogThumbnail size="base" blog={b} />
            ))}
            <div className="w-max">
              <Paginate
                current_page={current_page}
                last_page={last_page}
                func={onPageChange}
                params={{ categoryId, search }}
              />
            </div>
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
