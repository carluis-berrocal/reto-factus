# 📄 Sistema de Gestión de Facturación Electrónica — Laravel + React + Inertia

Este proyecto es una plataforma de gestión de facturación electrónica desarrollada con **Laravel 12**, **React** e **Inertia.js**, basada en el [starter kit oficial de Laravel](https://laravel.com/docs/starter-kits).

Está diseñado para conectarse e interactuar directamente con la API de [Factus](https://developers.factus.com.co/) de la empresa [Halltec](https://halltec.co/), permitiendo la creación, consulta, y visualización de facturas electrónicas, así como el consumo de múltiples endpoints adicionales.

---

## 🚀 Características principales

- 🔐 **Autenticación OAuth2** completamente integrada con la API de Factus
- 🧾 **Listado, búsqueda, show de facturas**, visualización de PDF y XML directamente desde Factus
- 🛠️ **Módulo de pruebas (Factus Test)** tipo POSTMAN para simular peticiones a los endpoints
- 👥 Gestión local de **clientes y productos** desde tu propia base de datos
- 🧾 **Creación de facturas electrónicas** y consumo directo de los servicios de Factus
- 🧩 Interfaz moderna y fluida usando **React + Inertia.js**

---

## 📂 Estructura general del proyecto

```bash
.
├── app/
│   ├── Console/           # Comandos Artisan personalizados
│   ├── Exceptions/        # Manejo de excepciones
│   ├── Http/
│   │   ├── Controllers/   # Controladores HTTP (Clientes, Productos, Facturas, etc.)
│   │   ├── Middleware/    # Middlewares de la aplicación
│   │   └── Requests/      # Validaciones personalizadas (Form Requests)
│   ├── Models/            # Modelos Eloquent
│   └── Providers/         # Proveedores de servicios
│
├── bootstrap/             # Arranque de Laravel
├── config/                # Archivos de configuración
├── database/
│   ├── factories/         # Fabricantes para pruebas
│   ├── migrations/        # Migraciones de base de datos
│   └── seeders/           # Seeders para poblar datos
│
├── public/                # Punto de entrada público (index.php)
├── resources/
│   ├── js/                # Código React + Inertia.js
│   │   ├── Pages/         # Vistas React (Clientes, Facturas, Dashboard, etc.)
│   │   └── Components/    # Componentes reutilizables en React
│   ├── lang/              # Archivos de traducción
│   └── views/             # Vistas Blade
│
├── routes/
│   ├── web.php            # Rutas web
│   └── api.php            # Rutas API
│
├── storage/               # Logs y archivos temporales
├── tests/                 # Pruebas unitarias y funcionales
├── .env.example           # Variables de entorno de ejemplo
├── artisan                # Consola de comandos Laravel
├── composer.json          # Dependencias PHP
├── package.json           # Dependencias JS
└── README.md              # Este archivo
```

---

## ⚙️ Requisitos del sistema

- PHP 8.2 o superior
- Node.js 18+ y npm/pnpm
- Composer
- Base de datos MySQL/PostgreSQL
- Credenciales de acceso a la API de Factus (pedir directamente a Halltec)

---

## 🔧 Instalación del proyecto

```bash
# 1. Clona este repositorio
git clone https://github.com/carluis-berrocal/reto-factus
cd tu-repo

# 2. Instala dependencias PHP y JS
composer install
npm install && npm run dev

# 3. Copia archivo de entorno y genera clave
cp .env.example .env
php artisan key:generate

# 4. Configura tu base de datos y credenciales de Factus en el archivo .env

# 5. Ejecuta migraciones
php artisan migrate --seed

# 6. Sincroniza los municipios desde la API de Factus
> Este proyecto se conecta con la API de Factus para poblar los municipios automáticamente. Asegúrate de tener configuradas las credenciales en tu archivo `.env` antes de ejecutar el comando de sincronización.

php artisan municipalities:sync

# 7. Inicia el servidor de desarrollo
php artisan serve
```

---

## 🔐 Autenticación con Factus (OAuth2)

Este sistema implementa la autenticación OAuth2 para conectarse con la API de Factus.  
Para obtener tus credenciales (CLIENT_ID y CLIENT_SECRET), debes solicitarlas directamente a la empresa [Halltec](https://halltec.co/).

Una vez las tengas, configúralas en tu archivo `.env`:

```env
FACTUS_CLIENT_ID=tu_client_id
FACTUS_CLIENT_SECRET=tu_client_secret
FACTUS_USERNAME=tu_usuario
FACTUS_PASSWORD=tu_contraseña
FACTUS_API_URL=https://api-sandbox.factus.com.co/
```

---

## 🧪 Módulo de pruebas (Factus Test)

Incluye una herramienta tipo POSTMAN desde la cual puedes enviar peticiones manuales a los distintos endpoints de Factus, ideal para desarrolladores o testers que quieran verificar respuestas de forma visual.

---

## 📄 Módulo de Facturación

Este es el núcleo del sistema:

- Ver listado de facturas electrónicas en tiempo real
- Filtro por fecha, cliente, número de factura, etc.
- Visualización de detalles en PDF y XML
- Crear nueva factura directamente desde el sistema

Toda la información es consultada y enviada **directamente a los servidores de Factus**, garantizando trazabilidad y cumplimiento normativo.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Puedes crear un *fork* del repositorio, hacer tus cambios en una rama y luego abrir un pull request.

---

## 📩 Contacto

Para soporte técnico, sugerencias o reportes de bugs, puedes contactarme directamente o abrir un issue en este repositorio.

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia [MIT](LICENSE).
