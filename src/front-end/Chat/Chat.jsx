import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { chatList } from '../../store/Slices/chat/chatlistSclice';
import { messageList, clearMessages } from '../../store/Slices/chat/messageListSclice';
import { 
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    ConversationList,
    Sidebar,
    Search,
    Conversation,
    ConversationHeader,
    VoiceCallButton,
    VideoCallButton,
    InfoButton,
    TypingIndicator,
    MessageSeparator,
    ExpansionPanel,
    Loader
    
} from '@chatscope/chat-ui-kit-react';
import { Loading } from "../common/Loading";
import { delay } from "lodash";
    
export const Chat = (props) => {

    const image = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

    const [messageInputValue, setMessageInputValue] = useState("");
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedMessages, setLoadedMessages] = useState([]);
    const [counter, setCounter] = useState(0)
    
    const [active, setActive] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(chatList())
    }, [])

    useEffect(() => {
        // console.log(active);
    })
    const loading = useSelector((state) => state?.chatlistReducer?.loading);
    const list = useSelector((state) => state?.chatlistReducer?.data);
    const error = useSelector((state) => state?.chatlistReducer?.error);
    const message = useSelector((state) => state?.chatlistReducer?.message);
    
    const messageLoading = useSelector((state) => state?.messageListReducer?.loading);
    const messagesdata = useSelector((state) => state?.messageListReducer?.data);
    const MessageError = useSelector((state) => state?.messageListReducer?.error);
    const listMessage = useSelector((state) => state?.messageListReducer?.message);

    const handleClickChat = (data) => {
        setActive((active) => ({ 
            ...active,
            userId: data?.provider?.id,
            orderId: data?.id,
            name:data?.provider?.first_name,
            image:data?.provider?.image
        }));
        if(active?.userId != data?.provider?.id || active.orderId != data?.id){
            dispatch(messageList(data?.provider?.id));
            dispatch(clearMessages(""));
        }
    }

    const handleSendMessage = () => {
        setMessageInputValue('');

    }

    const onYReachStart = async () => {
        if(messageLoading == false){
            if(active?.userId)
            dispatch(messageList(active?.userId));
            setLoadingMore(true);
        }
        await new Promise(resolve => setTimeout(resolve, 3000)); 
    };

    return (
        <div className="dashborad-box order-history sticky-top p-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div style={{
                            height: "600px",
                            position: "relative"
                        }}>
                            <MainContainer responsive>
                                <Sidebar position="left" scrollable={true}>
                                <Search placeholder="Search..." />
                                <ConversationList loading={loading}>
                                        {list?.map(((serviceRequest, index) => (

                                                <React.Fragment key = {index}>
                                                    {serviceRequest?.provider?.id == active?.userId && serviceRequest?.id == active?.orderId ? (
                                                        <Conversation
                                                            name={serviceRequest?.provider?.first_name ? serviceRequest?.provider?.first_name :'NAN'}
                                                            lastSenderName={serviceRequest?.provider?.first_name ? serviceRequest?.provider?.first_name : "NAN"} 
                                                            info={serviceRequest?.message?.message ? serviceRequest?.message?.message : "NAN"}
                                                            onClick={() => handleClickChat(serviceRequest)}
                                                            active
                                                        >
                                                        <Avatar
                                                            src={serviceRequest?.provider?.image ? serviceRequest?.provider?.image : image}
                                                            name="Lilly"
                                                            status="available"
                                                        />
                                                        </Conversation>
                                                    ) : (
                                                        <Conversation
                                                            name={serviceRequest?.provider?.first_name ? serviceRequest?.provider?.first_name :'NAN'}
                                                            lastSenderName={serviceRequest?.provider?.first_name ? serviceRequest?.provider?.first_name : "NAN"} 
                                                            info={serviceRequest?.message?.message ? serviceRequest?.message?.message : "NAN"}
                                                            onClick={() => handleClickChat(serviceRequest)}
                                                        >
                                                        <Avatar
                                                            src={serviceRequest?.provider?.image ? serviceRequest?.provider?.image : image}
                                                            name="Lilly"
                                                            status="available"
                                                        />
                                                        </Conversation>
                                                    )}
                                                </React.Fragment>
                                        )))
                                                    }
                                    </ConversationList>
                                </Sidebar>

                                <ChatContainer>
                                <ConversationHeader>
                                    <ConversationHeader.Back />
                                    <Avatar src={active?.image ? active.image : image} name={active?.name ? active?.name : "NAN"} />
                                    <ConversationHeader.Content
                                        userName={active?.name}
                                        // info="Active 10 mins ago"
                                    />
                                    <ConversationHeader.Actions>
                                    {/* <VoiceCallButton />
                                    <VideoCallButton /> */}
                                    <InfoButton />
                                    </ConversationHeader.Actions>          
                                </ConversationHeader>
                                <MessageList 
                                    loading={messageLoading == true && messagesdata?.data == undefined ? true : false }
                                    loadingMore={messageLoading} onYReachStart={messageLoading == false ? onYReachStart : ""}
                                >
                                    {loadedMessages}
                                    {(messagesdata && localStorage.user_data) && 
                                        (messagesdata?.data?.map(((message,index)=>
                                            <Message key={index} model={{
                                                message: message.message,
                                                // sentTime: "15 mins ago",
                                                sender: message.sender.first_name,
                                                direction: JSON.parse(localStorage.user_data).id == message.sender_id ? "outgoing" : 'incoming',
                                                // position: "single"
                                            }}/>
                                        )))
                                    }
                                </MessageList>
                                <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={() => handleSendMessage()} />
                                </ChatContainer>
                                
                                {/* <Sidebar position="right">
                                    <ExpansionPanel open title="INFO">
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    </ExpansionPanel>
                                    <ExpansionPanel title="LOCALIZATION">
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    </ExpansionPanel>
                                    <ExpansionPanel title="MEDIA">
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    </ExpansionPanel>
                                    <ExpansionPanel title="SURVEY">
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    </ExpansionPanel>
                                    <ExpansionPanel title="OPTIONS">
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    <p>Lorem ipsum</p>
                                    </ExpansionPanel>
                                </Sidebar> */}
                            </MainContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


 {/* <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                                    <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Joe" status="dnd" />
                                    </Conversation> */}
                                    
                                    {/* <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                                    <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Emily" status="available" />
                                    </Conversation>
                                    
                                    <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                                    <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Kai" status="unavailable" />
                                    </Conversation>

                                    <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                                    <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Akane" status="eager" />
                                    </Conversation>

                                    <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                                    <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Eliot" status="away" />
                                    </Conversation>

                                    <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
                                    <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Zoe" status="dnd" />
                                    </Conversation>
                                    
                                    <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                                    <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpghttps://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Patrik" status="invisible" />
                                    </Conversation> */}


                                     {/* <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Zoe",
                                            direction: "incoming",
                                            position: "single"
                                        }}>
                                        <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Zoe" />
                                        </Message>
                                        
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Patrik",
                                            direction: "outgoing",
                                            position: "single"
                                        }} /> */}
                                        {/* <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Zoe",
                                            direction: "incoming",
                                            position: "first"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Zoe",
                                            direction: "incoming",
                                            position: "normal"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Zoe",
                                            direction: "incoming",
                                            position: "normal"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Zoe",
                                            direction: "incoming",
                                            position: "last"
                                        }}>
                                        <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Zoe" />
                                        </Message>
                                        
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Patrik",
                                            direction: "outgoing",
                                            position: "first"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Patrik",
                                            direction: "outgoing",
                                            position: "normal"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Patrik",
                                            direction: "outgoing",
                                            position: "normal"
                                        }} />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Patrik",
                                            direction: "outgoing",
                                            position: "last"
                                        }} />
                                        
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Zoe",
                                            direction: "incoming",
                                            position: "first"
                                        }} avatarSpacer />
                                        <Message model={{
                                            message: "Hello my friend",
                                            sentTime: "15 mins ago",
                                            sender: "Zoe",
                                            direction: "incoming",
                                            position: "last"
                                        }}>
                                            <Avatar src={"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} name="Zoe" />
                                        </Message> */}