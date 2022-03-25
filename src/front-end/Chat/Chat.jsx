import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatList } from "../../store/Slices/chat/chatlistSclice";
import {
    messageList,
    clearMessages,
    addMessage,
} from "../../store/Slices/chat/messageListSclice";
import { sendMessage } from "../../store/Slices/chat/messageSlice";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    ConversationList,
    Sidebar,
    Conversation,
    ConversationHeader,
    Button,
    InfoButton,
    MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import moment from "moment";
import { HOST } from "./../../constants";

export const Chat = ({ isChatOpen, ...props }) => {
    const image = "/assets/img/Profile_avatar.png";
    const { notification } = props;
    const [state, setState] = useState({
        providers: null,
        orders: null,
        provider_id: null,
    });
    const [messageInputValue, setMessageInputValue] = useState("");
    const [loadingMore, setLoadingMore] = useState(false);
    const [sending, setSending] = useState(false);
    const [tempMsg, setTempMsg] = useState("");

    const [active, setActive] = useState();

    const [newMsg, setNewMsg] = useState();

    if (window.Echo && active?.userId) {
        window.Echo.channel(
            `newMessage-${active.userId}-${
                JSON.parse(localStorage?.user_data)?.id
            }`
        ).listen("MessageEvent", (data) => {
            setNewMsg(data.message);
        });
    }
    useEffect(() => {
        if ((newMsg, isChatOpen == true)) {
            dispatch(addMessage(newMsg));
        }
    }, [newMsg]);

    useEffect(() => {
        if(notification?.fcmMessageId){
            setActive((prev) => ({
                ...prev,
                userId: notification?.data?.sender_id,
                orderId: notification?.data?.service_request_id,
            }));
        }
    }, [notification?.fcmMessageId]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isChatOpen == true) {
            setState({
                providers: null,
                orders: null,
                provider_id: null,
            });
            setActive();
            dispatch(chatList());
        }
    }, [isChatOpen]);

    const loading = useSelector((state) => state?.chatlistReducer?.loading);
    const list = useSelector((state) => state?.chatlistReducer?.data);
    const error = useSelector((state) => state?.chatlistReducer?.error);
    const message = useSelector((state) => state?.chatlistReducer?.message);

    const messageLoading = useSelector(
        (state) => state?.messageListReducer?.loading
    );
    const messagesdata = useSelector(
        (state) => state?.messageListReducer?.data
    );
    const MessageError = useSelector(
        (state) => state?.messageListReducer?.error
    );
    const listMessage = useSelector(
        (state) => state?.messageListReducer?.message
    );

    const msgLoading = useSelector((state) => state?.messageReducer?.loading);
    const msgdata = useSelector((state) => state?.messageReducer?.data);
    const msgError = useSelector((state) => state?.messageReducer?.error);
    const msg = useSelector((state) => state?.messageReducer?.message);

    useEffect(() => {
        var resArr = [];
        list?.filter((item) => {
            var i = resArr.findIndex((x) => x.provider_id == item.provider_id);
            if (i <= -1) {
                resArr.push(item);
            }
            return null;
        });
        setState({ ...state, providers: resArr });
    }, [list]);

    // console.log(state);

    const handleClickChat = (data) => {
        setActive((active) => ({
            ...active,
            userId: data?.provider?.id,
            orderId: data?.id,
            name: data?.provider?.first_name,
            image: data?.provider?.image,
            is_completed: data?.is_completed,
        }));
        if (
            active?.userId != data?.provider?.id ||
            active.orderId != data?.id
        ) {
            dispatch(
                messageList({ id: data?.provider?.id, orderId: data?.id })
            );
            dispatch(clearMessages(""));
        }
    };

    const handleSendMessage = () => {
        setMessageInputValue("");
        setSending(true);
        dispatch(
            sendMessage({
                message: messageInputValue,
                receiver_id: active.userId,
                service_request_id: active.orderId,
            })
        );
    };

    const onYReachStart = async () => {
        if (messageLoading == false) {
            if ((active?.userId, active?.orderId)) {
                setLoadingMore(true);
                dispatch(
                    messageList({
                        id: active?.userId,
                        orderId: active?.orderId,
                        page: messagesdata?.current_page + 1,
                    })
                );
            }
            // dispatch(messageList({id: active?.userId, nextPage: messagesdata?.current_page+1, orderId: active?.orderId}));
            // setLoadingMore(true);
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
    };

    return (
        <div className="">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div
                            style={{
                                height: "60vh",
                                position: "relative",
                            }}
                        >
                            <MainContainer responsive>
                                <Sidebar position="left" scrollable={true}>
                                    <div
                                        className="text-center font-weight-bold"
                                        style={{
                                            backgroundColor: "#f6fbff",
                                            borderBottom: "1px solid #e6e6e6",
                                        }}
                                    >
                                        List
                                    </div>
                                    {/* <Search placeholder="Search..." /> */}
                                    {state?.provider_id != null && (
                                        <Button
                                            className="mt-1 mb-2"
                                            border
                                            icon={
                                                <i
                                                    className="fa fa-arrow-left mr-1"
                                                    aria-hidden="true"
                                                >
                                                    {" "}
                                                </i>
                                            }
                                            labelPosition="right"
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    provider_id: null,
                                                });
                                                setActive();
                                            }}
                                        >
                                            {" "}
                                            Go Back
                                        </Button>
                                    )}
                                    <ConversationList loading={loading}>
                                        {(() => {
                                            if (state?.provider_id == null) {
                                                return state?.providers?.map(
                                                    (data, index) => (
                                                        <Conversation
                                                            key={index}
                                                            name={`${data?.provider?.first_name} ${data?.provider?.last_name}`}
                                                            // lastSenderName={
                                                            //     data?.provider
                                                            //         ?.last_name
                                                            // }
                                                            info={moment(
                                                                data?.create_at
                                                            ).format("LLL")}
                                                            onClick={() =>
                                                                setState({
                                                                    ...state,
                                                                    provider_id:
                                                                        data
                                                                            ?.provider
                                                                            ?.id,
                                                                })
                                                            }
                                                        >
                                                            <Avatar
                                                                src={
                                                                    (data
                                                                        ?.provider
                                                                        ?.image &&
                                                                        `${HOST}${data?.provider?.image}`) ||
                                                                    image
                                                                }
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.src =
                                                                        image;
                                                                }}
                                                                name="Lilly"
                                                                // status="available"
                                                            />
                                                        </Conversation>
                                                    )
                                                );
                                            }

                                            return list?.map(
                                                (serviceRequest, index) => {
                                                    if (
                                                        serviceRequest?.provider
                                                            ?.id ==
                                                        state?.provider_id
                                                    ) {
                                                        return serviceRequest
                                                            ?.provider?.id ==
                                                            active?.userId &&
                                                            serviceRequest?.id ==
                                                                active?.orderId ? (
                                                            <Conversation
                                                                key={index}
                                                                name={
                                                                    serviceRequest
                                                                        ?.provider
                                                                        ?.first_name
                                                                        ? `${
                                                                              serviceRequest
                                                                                  ?.provider
                                                                                  ?.first_name ||
                                                                              serviceRequest?.type
                                                                          } Order #${
                                                                              serviceRequest.id
                                                                          }`
                                                                        : "NAN"
                                                                }
                                                                lastSenderName={
                                                                    serviceRequest
                                                                        ?.provider
                                                                        ?.first_name
                                                                        ? serviceRequest
                                                                              ?.provider
                                                                              ?.first_name
                                                                        : "NAN"
                                                                }
                                                                info={
                                                                    serviceRequest
                                                                        ?.message
                                                                        ?.message
                                                                        ? serviceRequest
                                                                              ?.message
                                                                              ?.message
                                                                        : "NAN"
                                                                }
                                                                onClick={() =>
                                                                    handleClickChat(
                                                                        serviceRequest
                                                                    )
                                                                }
                                                                active
                                                            >
                                                                <Avatar
                                                                    src={
                                                                        serviceRequest
                                                                            ?.provider
                                                                            ?.image
                                                                            ? `${HOST}${serviceRequest?.provider?.image}`
                                                                            : image
                                                                    }
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        e.target.src =
                                                                            image;
                                                                    }}
                                                                    name="Lilly"
                                                                    // status="available"
                                                                />
                                                            </Conversation>
                                                        ) : (
                                                            <Conversation
                                                                key={index}
                                                                name={
                                                                    serviceRequest
                                                                        ?.provider
                                                                        ?.first_name
                                                                        ? `${
                                                                              serviceRequest
                                                                                  ?.provider
                                                                                  ?.first_name ||
                                                                              serviceRequest?.type
                                                                          } Order #${
                                                                              serviceRequest.id
                                                                          }`
                                                                        : "NAN"
                                                                }
                                                                lastSenderName={
                                                                    serviceRequest
                                                                        ?.provider
                                                                        ?.first_name
                                                                        ? serviceRequest
                                                                              ?.provider
                                                                              ?.first_name
                                                                        : "NAN"
                                                                }
                                                                info={
                                                                    serviceRequest
                                                                        ?.message
                                                                        ?.message
                                                                        ? serviceRequest
                                                                              ?.message
                                                                              ?.message
                                                                        : "NAN"
                                                                }
                                                                onClick={() =>
                                                                    handleClickChat(
                                                                        serviceRequest
                                                                    )
                                                                }
                                                            >
                                                                <Avatar
                                                                    src={
                                                                        serviceRequest
                                                                            ?.provider
                                                                            ?.image
                                                                            ? `${HOST}${serviceRequest?.provider?.image}`
                                                                            : image
                                                                    }
                                                                    name="Lilly"
                                                                    onError={(
                                                                        e
                                                                    ) => {
                                                                        e.target.src =
                                                                            image;
                                                                    }}
                                                                    // status="available"
                                                                />
                                                            </Conversation>
                                                        );
                                                    }
                                                }
                                            );
                                        })()}
                                    </ConversationList>
                                </Sidebar>

                                <ChatContainer>
                                    <ConversationHeader>
                                        <ConversationHeader.Back />
                                        <Avatar
                                            src={
                                                active?.image
                                                    ? `${HOST}${active.image}`
                                                    : image
                                            }
                                            name={
                                                active?.name
                                                    ? `${active?.name} Order #${active?.orderId}`
                                                    : "NAN"
                                            }
                                            onError={(e) => {
                                                e.target.src = image;
                                            }}
                                        />
                                        <ConversationHeader.Content
                                            userName={
                                                active?.name
                                                    ? `${active?.name} Order #${active?.orderId}`
                                                    : "Please Select a Chat"
                                            }
                                            // info="Active 10 mins ago"
                                        />
                                        <ConversationHeader.Actions>
                                            {/* <VoiceCallButton />
                                    <VideoCallButton /> */}
                                            <InfoButton />
                                        </ConversationHeader.Actions>
                                    </ConversationHeader>
                                    {(() => {
                                        let nextPage = false;
                                        if (
                                            messagesdata?.current_page <
                                            messagesdata?.last_page
                                        ) {
                                            nextPage = true;
                                        }
                                        if (active?.userId && active?.orderId) {
                                            return (
                                                <MessageList
                                                    loading={
                                                        messageLoading ==
                                                            true &&
                                                        messagesdata?.data ==
                                                            undefined
                                                            ? true
                                                            : false
                                                    }
                                                    loadingMore={
                                                        messageLoading ||
                                                        (MessageError == true &&
                                                            false)
                                                    }
                                                    onYReachStart={
                                                        (messageLoading ==
                                                            false &&
                                                            nextPage == true &&
                                                            onYReachStart) ||
                                                        undefined
                                                    }
                                                >
                                                    {messagesdata?.current_page ==
                                                        messagesdata?.last_page &&
                                                        messagesdata?.data && (
                                                            <MessageSeparator content="End" />
                                                        )}
                                                    {messagesdata &&
                                                        localStorage.user_data &&
                                                        messagesdata?.data?.map(
                                                            (
                                                                message,
                                                                index
                                                            ) => (
                                                                <Message
                                                                    key={index}
                                                                    model={{
                                                                        message:
                                                                            message?.message,
                                                                        // sentTime: "15 mins ago",
                                                                        sender: message
                                                                            ?.sender
                                                                            ?.first_name,
                                                                        direction:
                                                                            JSON.parse(
                                                                                localStorage?.user_data
                                                                            )
                                                                                ?.id ==
                                                                            message?.sender_id
                                                                                ? "outgoing"
                                                                                : "incoming",
                                                                        // position: "single"
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    {sending && msgLoading && (
                                                        <MessageSeparator content="Sending" />
                                                    )}
                                                </MessageList>
                                            );
                                        }
                                    })()}
                                    <MessageInput
                                        placeholder={
                                            active?.is_completed == true
                                                ? "Order Completed"
                                                : sending && msgLoading
                                                ? "Sending"
                                                : "Type message here"
                                        }
                                        value={messageInputValue}
                                        onChange={(val) => {
                                            setMessageInputValue(val);
                                            setTempMsg(val);
                                        }}
                                        onSend={() => handleSendMessage()}
                                        autoFocus
                                        disabled={
                                            (sending && msgLoading) ||
                                            !active?.userId ||
                                            !active?.orderId ||
                                            active?.is_completed == true
                                        }
                                        attachButton={false}
                                    />
                                </ChatContainer>
                            </MainContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
