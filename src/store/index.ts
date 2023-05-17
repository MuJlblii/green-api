import { createContext, useContext } from 'react';
import { User } from './user';
import { Messages } from './messages';

const rootStoreContext = createContext({
    userStore: new User(),
    messagesStore: new Messages()
  });

export const useStores = () => useContext(rootStoreContext);