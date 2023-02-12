import CommonInput, { CommonTextArea } from "components/input.common";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
export interface IWriteCommentData {
  comment: string;
  name: string;
  email: string;
}
export interface IWriteCommentProps {
  onSend: (value: IWriteCommentData) => void;
}

export default function WriteComment(props: IWriteCommentProps) {
  const { register, handleSubmit } = useForm<IWriteCommentData>();
  const submit = handleSubmit(
    (values) => {
      props.onSend(values);
    },
    (e) => {
      toast.error("Please fill empty fields");
    }
  );
  return (
    <div className="fare-card shadow-normal">
      <h1 className="mb-5 font-bold">Leave a Comment</h1>
      <div className="grid grid-cols-2 gap-x-8">
        <div className="col-span-2">
          <CommonTextArea
            label="Your Comment"
            placeholder="Enter your comment"
            {...register("comment", { required: true })}
          />
        </div>
        <div className="col-span-1">
          <CommonInput
            label="Name"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <CommonInput
            label="Email/Website"
            placeholder="Enter email or website"
            {...register("email", { required: true })}
          />
        </div>
        <div className="col-span-2">
          <button
            className="w-full fare-btn fare-btn-lg fare-btn-outline-primary hover:fare-btn-primary"
            onClick={submit}
          >
            <i className="fa fa-send mx-3"></i>Send
          </button>
        </div>
      </div>
    </div>
  );
}
