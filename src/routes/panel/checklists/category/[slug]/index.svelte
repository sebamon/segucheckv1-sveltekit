<script context="module">
    export async function load({load , page}){
        try {
            const response = await fetch('')
            if(response.ok){
                const data = response.json()
                return {
                    props: {
                        data
                    }
                }
            }else{
                return {
                    props: {}
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
</script>
<script>
    export let data
    export let category = data.category
    
</script>