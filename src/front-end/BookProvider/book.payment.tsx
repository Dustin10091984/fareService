import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RadioBoxButton from "../../components/button.radio";
import PaymentCreditCardForm from "../../components/Payment/card.form";
import PaymentCreditCard from "../../components/Payment/card.credit";
import { methods } from "underscore";
import CreditCard from "react-credit-cards";
import {
  CardElement,
  CardNumberElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  addPaymentCard,
  getPaymentCards,
  IPaymentSliceState,
} from "../../store/Slices/payments/paymentSlice";
import { RootState } from "../../store";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import BookSubscriptionPlan from "./book.plan";
export interface IBookPaymentMethodProps
  extends IBookSliderProps,
    IServiceRequestHourly {
  provider: IProviderBase;
  onNext: (value: {
    plan_id?: number;
    card_id?: string;
    payMethod: "Card" | "Paypal";
  }) => void;
}

type PaymentStagesType =
  | "SelectMethod"
  | "SelectCard"
  | "AddCard"
  | "SelectPlan";

export default function BookPaymentMethod(props: IBookPaymentMethodProps) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { onNext, onPrev, provider, checkoutPlan } = props;

  const paymentStates = useSelector<RootState, IPaymentSliceState>(
    (state) => state.paymentReducer
  );
  const paymentCards = paymentStates.list?.data?.data ?? [];

  const [payMethod, setPayMethod] = React.useState<"Card" | "Paypal">();
  const [selectedCard, setSelectedCard] = React.useState(-1);
  const [stage, setStage] = React.useState<PaymentStagesType>(() =>
    checkoutPlan ? "SelectPlan" : "SelectMethod"
  ); // 0 for initial, 1 for main
  const [planId, setPlanId] = useState<number>(null);
  //const [isAdding, setIsAdding] = React.useState(false); //paymentCards.length == 0);

  const { register, getValues, setValue } = useForm<ICreditCard>();
  const showAddCardForm = stage == "AddCard"; //stage == 1 && isAdding && payMethod == "Card";
  const isNextDisabled =
    !payMethod || (stage === "SelectCard" && !paymentCards[selectedCard]);

  useEffect(() => {
    dispatch(getPaymentCards());
  }, []);

  const addCreditCard = async () => {
    const { error, token } = await stripe.createToken(
      elements.getElement(CardNumberElement)
    );
    if (token) {
      await dispatch(addPaymentCard({ token: token.id }));
      return token;
      //setIsAdding(false);
    }
    if (error) {
      toast.error(error.message);
    }
    return false;
  };
  if (stage == "SelectPlan")
    return (
      <BookSubscriptionPlan
        provider={provider}
        prevLabel="Back"
        onPrev={onPrev}
        onNext={({ plan_id }) => {
          setPlanId(plan_id);
          setStage("SelectMethod");
        }}
      />
    );
  return (
    <div className="d-flex flex-column items-center gap-8">
      <span className="font-medium text-3xl">Payment Method</span>
      <div className="d-flex gap-8">
        <RadioBoxButton
          checked={payMethod == "Card"}
          onChange={() => {
            setPayMethod("Card");
          }}
          text={
            <span className="d-flex items-center justify-between w-[30rem]">
              Debit/Credit Card <img src="/assets/img/payment-card.png" />
            </span>
          }
        />

        <RadioBoxButton
          checked={payMethod == "Paypal"}
          onChange={() => {
            setPayMethod("Paypal");
            setStage("SelectMethod");
          }}
          text={
            <span className="d-flex items-center justify-between w-[30rem]">
              Paypal <img src="/assets/img/payment-paypal.png" />
            </span>
          }
        />
      </div>
      {showAddCardForm && <PaymentCreditCardForm {...{ register, setValue }} />}
      {stage == "SelectCard" && (
        <div className="grid grid-cols-2 gap-8 p-8 rounded-[32px] border w-[80rem] items-center">
          {paymentCards.map((card, index) => {
            return (
              <PaymentCreditCard
                key={card.id}
                card={card}
                active={index == selectedCard}
                onSelect={() => {
                  setSelectedCard(index);
                }}
              />
            );
          })}
          <button
            className="fare-btn fare-btn-default w-[16rem] m-auto"
            onClick={() => {
              //setIsAdding(true);
              setStage("AddCard");
            }}
          >
            <i className="fa fa-plus mr-1"></i> Add new card
          </button>
        </div>
      )}
      <div className="gap-8 d-flex">
        {
          <button
            className="fare-btn fare-btn-default fare-btn-lg"
            onClick={() => {
              if (stage == "SelectCard") {
                setStage("SelectMethod");
              } else if (stage == "AddCard") {
                setStage("SelectCard");
              } else {
                onPrev && onPrev();
              }
            }}
          >
            Previous
          </button>
        }
        <button
          className="fare-btn fare-btn-primary fare-btn-lg"
          onClick={async () => {
            if (stage == "SelectMethod") {
              if (payMethod == "Paypal") {
                onNext && onNext({ payMethod, plan_id: planId });
                return;
              } else if (payMethod == "Card") {
                setStage("SelectCard");
              }
            } else if (stage == "AddCard") {
              //setCreditCards([...creditCards, getValues()]);
              if (await addCreditCard()) {
                //setIsAdding(false);
                setStage("SelectCard");
              }
            } else if (stage == "SelectCard") {
              onNext &&
                onNext({
                  card_id: paymentCards[selectedCard]?.id,
                  payMethod: "Card",
                  plan_id: planId,
                });
            }
          }}
          disabled={isNextDisabled}
        >
          Next
        </button>
      </div>
    </div>
  );
}
