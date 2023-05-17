import { makeAutoObservable } from "mobx";

export interface IMessagesIn {
    body: {
        idMessage: string,
        instanceData: {
            idInstance: number,
            typeInstance: string,
            wid: string
        }
        messageData: {
            textMessageData: {
                textMessage: string
            }
            extendedTextMessageData: {
                text: string
            }
        }
        senderData: {
            chatId: string,
            chatName: string,
            sender: string,
            senderName: string
        },
        timestamp: number,
        typeWebhook: string
    },
    receiptId: number
}

export interface IMessagesOut {
    idMessage: string,
    chatId: string,
    message: string,
    timestamp: number,
    type: 'in' | 'out',
}

export interface IMessages {
    chatId: string,
    chatName: string,
    messages: IMessagesOut[]
}

export class Messages {
    message: IMessages[];

    constructor() {
        makeAutoObservable(this);
        this.message = [];
    }

    setMessage = (value: IMessages[]) => {
        this.message = value
    }
}
