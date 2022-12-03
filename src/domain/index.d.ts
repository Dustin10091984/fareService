type DataResponse<T> = {
  error?: boolean;
  loading?: boolean;
  message?: string;
  data: T;
};

interface IBookSliderProps<T = any> {
  onPrev?: () => void;
  onNext?: (value?: T) => void;
  prevLabel?: string;
  nextLabel?: string;
  title?: string;
}

interface ICreditCard {
  number: string;
  name: string;
  expDate: string;
  cvv: number;
}

type QuestionAnswers = {
  [question: string]: string;
};
