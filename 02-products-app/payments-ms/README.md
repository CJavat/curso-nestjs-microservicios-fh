## Dev

1. Clonar repositorio
2. Instalar dependencias con `yarn install`
3. Generar el archivo `.env` basado en el `.env.template`

   Obtener Secret Key: https://dashboard.stripe.com/test/apikeys

4. Correr el proyecto `yarn start:dev`

### Stripe CLI

1. Descargar de https://docs.stripe.com/stripe-cli
2. Crear una carpeta llamada stripe en la ubicación `C:/`
3. Mover el archivo `stripe.exe` a esa ubicación `C:/stripe`
4. Ir a `variables de entorno`.
5. Seleccionar la variable `Path` y darle en editar.
6. Click en `Nuevo` y agregar la ubicación: `C:\stripe`

### Hookdeck CLI <!-- https://hookdeck.com/ -->

1. Instalar CLI

```
npm install hookdeck-cli -g
```

2. Iniciar Sesión

```
hookdeck login
```

3. Correr comando

```
hookdeck listen [PORT] stripe-to-localhost
```

#### Configurar Conección Hookdeck

1. Source Name: `stripe-to-localhost`
2. En Send requests to Hookdeck seleccionar `Webhook URL`
3. En Definir el evento de conección, seleccionar `HTTP`
4. En Destination Name: `to-localhost`
5. Endpoint URL: `/payments/webhook`
6. Y ya después es seguir los pasos del `HOOKDECK CLI`
