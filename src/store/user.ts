import { makeAutoObservable } from "mobx";

export class User {
    idInstance;
    apiTokenInstance;
    currentIdChat: string | null;
    currentNameChat: string | null;
    isShowingSidebar;

    constructor() {
        makeAutoObservable(this);
        this.apiTokenInstance = '';
        this.idInstance = '';
        if (localStorage.getItem('apiTokenInstance') !== null) {
            this.apiTokenInstance = localStorage.getItem('apiTokenInstance');
        } 
        if (localStorage.getItem('idInstance') !== null) {
            this.idInstance = localStorage.getItem('idInstance');
        }
        this.currentIdChat = null;
        this.currentNameChat = null;
        this.isShowingSidebar = false;
    }

    setIdInstanse = (value: string) => {
        this.idInstance = value;
    }
    
    setApiTokenInstance = (value: string) => {
        this.apiTokenInstance = value;
    }
    setCurrentIdChat = (value?: string) => {
        value ? this.currentIdChat = value : this.currentIdChat = null;
    }
    setCurrentNameChat = (value?: string) => {
        value ? this.currentNameChat = value : this.currentNameChat = null;
    }
    setIsShowingSidebar = () => {
        this.isShowingSidebar = !this.isShowingSidebar;
    }
}
