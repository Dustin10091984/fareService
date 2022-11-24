interface IServiceRequestHourly {
  address: string;
  hours: number;
  is_hourly: boolean;
  provider_id: string;
  questions: {
    [question_id: string]: number[];
  };
  date: string;
  book_time_slots: {
    start: string;
    end: string;
  }[];
  card_id: string;
  plan_id: number;
}
