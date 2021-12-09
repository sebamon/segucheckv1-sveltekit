<script lang="ts">
   import { ListGroup, ListGroupItem } from 'sveltestrap';
    export let operatorsInJob = []

    console.log(operatorsInJob)

</script>
<h4 class="mt-3">Operarios Activos</h4>
<ListGroup>
               
    {#each operatorsInJob as operator}
    
      <ListGroupItem active tag="button" action>{operator.operator.users.lastName} {operator.operator.users.firstName}</ListGroupItem>
    
    {/each}

</ListGroup>