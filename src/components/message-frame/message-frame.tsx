import { useCallback, useEffect, useState } from 'react';
import { useStores } from '../../store';
import style from './message-frame.module.css';
import { observer } from 'mobx-react-lite';
import { IMessagesIn, IMessagesOut } from '../../store/messages';
import Message from '../message/message';
import Textarea from '../textarea/textarea';

const MessageFrame = observer(
    () => {
        const [time, ] = useState(10000);
        const {userStore: {idInstance, apiTokenInstance, currentIdChat}, messagesStore} = useStores();
        const messagesForRendering = messagesStore?.message?.filter((el) => el.chatId === currentIdChat );

        const updateMessage = useCallback((value: IMessagesIn) => {
            const exportMessage: IMessagesOut = {
                idMessage: value.body.idMessage,
                chatId: value.body.senderData.chatId,
                message: value.body.messageData?.textMessageData?.textMessage ? value.body.messageData.textMessageData.textMessage : value.body.messageData.extendedTextMessageData.text,
                timestamp: value.body.timestamp,
                type: value.body.messageData?.textMessageData?.textMessage ? 'in' : 'out'
            }
            const foundMsg = messagesStore.message.filter(el => el.chatId === exportMessage.chatId);
            const notFoundMsg = messagesStore.message.filter(el => el.chatId !== exportMessage.chatId);
            if (foundMsg.length > 0) {
                foundMsg[0].messages.push(exportMessage)
            } else {
                foundMsg.push({chatId: value.body.senderData.chatId, chatName: value.body.senderData.chatName, messages: [exportMessage]})
            }

            return ([...notFoundMsg, ...foundMsg]);
        }, [messagesStore.message])

        useEffect(() => {
            async function FetchData() {
                try {
                    const resp = await fetch(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`, {method: 'GET'});
                    if (resp.status === 200) {
                        const data = await resp.json();
                        if (data?.receiptId) {
                            await fetch(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${data.receiptId}`, {method: 'DELETE'});
                        }
                        if (data) {
                            const updatedData = updateMessage(data);
                            messagesStore.setMessage(updatedData);
                        }
                    }
                } catch (error) {
                    console.warn(error);
                }
            }
            const respInterval = setInterval(() => {
                FetchData();
            }, time);
            
            return () => clearInterval(respInterval);
        }, [apiTokenInstance, idInstance, messagesStore, time, updateMessage])

        return (
            <div className={style.wrapper}>
                <div className={style.wrapper_msg}>
                    {messagesForRendering && messagesForRendering[0]?.messages.map((element) => (
                        <Message text={element.message} time={element.timestamp} type={element.type} key={element.idMessage}/>
                    ))}
                </div>
                <Textarea />
            </div>
        )
    }
)

export default MessageFrame;