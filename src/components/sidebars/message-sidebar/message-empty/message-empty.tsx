import style from './message-empty.module.css';
import {ReactComponent as IconEmpty} from '../../../../assets/svg/empty.svg';

const MessageEmpty = () => (
    <div className={style.wrapper}>
        <IconEmpty />
        <h1 className={style.title}>WhatsApp Web</h1>
        <p className={style.text}>Отправляйте и получайте сообщения без необходимости оставлять телефон подключенным.</p>
        <p className={style.text}>Используйте WhatsApp одновременно на четырех связанных устройствах и одном телефоне.</p>
    </div>
)

export default MessageEmpty