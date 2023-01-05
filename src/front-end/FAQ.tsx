import * as React from "react";
import Loading from "./common/Loading";
import { useQuery } from "react-query";
import axios from "axios";
import { HOST } from "../constants";
export interface IFAQProps {}

export const FAQItem: React.FC<{ faq: IFAQ }> = ({ faq }) => {
  const [show, setShow] = React.useState(false);
  const toggle = () => {
    setShow((show) => !show);
  };
  return (
    <div className="fare-card shadow-[0_1px_8px_2px_#14141414] rounded-3xl">
      <div className="space-x-4 flex items-center mb-3">
        <h2 className="">{faq.question}</h2>
        {faq?.sub_service && (
          <div className="text-xs text-white rounded-pill bg-primary-main px-4 py-2">
            {faq.sub_service.name}
          </div>
        )}
        <div className="flex-grow-1"></div>
        <button
          className="rounded-xl w-[4rem] h-[4rem] bg-primary-light"
          onClick={toggle}
        >
          <i className={`la la-${show ? "minus" : "plus"}`}></i>
        </button>
      </div>
      {show && (
        <ul className="px-3">
          {faq.answers.map((ans) => (
            <li>{ans.answer}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function FAQ(props: IFAQProps) {
  const {
    isLoading,
    error,
    data: faqResData,
  } = useQuery<{ data: IFAQ[] }>("faqs", async () => {
    return (await axios.get(`${HOST}/api/user/faqs`)).data;
  });
  let faqList = faqResData?.data || [];
  return (
    <section className="">
      <div className="container py-16 space-y-6">
        <Loading loading={isLoading}></Loading>
        <div className="text-center text-[6rem] font-medium">FAQ</div>
        {faqList.map((faq) => (
          <FAQItem faq={faq} key={faq.id} />
        ))}
      </div>
    </section>
  );
}
