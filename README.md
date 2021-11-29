# SeguCheck

![Logo SeguCheck](https://i.imgur.com/QYfrqU1.png "Logo SeguCheck")

Creado por:
* **Sebastián Mon**
* **Arian Acevedo**
* **Federico García Cendra**

## Acerca de
Este es nuestro proyecto final para la carrera **Tecnicatura Universitaria en Desarrollo Web**, de la **Universidad Nacional del Comahue**, en Argentina.

> *Nuestra meta es lograr un sistema de gestión, pensado para el área de higiene y seguridad.*

Su función es simplificar las tareas diarias de control documental, y debe:
-   Reunir toda información pertinente al trabajo seguro en el área correspondiente
-   Presentar la documentación de forma ordenada al cliente
-   Llevar un registro de los operarios con sus trabajos y vencimientos

Por lo tanto, esta aplicación permitirá:
* Registrar los operarios y vehículos, así como también las empresas clientes y sus locaciones
* Almacenar las habilitaciones (con vencimiento) de los operarios y vehículos, de forma periódica
* Generar una tarea que especifique los requisitos y operarios que acudirán al lugar de trabajo del cliente
* Registrar los "checklists" o listas de verificación de los requisitos y elementos necesario para el trabajo
* Generar un código QR con acceso de invitado para ver la documentación en línea

## Instalación

Sigue estos pasos:
* Clonar este proyecto
* Instalar dependencias con `npm install` (sino `pnpm install` o `yarn`)
* Iniciar servidor MySQL y ejecutar Prisma ORM para cargar base de datos:
```bash
npx prisma db push
npx prisma db seed

# Si ya estaba creado anteriormente:
npx prisma db push --force-reset --accept-data-loss
```
* Iniciar el servidor con:
```bash
npm run dev

# Sino, visible en la red local con:
npm run host
```

## Librerías y recursos utilizados

El proyecto se encuentra desarrollado mediante el framework [**Svelte**](https://svelte.dev/) junto a [**SvelteKit**](https://kit.svelte.dev/).

Entre otros, utilizamos:
* Librería CSS: [**Bootstrap**](https://getbootstrap.com/), mediante tema [**Bootswatch Pulse**](https://bootswatch.com/pulse/) y librería de componentes [**Sveltestrap**](https://sveltestrap.js.org/)
* Manejo de datos: [**Prisma ORM**](https://www.prisma.io/)
* Formularios: [**svelte-forms-lib**](https://svelte-forms-lib-sapper-docs.vercel.app/) junto a la validación mediante [**Yup**](https://github.com/jquense/yup)
* Manejo de fechas: [**Moment.js**](https://momentjs.com/)
* Copiar al portapapeles: [**svelte-copy-to-clipboard**](https://github.com/henriquecaraujo/svelte-copy-to-clipboard)
* Códigos QR: ~~[LinQR](https://rapidapi.com/linqr-linqr-default/api/qrcode3/) y~~ [**Google Charts**](https://developers.google.com/chart/infographics/docs/qr_codes)
* Autenticación: [**sk-auth**](https://github.com/Dan6erbond/sk-auth) y [**jsonwebtoken**](https://github.com/auth0/node-jsonwebtoken)
* Aplicación móvil (a probar): [**Svelte Native**](https://svelte-native.technology)