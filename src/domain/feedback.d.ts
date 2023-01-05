interface IFeedback {
  id: number;
  rating: number;
  provider_id: number;
  for_user_id: number;
  comment: string;
  created_at: string;
  user?: IUser;
}
