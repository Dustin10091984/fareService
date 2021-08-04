import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getCleaningQuestion } from "../../store/Slices/services/CleaningSclice";
export const Question = (props) => {
    const [state, setState] = useState({ question : [], currentStep : 0 });
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getCleaningQuestion());
    }, []);

    const questionArray = useSelector((state) => state.cleaning);
    useEffect(() => {
        if (questionArray && questionArray !== undefined && questionArray !== null){
            setState(state => ({
                ...state,
                question: questionArray
            }));
        }
    }, [questionArray, state.question]);

    const handleRadioChange = (e) => {
        setState(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        // let selected = state.selected;
        // if (selected[index]) {
        //     selected[index].option = e.target.value
        //     selected[index][e.target.name] = e.target.value
        // }else{
        //     selected.push({ id: questionId, option: e.target.value });
        // }
        // setState(state => ({
        //     ...state,
        //     selected: selected
        // }));

        // console.log(state);
    }

    const handleBackClick = () => {
        if (state.question && state.question.data && state.currentStep > 0){
            setState(state => ({
                ...state,
                currentStep: state.currentStep - 1
            }));
        }
    }

    const handleNextClick = () => {
        if (state.question && state.question.data && state.currentStep < (state.question.data.questions.length-1)) {
            setState(state => ({
                ...state,
                currentStep: state.currentStep + 1
            }));
        } else {
            console.log(state);
        }
    }

    return (
        <div className='row'>
            <div className="col-md-12">
                <div className="title-move mb-5">
                    {state.question ? state.question.data ? state.question.data.name : 'Please wait - - -' : ''}
                </div>
                <div className="question">
                    {state.question ? state.question.data && state.question.data.questions ? `${state.question.data.questions[state.currentStep].question}?` : 'Please wait - - -' : ''}
                </div>
                <div className='row'>
                {
                state.question ? state.question.data ? state.question.data.questions[state.currentStep].options.map((data, index)=>{
                    return(
                        <div key={index} className='col-md-12 mt-3 ml-5'>
                            <div className="form-check">
                                    <input 
                                        className="form-check-input radio" 
                                    checked={parseInt(state["radio_" + state.question.data.questions[state.currentStep].id]) === data.id}
                                        defaultValue={data.id}
                                        type="radio" 
                                    name={`radio_${state.question.data.questions[state.currentStep].id}`}
                                        id={`radio${index}_${state.currentStep}`} 
                                        onChange={handleRadioChange}
                                    />
                                <label 
                                    className="form-check-label ml-4 option" 
                                    htmlFor={`radio${index}_${state.currentStep}`}
                                >
                                    {data.option}
                                </label>
                            </div>
                        </div>
                    ) 
                
                    })
                    : '' 
                    : ''
                }
                </div>
                <div className="text-center mt-0">
                    {state.currentStep === 0 ? (
                        <button to="#" disabled onClick={handleBackClick} className="button-common-2 float-left mt-5 w-25">Back</button>
                    ) : (
                            <button to="#"onClick={handleBackClick} className="button-common-2 float-left mt-5 w-25">Back</button>
                    )}

                    {state.question.data && state.question.data.questions && (state.currentStep === (state.question.data.questions.length - 1)) ? (
                        <button to="#" onClick={handleNextClick} className="button-common float-right mt-5 w-25">Search</button>
                    ) : (
                        <button to="#" onClick={handleNextClick} className="button-common float-right mt-5 w-25">Next</button>
                    )}
                </div>
            </div>
        </div>
    )
}
