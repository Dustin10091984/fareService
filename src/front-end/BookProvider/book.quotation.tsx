import * as React from "react";
import { Field, FieldValues, useForm, UseFormGetValues } from "react-hook-form";

interface IQuotation {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface IBookQuotationFormRef {
  getValues: UseFormGetValues<FieldValues>;
}
export interface IBookQuotationFormProps {
  onPrev?: () => void;
  onNext?: (value: FieldValues) => void;
}

export default React.forwardRef<IBookQuotationFormRef, IBookQuotationFormProps>(
  (props, ref) => {
    const { register, getValues, setValue } = useForm();
    const { onPrev, onNext } = props;

    if (ref) {
      if (typeof ref === "object") {
        ref.current = { getValues };
      } else ref({ getValues });
    }

    console.log("React Quotation Form", "refresh");
    return (
      <div className="d-flex flex-column items-center gap-8">
        <span className="font-medium text-3xl">Quotation form </span>
        <form>
          <div className="grid grid-cols-2 w-[72rem] gap-8">
            <div className="common-input">
              <label>First Name</label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="Enter first name"
              />
            </div>
            <div className="common-input">
              <label>Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Enter last name"
              />
            </div>
            <div className="common-input">
              <label>Email</label>
              <input
                type="text"
                {...register("email")}
                placeholder="Enter email"
              />
            </div>
            <div className="common-input">
              <label>Phone Number</label>
              <input
                type="text"
                {...register("phoneNumber")}
                placeholder="Enter phone number"
              />
            </div>
            <div className="common-input col-span-2">
              <label>Address</label>
              <input
                type="text"
                {...register("address")}
                placeholder="Enter home address"
              />
            </div>
            <div className="common-input col-span-2">
              <label>Description</label>
              <textarea
                {...register("description")}
                placeholder="Enter work description"
              ></textarea>
            </div>
          </div>
        </form>
        <div className="gap-8 d-flex">
          {onPrev && (
            <button
              className="fare-btn fare-btn-default fare-btn-lg"
              onClick={onPrev}
            >
              Previous
            </button>
          )}
          <button
            className="fare-btn fare-btn-primary fare-btn-lg"
            onClick={() => {
              onNext(getValues());
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
);
