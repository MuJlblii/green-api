import { observer } from 'mobx-react-lite';
import style from './user-sidebar.module.css';
import { useStores } from '../../../store';
import UserCard from './user-card/user-card';
import Input from '../../input/input';
import { useState } from 'react';
import { ReactComponent as IconBackArrow } from '../../../assets/svg/arrow-back-white.svg';
import classNames from 'classnames';

const UserSidebar = observer(() => {
    const { messagesStore, userStore } = useStores();
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <div className={style.wrapper}>
            <div className={classNames(style.slider, {[style.slider_hidden]: userStore.isShowingSidebar, [style.slider_showing]: !userStore.isShowingSidebar})}>
                <div className={style.slider_header}>
                    <div className={style.slider_header_back}>
                        <IconBackArrow  onClick={() => userStore.setIsShowingSidebar()} className={style.btn}/>
                        <p>Новый чат</p>
                    </div>
                </div>
                <Input
                    onChangeHandler={setPhoneNumber}
                    type='number'
                    className={style.input}
                    placeholder='Введите номер телефона'
                    onKeyDown={(e) => {
                        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                            userStore.setCurrentIdChat(`${phoneNumber}@c.us`)
                            userStore.setIsShowingSidebar();
                            setPhoneNumber('');
                        }
                    }}
                />
            </div>
            {messagesStore.message.slice().reverse().map(el => (
                <UserCard
                    chatName={el?.chatName ? el.chatName : null}
                    message={el.messages[el.messages.length - 1]?.message ? el.messages[el.messages.length - 1]?.message : null}
                    timestamp={el.messages[el.messages.length - 1]?.timestamp ? el.messages[el.messages.length - 1]?.timestamp : null}
                    chatId={el.chatId}
                    key={el.chatId}
                />
            ))}
        </div>
    )
});

export default UserSidebar;