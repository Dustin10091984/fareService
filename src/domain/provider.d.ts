interface IProviderBase {
  id: number;
  first_name: string;
  last_name: string;
  image: string;
  rating: null | number;
  provider_type: "Business" | "Individual";
  account_type: string;
  bio: string;
  user_feedbacks_count: number;
  provider_completed_service_requests_count: number;
  provider_service_requests_count: number;
  provider_profile: IProviderProfile;

  verified_at: null | string;
  plans: IProviderPlan[];
}
interface IProviderPlan {
  id: number;
  title: string;
  price: string;
  type: string;
  duration: number;
  off: number;
  description: string;
}
interface IProvider extends IProviderBase {
  schedules: ISchedule[];
  portfolios: IPortfolio[];
  provider_services: IProviderService[];
  blocked_slots: IBlockedSlot[];
}
interface IProviderProfile {
  id: number;
  provider_id: number;
  hourly_rate: string | number;
  city: string;
  business_name: string | null;
  total_earn: string | number;
}

interface IProviderService {
  id: number;
  status: number;
  sub_service: {
    id: number;
    name: string;
  };
}
interface IPortfolio {
  id: number;
  provider_id: number;
  image: string;
  description: string;
}
interface ISchedule {
  id: number;
  provider_id: number;
  day: string;
  from_time: string;
  to_time: string;
  is_custom: number;
}

interface IBlockedSlot {
  date: string;
  from_time: string;
  to_time: string;
}
