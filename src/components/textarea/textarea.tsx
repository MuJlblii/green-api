import { useRef, useState } from 'react';
import style from './textarea.module.css';
import { useStores } from '../../store';
import {ReactComponent as MsgSendIcon} from '../../assets/svg/msg-send.svg';
import {ReactComponent as MsgSmileIcon} from '../../assets/svg/msg-smile.svg';
import {ReactComponent as MsgFileIcon} from '../../assets/svg/msg-file.svg';

const Textarea = () => {
    const [text, setText] = useState('');
    const {userStore: {idInstance, apiTokenInstance, currentIdChat}} = useStores();
    const divRef = useRef<HTMLInputElement>(null);
    const onChangeHandler = (e: React.FormEvent<HTMLDivElement>) => {
        if (e.currentTarget.textContent) {
            setText(e.currentTarget.textContent);
        }
    }

    const sendData = async (text: string) => {
        const bodyMsg = {
            chatId: currentIdChat,
            message: text
        }
        await fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
            method: 'POST',
            body: JSON.stringify(bodyMsg)
        });
        if (divRef.current) {
            divRef.current.textContent = '';
        }
    }

    const enterHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            sendData(text);
        }
    }
    const submitHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        sendData(text);
    }

    return (
        <div className={style.wrapper}>
            <MsgSmileIcon className={style.btn} />
            <MsgFileIcon className={style.btn} />
            <div className={style.wrapper_input}>
                <div
                    ref={divRef}
                    contentEditable='true'
                    className={style.edit}
                    onInput={(e) => onChangeHandler(e)}
                    onKeyDown={(e) => enterHandler(e)}
                ></div>
            </div>
            <MsgSendIcon onClick={(e) => submitHandler(e)} className={style.btn}/>
        </div>
    )
}

export default Textarea;