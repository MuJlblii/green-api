import classNames from 'classnames';
import style from './message.module.css';
import {ReactComponent as MsgInIcon} from '../../assets/svg/msg-in.svg';
import {ReactComponent as MsgOutIcon} from '../../assets/svg/msg-out.svg';

interface IMessage {
    text: string,
    time: number,
    type?: 'in' | 'out'
}

const Message = ({time, text, type}: IMessage) => {
    const timestamp = new Date(time * 1000);

    return (
        <div className={
            classNames(style.wrapper, {
                [style.msg_in]: type === 'in',
                [style.msg_out]: type === 'out',
            })
        }>
            <div className={style.box}>
                <span className={classNames({[style.msg__icon_in]: type === 'in', [style.msg__icon_out]: type === 'out'})}>{type === 'in' ? <MsgInIcon /> : <MsgOutIcon />}</span>
                <div className={classNames(style.content, {
                    [style.content_in]: type === 'in',
                    [style.content_out]: type === 'out',
                })}>
                    <p className={style.msg}>{text}</p>
                    <p className={style.time}>
                        {timestamp.getHours()}:{timestamp.getMinutes() > 10 ? timestamp.getMinutes() : `0${timestamp.getMinutes()}`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Message;