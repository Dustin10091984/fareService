import * as React from "react";
import { Field, FieldValues, useForm, UseFormGetValues } from "react-hook-form";
import { useDropzone } from "react-dropzone";
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
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
      // Disable click and keydown behavior
      noClick: true,
      noKeyboard: true,
    });

    const { onPrev, onNext } = props;

    if (ref) {
      if (typeof ref === "object") {
        ref.current = { getValues };
      } else ref({ getValues });
    }

    const files = (
      <ul>
        {acceptedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    );
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

              <div
                {...getRootProps({ className: "dropzone" })}
                className="flex flex-col items-center gap-6 mt-3 border-primary-main border-[1px] p-6 border-dashed rounded-[2rem] text-gray-600 col-span-2"
              >
                <input {...getInputProps()} />
                <h2 className="text-base mb-1">
                  Attachment <span className="text-gray-400">(Optional)</span>
                </h2>
                {acceptedFiles.length ? (
                  files
                ) : (
                  <p>
                    Upload your item files here e.g Photo, Video, recording, doc
                    etc..
                  </p>
                )}
                <button
                  type="button"
                  onClick={open}
                  className="fare-btn fare-btn-default"
                >
                  <i className="la la-plus"></i>&ensp;Upload files
                </button>
              </div>
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
              onNext({
                ...getValues(),
                files: acceptedFiles,
              });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
);
