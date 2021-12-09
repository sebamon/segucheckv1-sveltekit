<script lang='ts'>
    // Genera avisos en pantalla según el status

    import { Alert } from 'sveltestrap';
    import type { Color } from 'sveltestrap/src/shared';
    export let message:string = ''
    export let status:string
    export let path:string = "\\"

    const DEFAULT_MODEL = ''
    const MODEL = {
        'clientes' : 'Cliente',
        'vehiculos' : 'Vehículo',
        'operarios' : 'Operario',
        'usuarios' : 'Usuario',
        'locaciones' : 'Locación',
        'trabajos' : 'Trabajo',
    }
    const DEFAULT_COLOR='secondary'
    const COLOR = {
        'OK' : 'success',
        'NEW' : 'success',
        'ERROR': 'danger',
        'INFO' : 'info',
        'UPDATE' : 'success'
    }
    const DEFAULT_LINK= `/panel/`
    const LINKS = {
        'OK' : `/panel/${path}`,
        'NEW' : `/panel/${path}`,
        'ERROR': `/panel/${path}`,
        'INFO' : `/panel/${path}/nuevo`,
        'UPDATE' : `/panel/${path}/`,
    }
    const DEFAULT_TEXT = 'Ir al Inicio'
    const TEXT = {
        'OK' : `Ver `,
        'NEW' : `Ver `,
        'ERROR': `Regresá a `  ,
        'INFO' : `Creá tu primer `,
        'UPDATE' : `Volver a `
    }
    const DEFAULT_TITLE = 'SeguCheck'
    const TITLE = {
        'OK' : `Exito `,
        'NEW' : `Creación Exitosa`,
        'ERROR': `Error`  ,
        'INFO' : `Información`,
        'UPDATE' : `Actualización Exitosa`
    }
    let visible = true

    let color:Color = COLOR[status] || DEFAULT_COLOR
    let link = LINKS[status] || DEFAULT_LINK
    let model = MODEL[path] ||  DEFAULT_MODEL
    let text = TEXT[status] || DEFAULT_TEXT
    let title = TITLE[status] || DEFAULT_TITLE
</script>

<Alert {color} 
    class="close" 
    isOpen={visible}
    toggle={() => (visible = false)}
    fade={false}
>
    <h4 class="alert-heading">{title}</h4>
    <p>{message}
        <a href={link} class="alert-link"> {text} {model}</a>
    </p>
</Alert>
