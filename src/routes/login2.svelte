<!-- src/routes/login.svelte -->
<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const load:Load=async ({session})=>{

                if(session.authenticated){
                    return{  
                        redirect:'/counter1',
                        status:302
                    }
                }   
            return {}
    }
</script>
<script lang="ts">
    import type Store from '$lib/store';
    import {goto} from '$app/navigation';
    import {setContext,getContext} from 'svelte';
    const store=getContext<Store>('store');
    const login=async ()=> {
        let res= await fetch('/auth');
        let data=await res.json();
        if(data.success){
            store.changeAuthenticationState(data.user);
            goto('/counter1');
        }
    }
</script>
<h1>Login Page</h1>
<button on:click={login}>Login</button>