import { useState, useEffect, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import Loading from './common/Loading';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { constant } from "lodash";
import { useParams } from "react-router-dom";

export const Page = (props) => {
    const [state, setState] = useState({});

    const params = useParams();

    const { name } = params;

    const pages = useSelector((state) => state?.footerReducer?.pages);
    const page = pages?.data?.find((page) => page.name == name);

    useEffect(() => {
        if (name && page?.content) {
            const converter = new QuillDeltaToHtmlConverter(
                JSON.parse(page?.content)?.ops
            );
            setState({
                ...state,
                title: page?.title,
                content: converter.convert(),
            });
        }
    }, [name, page?.title]);

    console.log(state);

    return (
        <div className="container">
            <Loading loading={pages.loading}></Loading>
            <div className="row">
                <div className="text-center col-md-12">
                    <h1>{state?.title}</h1>
                </div>
                <div className="col-md-12 order-box-des d-flex  align-items-center">
                    {!!state?.content && (
                        <Content {...{ content: state?.content }} />
                    )}
                    {pages.error && (
                        <div className="order-num">Not Found Data</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Content = ({ content }) => {
    
    const ref = useRef();
    useEffect(() => {
        if (ref.current && ref.current.innerHTML == "") {
            ref.current.innerHTML = content;
        }
    }, []);

    return (
        <>
            <p
                ref={ref}
                style={{
                    fontSize: "1.5rem",
                }}
                className="Features"
            ></p>
        </>
    );
};