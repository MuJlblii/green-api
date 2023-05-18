import style from './header.module.css';
import {ReactComponent as UserIcon} from '../../assets/svg/default-user.svg';
import {ReactComponent as MsgIcon} from '../../assets/svg/msg-new.svg';
import {ReactComponent as GroupIcon} from '../../assets/svg/header-group.svg';
import {ReactComponent as StatusIcon} from '../../assets/svg/header-status.svg';
import {ReactComponent as OptionsIcon} from '../../assets/svg/header-options.svg';
import {ReactComponent as SearchIcon} from '../../assets/svg/header-search.svg';
import { useStores } from '../../store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';


const Header = observer(() => {
    const { userStore, messagesStore} = useStores();

    useEffect(() => {
        if (!userStore.currentNameChat && userStore.currentIdChat && messagesStore.message.length > 0) {
            userStore.setCurrentNameChat(messagesStore.message.filter((el) => el.chatId === userStore.currentIdChat)[0].chatName);
        }
    }, [messagesStore.message, userStore]);

    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_user}>
                <UserIcon width={40} height={40} className={style.btn} />
                <div className={style.btns}>
                    <GroupIcon className={style.btn} />
                    <StatusIcon className={style.btn} />
                    <MsgIcon className={style.btn} onClick={() => userStore.setIsShowingSidebar()}/>
                    <OptionsIcon className={style.btn} />
                </div>
            </div>
            {userStore.currentIdChat && 
                <div className={style.wrapper_msg}>
                    <div className={style.btns}>
                        <UserIcon width={40} height={40} className={style.btn} />
                        <p className={style.btn}>
                            {userStore.currentNameChat ? userStore.currentNameChat : userStore.currentIdChat?.slice(0,-5)}
                        </p>
                    </div>
                    <div className={style.btns}>
                        <SearchIcon className={style.btn} />
                        <OptionsIcon
                            className={style.btn}
                            onClick={() => {
                                userStore.setApiTokenInstance('');
                                userStore.setIdInstanse('');
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    )
})

export default Header;