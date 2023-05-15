import { useContext } from 'react';
import { rootStoreContext } from './user';

export const useStores = () => useContext(rootStoreContext);