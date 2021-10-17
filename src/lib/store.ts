// src/lib/store.ts
import type {Writable} from 'svelte/store'
import { writable } from 'svelte/store';

export type User={
    name:string|null,
    age?:number
}
export interface stateType{
    authenticated:boolean,
    user:User,
    counter:number
}
export const defaultState:stateType={
    authenticated:false,
    user:{
        name:null,
    },
    counter:0
}
export default class Store{
    state:Writable<stateType>;
    constructor(initialState:stateType=defaultState){
        this.state=writable({...initialState})
    }
    changeAuthenticationState=(user:User)=>{
        this.state.update((obj)=>{
            console.log("old state")
            console.log(obj)
            return {
                ...obj,
                authenticated:!obj.authenticated,
                user:user
            }
        })
    }
    updateCounter=(val:number)=>{
        this.state.update((obj)=>{
            return {
                ...obj,
                counter:val
            }
        })
    }
}