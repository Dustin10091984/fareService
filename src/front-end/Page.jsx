import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Loading from './common/Loading';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

export const Page = (props) => {
    const [state, setState] = useState({});

    const { match: { params: { name } } } = props;

    const pages = useSelector((state) => state?.footerReducer?.pages);
    
    useEffect(() => {
        if(page?.content) {
            const page = pages?.data?.find((page) => (page.name == name));
            const converter = new QuillDeltaToHtmlConverter(JSON.parse(page?.content)?.ops);
            converter = converter.convert();
            // setState((prev) => ({...prev, content: converter, title: page?.title}));
        }
    }, [page?.content]);
    
    return (
        <div className="container">
            <Loading loading={pages.loading}></Loading>
            <div className="row">
                <div className="text-center col-md-12">
                    <h1>{state?.title}</h1>
                </div>
                <div className="col-md-12 order-box-des d-flex  align-items-center">
                <p
                    style={{
                        fontSize: '1.5rem',
                    }}
                    className="Features"
                    dangerouslySetInnerHTML={{ __html: state?.content }}
                />
                    {pages.error && (
                        <div className="order-num">Not Found Data</div>
                    )}
                </div>
            </div>
        </div>
    );
}