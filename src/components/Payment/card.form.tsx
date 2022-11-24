import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
} from "@stripe/react-stripe-js";
import {
  StripeCardNumberElement,
  StripeCardNumberElementOptions,
} from "@stripe/stripe-js";
import * as React from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface IPaymentCreditCardProps {
  register: UseFormRegister<ICreditCard>;
  setValue: UseFormSetValue<ICreditCard>;
}

export default function PaymentCreditCardForm(props: IPaymentCreditCardProps) {
  const { register, setValue } = props;
  const baseOptions = {
    showIcon: true,
    style: {
      base: {
        fontSize: "18px",
      },
    },
  };
  return (
    <form>
      <div className="grid grid-cols-2 w-[80rem] gap-8">
        <div className="common-input col-span-2">
          <label>Card Number</label>
          {/* <input
            type="text"
            {...register("number")}
            placeholder="Enter Card Number"
          /> */}
          <div className="p-4 bg-gray-100 rounded-2xl">
            <CardNumberElement
              options={{
                ...baseOptions,
                placeholder: "Enter Card Number",
              }}
            />
          </div>
        </div>
        <div className="common-input col-span-2">
          <label>Name on Card</label>
          <input
            className="font-[sans-serif] text-sm p-4"
            type="text"
            {...register("name")}
            placeholder="Name on card will appear here"
          />
        </div>
        <div className="common-input">
          <label>Expiry Date</label>
          {/* <input type="text" {...register("expDate")} placeholder="MM/YY" /> */}
          <div className="p-4 bg-gray-100 rounded-2xl">
            <CardExpiryElement options={baseOptions} />
          </div>
        </div>
        <div className="common-input">
          <label>Security Code</label>
          {/* <input type="text" {...register("cvv")} placeholder="CVV" /> */}
          <div className="p-4 bg-gray-100 rounded-2xl">
            <CardCvcElement options={baseOptions} />
          </div>
        </div>
      </div>
    </form>
  );
}
