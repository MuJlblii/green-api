import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import style from './input.module.css';

interface InputType extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
    type: 'api' | 'id';
    onChangeHandler: React.Dispatch<React.SetStateAction<string>>;
    children?: ReactNode;
}

const Input = ({type, onChangeHandler, ...props} : InputType): JSX.Element => {

    return (
        <input
            type='text'
            onChange={(e) => onChangeHandler(e.currentTarget.value)}
            className={style.input}
            {...props}
        />
    )
}

export default Input;