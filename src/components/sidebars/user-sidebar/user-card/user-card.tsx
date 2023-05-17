import style from './user-card.module.css';
import {ReactComponent as UserIcon} from '../../../../assets/svg/default-user.svg';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../store';

interface IUserCard {
    chatName: string | null,
    message: string | null,
    timestamp: number | null,
    chatId: string | null;
}

const UserCard = observer(({ chatName, message, timestamp, chatId}: IUserCard) => {
    const {userStore: {setCurrentIdChat, setCurrentNameChat}} = useStores();
    const time = timestamp ? new Date(timestamp * 1000) : null;
    const timeMsg = time ? `${time.getHours()}:${time.getMinutes() > 10 ? time.getMinutes() : `0${time.getMinutes()}`}` : null;

    return (
        <div className={style.wrapper} onClick={() => {
            if (chatId) setCurrentIdChat(chatId);
            if (chatName) setCurrentNameChat(chatName);
            }
        }>
            <span>
                <UserIcon width={49} height={49}/> 
            </span>
            <div className={style.content}>
                <p className={style.chatName}>{chatName}</p>
                <p className={style.time}>{timeMsg}</p>
                <p className={style.msg}>{message}</p>
            </div>
        </div>
    )
})

export default UserCard