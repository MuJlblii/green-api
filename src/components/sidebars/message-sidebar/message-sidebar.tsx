import MessageFrame from '../../message-frame/message-frame';
import style from './message-sidebar.module.css';
import MessageEmpty from './message-empty/message-empty';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../store';

const MessageSidebar = observer(() => {
    const {userStore: {currentIdChat}} = useStores()

    return (
        <div className={style.wrapper}>
            {currentIdChat && <MessageFrame />}
            {!currentIdChat && <MessageEmpty />}
        </div>
    )
})

export default MessageSidebar