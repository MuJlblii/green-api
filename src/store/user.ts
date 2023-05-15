import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class User {
    idInstance;
    apiTokenInstance;

    constructor() {
        makeAutoObservable(this);
        this.idInstance = '';
        this.apiTokenInstance = '';
    }

    setIdInstanse = (value: string) => {
        this.idInstance = value;
    }
    
    setApiTokenInstance = (value: string) => {
        this.apiTokenInstance = value;
    }
}



export const rootStoreContext = createContext({
  userStore: new User()
});