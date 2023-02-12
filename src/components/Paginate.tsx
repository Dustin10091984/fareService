import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

export interface IPaginateProps{
    current_page: number;
    last_page: number;
    id?: string;
    func?: (data: { id: string, params: string }) => void;
    params?: any;
}
const Paginate = ({ current_page, last_page, id, func, params }: IPaginateProps) => {
    const [state, setState] = useState({
        current_page: null,
        last_page: null,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (current_page) {
            setState((state) => ({
                ...state,
                current_page: current_page,
            }));
        }
        if (last_page) {
            setState((state) => ({
                ...state,
                last_page: last_page,
            }));
        }
    }, [current_page, last_page]);
    const handlePageClick = ({ selected }) => {
        let newParams = new URLSearchParams({
            ...params,
            page: selected + 1,
        }).toString();
        dispatch(func({ id, params: `?${newParams}` }));
    };
    return (
      state.last_page &&
      state.current_page && (
        <div className="bg-white shadow-normal rounded-[2.4rem]">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            // onClick={handlePageClick}
            onPageChange={handlePageClick}
            pageCount={state.last_page}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            forcePage={state.current_page - 1}
            containerClassName={"pagination"}
            previousLinkClassName={"fare-btn fare-btn-default m-4"}
            nextLinkClassName={"fare-btn fare-btn-primary m-4"}
            disabledClassName={"disabled pagination__link--disabled"}
            activeClassName={"text-primary"}
          />
        </div>
      )
    );
};
export default Paginate;
