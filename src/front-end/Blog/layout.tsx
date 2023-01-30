import * as React from "react";
import BlogHeader from "./header";

export interface IBlogLayoutProps {}

export default function BlogLayout(
  props: React.PropsWithChildren<IBlogLayoutProps>
) {
  const { children } = props;
  return (
    <section className="py-16 bg-gray-50">
      <div className="container space-y-12">
        <>
          <BlogHeader />
          {children}
        </>
      </div>
    </section>
  );
}
