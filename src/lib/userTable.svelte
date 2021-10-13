<script lang="ts" context="module">
import { PrismaClient } from '@prisma/client'
import { writable } from 'svelte/store';
import { loop_guard } from 'svelte/internal';
import { get } from 'svelte/store';
const prisma = new PrismaClient()
 
const users =  prisma.users.findMany();




// async function main(){

//     console.log("hola")
//     console.log(users)
  
//     function getHola(){
//         return console.log('holasa')
//     }
// }
</script>


