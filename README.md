<div align="center">
  <img src="public/favicon.svg" alt="Cat Logo" width="120" />
  <h1>🐱 Datos Curiosos API</h1>
  
  <p>
    <strong>Una Single Page Application (SPA) para explorar datos curiosos de gatos, traducidos automáticamente al español.</strong>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

<hr />

## ✨ Características

- **Peticiones Asíncronas**: Integración con `catfact.ninja` usando promesas encadenadas con `fetch`.
- **Traducción Automática**: Consumo de la API de *MyMemory* para convertir resultados de inglés a español en tiempo real.
- **Manejo Estricto de Errores**: Detección inteligente para distinguir entre caídas de red (`TypeError`) y rutas inválidas (errores `HTTP 404`).
- **Diseño Premium**: Interfaz moderna desarrollada completamente con **Tailwind CSS**, complementada con íconos vectoriales de **Lucide React**.

## 🛠️ Tecnologías Utilizadas

* **React 18** (Desarrollo basado en Hooks: `useState`, `useEffect`)
* **Vite** (Empaquetador ultrarrápido y Hot Module Replacement)
* **Tailwind CSS v3** (Estilos orientados a utilidades)
* **Lucide React** (Librería de íconos SVG)

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/catfacts.git
cd catfacts
```

2. **Instalar las dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Visualizar la aplicación**
Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 📝 Explicación del Hook `useEffect`

La aplicación utiliza el hook `useEffect` en el componente principal (`App.jsx`) para inicializar el estado. Al pasarle un array de dependencias vacío `[]`, garantizamos que la petición `fetch` a la API se ejecute estrictamente en el ciclo de **Mount** (una sola vez cuando la aplicación carga en el navegador), evitando renderizados infinitos o bloqueos de red.

## 🤝 Manejo de Errores

El bloque `try...catch` implementado está diseñado a prueba de fallos:
- Si se modifica la URL base simulando una caída de conexión (ej. un dominio falso), el sistema atrapa el `TypeError` y notifica un problema de conectividad.
- Si se modifica el *endpoint* de la API (ej. `/fact` -> `/datos`), el servidor responde con un status `404`, el cual es interceptado condicionalmente para mostrar una alerta visual informando sobre una ruta inválida.

---

<div align="center">
  <i>Construido con React para demostración académica.</i>
</div>
