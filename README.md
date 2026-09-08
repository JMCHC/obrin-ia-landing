# Obrín IA - Sistema de Evaluación Técnica y Diagnóstico Constructivo

**Autor:** José Manuel Christensen Correa
**Contexto:** Proyecto de desarrollo tecnológico aplicado - Construcción Civil, Pontificia Universidad Católica de Chile.
**Año:** 2026

## Descripción del Software
Obrín IA es una aplicación web impulsada por Inteligencia Artificial diseñada para el diagnóstico automatizado de patologías constructivas y la valoración de proyectos de mantención y/o reparación en construcción. El sistema procesa imágenes del estado actual de la obra, analiza observaciones técnicas e integra datos climáticos en tiempo real para generar reportes estructurados con soluciones precisas, estimación de materiales y presupuestos de referencia en pesos chilenos (CLP).

## Flujo de Uso y Funcionalidades

### 1. Autenticación y Acceso
El sistema cuenta con un control de acceso seguro gestionado a través de Firebase Authentication, permitiendo el ingreso mediante credenciales de Google o correo electrónico tradicional.

### 2. Panel de Evaluación
La interfaz principal permite al usuario seleccionar la carpeta del proyecto activo o crear una nueva, cargar evidencia fotográfica (vista general y detalle), incorporar datos del entorno geográfico/climático y añadir observaciones técnicas.

### 3. Gestión de Proyectos
El usuario dispone de un menú lateral para administrar su perfil, consultar el historial de evaluaciones previas y gestionar la creación de nuevas carpetas de proyectos.

### 4. Historial y Fichas Técnicas
Las evaluaciones se almacenan estructuradamente por proyecto, registrando la fecha, el elemento analizado, el costo total del proyecto y la calificación otorgada por el usuario.

### 5. Resultados del Diagnóstico IA
El motor de inteligencia artificial genera un reporte técnico exhaustivo que incluye:
*   Diagnóstico preciso de la patología.
*   Propuesta técnica de intervención.
*   Especificación de materiales (con precios referenciales locales extraídos desde una base de datos propia en Cloudflare D1).
*   Procedimiento operativo secuencial.

### 6. Valorización y Cierre
Finalmente, el sistema calcula la inversión unitaria referencial, estima el tiempo de ejecución y permite al usuario calificar el reporte, descargar un PDF o solicitar una visita técnica.

## Arquitectura del Sistema

El software está dividido en dos componentes principales:

### 1. Frontend (Interfaz de Usuario)
Aplicación de cliente ligero (SPA) que gestiona la interacción del usuario, la captura de imágenes y la autenticación.
* **Tecnologías:** HTML5, Tailwind CSS, Vanilla JavaScript.
* **Base de Datos & Auth:** Firebase SDK (Firestore Database y Authentication).
* **Exportación:** html2canvas y jsPDF para la generación de reportes.
* **Ejecución:** Abrir `index.html` directamente en cualquier navegador web moderno.

### 2. Backend (Edge Proxy & Lógica de Negocio)
Servicio intermediario que procesa las solicitudes, inyecta el conocimiento experto (RAG), se comunica con la API de IA y cruza los materiales sugeridos con bases de datos de precios locales.
* **Tecnologías:** Cloudflare Workers (JavaScript).
* **Base de Datos Edge:** Cloudflare D1 (SQL) para el catálogo de materiales y homologación de precios.
* **Motor IA:** Integración multimodal para análisis de visión por computadora y lenguaje natural.

## Estructura del Código Fuente Entregado
* `/Frontend/` - Contiene `index.html`, vistas secundarias y la carpeta `/assets/` con las imágenes de interfaz.
* `/Backend/` - Contiene el script del Cloudflare Worker (`worker_proxy.js`).
* `Descripcion_Tecnica_Obrin_IA.pdf` - Memoria técnica detallada de la arquitectura.
* `Manual_de_Uso.pdf` - Guía visual de operación del sistema.
* `Licencias.pdf` - Declaración de librerías de código abierto de terceros utilizadas en el proyecto.
