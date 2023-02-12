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
  [question: string]: number | number[];
};

interface IFAQ {
  id: number;
  question: string;
  answers: {
    answer: string;
  }[];
  sub_service: {
    id: number;
    name: string;
  };
}

interface ILocation {
  placeId: string;
}
