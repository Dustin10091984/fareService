interface IService {
  id: number;
  name: string;
  image: string;
  sub_services?: ISubService[];
  questions?: IServiceQuestion[];
}
interface IServiceQuestion {
  id: number;
  sub_service_id: number;
  question: string;
  is_multiple: boolean;
  options: IServiceQuestionOptions[];
}
interface IServiceQuestionOptions {
  id: number;
  question_id: number;
  option: string;
}
interface IMenu extends IService {}
interface ISubService extends IService {
  service_id: number;
}

interface IServiceRequest {
  id: number;
  user_id: number;
  sub_service_id: number;
  date: string | null;
  address: string;
  status: "ACCEPTED" | "PENDING" | "CANCEL";
  worked_hours: string;
  working_status: "STARTED" | "PAUSED" | "ENDED";
  is_completed: boolean;
  is_replied: boolean;
  sub_service: string;
  worked_times: {
    is_paused: boolean;
    start_at: string;
    end_at: string;
    created_at: string;
    updated_at: string;
  }[];
  payment_status: boolean;
  paid_amount: string;
  payable_amount: string;
  provider?: IProvider;
  provider_id: number;
  type: string;
  created_at: string;
  updated_at: string;
  payable: boolean;
  user_feeback: IFeedback;
}
interface IServiceRequestDetail extends IServiceRequest {
  quotation_info: {
    from_address: string;
    to_address: string;
  };
}
interface IRequestInfo {
  id: number;
  service_request_id: number;
  question_id: number;
  option_id: number;
}
