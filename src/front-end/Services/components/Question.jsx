import { useMemo, Fragment } from "react";
import { ReactSelect } from "../../../components/ReactSelect/ReactSelect";

const Question = ({ handleChangeQuestion, questions, service }) => {
  const memoQuestion = useMemo(() => {
    if (questions)
      return {
        singleSelect: questions.filter(
          (questionData) => !questionData.is_multiple
        ),
        multipleSelect: questions.filter(
          (questionData) => questionData.is_multiple
        ),
      };
  }, [questions]);

  return (
    <>
      {memoQuestion?.singleSelect?.map(
        (questionData, index, questionsData) =>
          index % 2 === 0 && (
            <div key={index} className="d-flex justify-content-between">
              <div className="common-input-react mb-4 flex-grow-1">
                <ReactSelect
                  {...{
                    isSearchable: false,
                    name: `question_${questionData.id}`,
                    value: service?.selected[`question_${questionData.id}`],
                    onChange: (value) =>
                      handleChangeQuestion({
                        name: `question_${questionData.id}`,
                        value,
                      }),
                    placeholder: questionData.question,
                    options: questionData?.options?.map((option) => ({
                      value: option.id,
                      label: option.option,
                    })),
                  }}
                />
              </div>
              {questionsData[index + 1] && (
                <div className="common-input-react mb-4 flex-grow-1">
                  <ReactSelect
                    {...{
                      isSearchable: false,
                      name: `question_${questionsData[index + 1].id}`,
                      value:
                        service?.selected[
                          `question_${questionsData[index + 1].id}`
                        ],
                      onChange: (value) =>
                        handleChangeQuestion({
                          name: `question_${questionsData[index + 1].id}`,
                          value,
                        }),
                      placeholder: questionsData[index + 1].question,
                      options: questionsData[index + 1]?.options?.map(
                        (option) => ({
                          value: option.id,
                          label: option.option,
                        })
                      ),
                    }}
                  />
                </div>
              )}
            </div>
          )
      )}
      {memoQuestion?.multipleSelect?.map((questionData, index) => (
        <div key={index} className="d-flex justify-content-between">
          <div className="common-input-react mb-4">
            <ReactSelect
              {...{
                isMulti: true,
                isSearchable: false,
                name: `question_${questionData.id}`,
                value: service?.selected[`question_${questionData.id}`],
                onChange: (value) =>
                  handleChangeQuestion({
                    name: `question_${questionData.id}`,
                    value,
                  }),
                placeholder: questionData.question,
                options: questionData?.options?.map((option) => ({
                  value: option.id,
                  label: option.option,
                })),
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export { Question };
