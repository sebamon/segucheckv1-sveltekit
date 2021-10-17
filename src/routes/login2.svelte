<!-- src/routes/login.svelte -->
<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const load:Load=async ({session})=>{

                if(session.authenticated){
                    return{  
                        redirect:'/panel',
                        status:302
                    }
                }   
            return {}
    }
</script>
<script lang="ts">
    // import type Store from '$app/store';
    import {
    // a function to get access to navigating, page, or session
    getStores,
    // The current navigation status
    navigating,
    // Information about the current page
    page,
    // session information - we'll get to this later
    session,
    // deprecated - use getStores() or the other three directly
} from '$app/stores';

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