<script lang="ts">
    import { checkPrime } from 'crypto';
import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher()
export let operators

let isSubmitting = false
type operator = {
    operator_id : number
}

let operatorList = []

export let operatorsInJob = []
operatorsInJob.map(element => {
    operatorList = [...operatorList, {
        operator_id:Number(element.operator_id),
    }]
})

function selectOperator(e){
    const operator_id = e.target.value
    if(e.target.checked){
        let existe = operatorsInJob.some(element =>{
            element.operator_id == Number(operator_id)
        })
        if(!existe){
            operatorList = [...operatorList , {
                operator_id : Number(operator_id),
            }]
        }
    }
    else{
        const index = operatorList.findIndex(e => e.operator_id==operator_id)   
        operatorList = [...operatorList.splice(0,index),
                        ...operatorList.splice(index+1,operatorList.length)
        ]  
    } 
}

</script>
<div class="table-responsive">
    <table class="table table-striped table-hover align-middle">
        <thead>
            <tr>
                <th scope="col"><input type="search" placeholder="Filtrar" />Nro Operario</th>
                <th scope="col"><input type="search" placeholder="Filtrar" />Apellido y Nombre</th>
                <th scope="col"><input type="search" placeholder="Filtrar" />Cuit</th>
                <th scope="col"><input type="search" placeholder="Filtrar" />Activo</th>            
                <th scope="col"><input type="search" placeholder="Filtrar" />Seleccionar</th>            
            </tr>
        </thead>
        <tbody>
            {#each operators as operator }
            <tr>
                <th scope="col">{operator.operator_id}</th>
                <th scope="col">{operator.users.lastName} {operator.users.firstName}</th>
                <th scope="col">{operator.users.cuit}</th>
                <th scope="col">
                    {#if operator.users.active }
                         <i class="fas fa-check-circle me-2 text-success" />
                    {:else}
                        <i class="fas fa-times-circle me-2 text-danger" />
                    {/if}    
                </th>
                <th scope="col" class="text-center">
                    <input 
                        id="checkOperator" 
                        type="checkbox" 
                        name="roles"
                        on:click={selectOperator} 
                        value={operator.operator_id}  
                        class="form-check-input"
                        checked={operatorsInJob.find(element => {
                            return (element.operator_id == operator.operator_id)
                        })}
                    />

                </th>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
<div class="row mb-3 g-3">
    <div class="col-md-6" />
    <div class="col-md-6 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary" on:click={()=> dispatch('asignarOperarios', {operatorList})} >
            {#if isSubmitting}
                <i class="fas fa-spinner fa-pulse me-2" />Enviando...
            {:else}
                <i class="fas fa-plus me-2" />Asignar
            {/if}
        </button>
    </div>
</div>