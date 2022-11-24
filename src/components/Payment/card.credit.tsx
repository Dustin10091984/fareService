import clsx from "clsx";
import * as React from "react";
import CreditCard from "react-credit-cards";

export interface IPaymentCreditCardProps {
  card: IPaymentCard;
  onSelect: () => void;
  active: boolean;
}

export default function PaymentCreditCard(props: IPaymentCreditCardProps) {
  const { card, onSelect, active = false } = props;
  return (
    <div
      className={clsx([
        "relative",
        "rounded-[16px] w-min m-auto",
        { "shadow-lg": active },
      ])}
      onClick={onSelect}
    >
      {active && (
        <>
          <img
            src="/assets/img/check.svg"
            className="absolute -right-5 -top-5 z-20 w-[4.8rem]"
          />
          <span className="z-10 animate-pulse absolute inline-flex h-full w-full rounded-[16px] bg-[#ffffff50]"></span>
        </>
      )}
      <CreditCard
        name={"YOUR NAME HERE"}
        number={"**** **** **** " + card.last4}
        issuer={card.brand}
        preview={true}
        expiry={`${("0" + card.exp_month).slice(-2)}/${card.exp_year}`}
        cvc={"1111"}
      />
      {/* <img src="/assets/img/bank-card.svg" />
      <div className="p-[1.5rem] pb-[1.2rem] absolute left-0 right-0 top-0 bottom-0 d-flex flex-column text-white">
        <span className="text-white text-xs">DEBIT CARD</span>
        <span className="flex-grow-1"></span>
        <span className="text-white text-sm">{numberSections.join(" ")}</span>
        <div className="d-flex align-items-center">
          <span className="text-[1.6rem] flex-grow-1">{name}</span>
          <span className="text-[1.2rem] leading-tight">
            VALID
            <br />
            THRU
          </span>
          &ensp;
          <span className="text-[1.2rem]">{expDate}</span>
        </div>
      </div> */}
    </div>
  );
}
