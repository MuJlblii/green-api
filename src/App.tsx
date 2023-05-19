import React, { useEffect, useState } from 'react';
import Input from './components/input/input';
import { useStores } from './store';
import MessageSidebar from './components/sidebars/message-sidebar/message-sidebar';
import UserSidebar from './components/sidebars/user-sidebar/user-sidebar';
import Header from './components/header/header';
import style from './App.module.css';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
	const [api, setApi] = useState('');
	const [id, setId] = useState('');
	const { userStore } = useStores();
	const checkDataExist = userStore.idInstance && userStore.apiTokenInstance ? true : false;

	const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.stopPropagation();
		event.preventDefault();

		switch (true) {
			case api !== '' && id !== '':
				userStore.setApiTokenInstance(api);
				userStore.setIdInstanse(id);
				break;
			default:
				break;
		}
  	}

	useEffect(() => {
		if (userStore.idInstance && userStore.apiTokenInstance) {
		localStorage.setItem('idInstance', userStore.idInstance);
		localStorage.setItem('apiTokenInstance', userStore.apiTokenInstance);
		}
	}, [userStore.idInstance, userStore.apiTokenInstance])

	return (
		<div className={style.wrapper}>
			<div className={style.app_wrapper}>
				<div className={style.app}>

					{ !checkDataExist && 
						<form
						onSubmit={(e) => submitHandler(e)}
						autoComplete='true'
						className={style.form}
						>
						<Input typeOfData='id' placeholder='idInstance' onChangeHandler={setId}/>
						<Input typeOfData='api' placeholder='apiTokenInstance' onChangeHandler={setApi}/>
						<button type='submit' className={style.form_btn}>Войти</button>
						</form>
					}
					{ checkDataExist &&
						<>
							<div className={style.header}>
								<Header />
							</div>
							<div className={style.user}>
								<UserSidebar />
							</div>
							<div className={style.message}>
								<MessageSidebar />
							</div>
						</>
					}
				</div>
			</div>
		</div>
	);
})

export default App;
