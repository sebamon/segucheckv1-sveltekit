<script lang='ts'>
    import { Alert } from 'sveltestrap';
    import type { Color } from 'sveltestrap/src/shared';
    export let message:string = ''
    export let status:string
    export let path:string = "\\"

    const DEFAULT_MODEL = ''
    const MODEL = {
        'clientes' : 'Cliente',
        'vehiculos' : 'Veh+iculo',
        'operarios' : 'Operario',
        'usuarios' : 'Usuario',
        'locaciones' : 'Locación',
        'trabajos' : 'Trabajo',
    }
    const DEFAULT_COLOR='primary'
    const COLOR = {
        'OK' : 'success',
        'NEW' : 'success',
        'ERROR': 'danger',
        'INFO' : 'info'
    }
    const DEFAULT_LINK= `/panel/`
    const LINKS = {
        'OK' : `/panel/${path}`,
        'NEW' : `/panel/${path}`,
        'ERROR': 'danger',
        'INFO' : `/panel/${path}/nuevo`,
    }
    const DEFAULT_TEXTO = 'Ir al Inicio'
    const TEXTO = {
        'OK' : `Ver  `,
        'NEW' : `Ver  `,
        'ERROR': `Regresá a  `  ,
        'INFO' : `Creá tu primer  `

    }


    let color:Color = COLOR[status] || DEFAULT_COLOR
    let link = LINKS[status] || DEFAULT_LINK
    let model = MODEL[path] ||  DEFAULT_MODEL
    let texto = TEXTO[status] || DEFAULT_TEXTO
</script>

<Alert {color}>
    <h4 class="alert-heading text-capitalize">{status}</h4>
    {message}
    <a href={link} class="alert-link"> {texto} {model}</a>
</Alert>
