import React, { useState, useEffect } from 'react';
import { Cat, AlertTriangle, RefreshCw, Sparkles, MessageCircle } from 'lucide-react';

function App() {
  // Estado para almacenar el dato curioso traducido
  const [dato, setDato] = useState(''); 
  // Estado para el indicador de carga durante las peticiones
  const [cargando, setCargando] = useState(true); 
  // Estado para capturar y mostrar errores (red o HTTP)
  const [error, setError] = useState(null); 
  // estado para almacenar una foto aleatoria
  const [fotogatito, setfotogatito] = useState('');

  // Petición asíncrona a las APIs con manejo de errores encadenado
  const obtenerDatoCurioso = async () => {
    setCargando(true);
    setError(null);

    try {
      // 1. Fetch a la API original (Cat Facts)
      const respuesta = await fetch('https://catfact.ninja/fact');
      
      // Manejo estricto de códigos HTTP (ej. 404 si la ruta es alterada)
      if (!respuesta.ok) {
        if (respuesta.status === 404) {
          throw new Error('Error HTTP 404: Ruta de la API no encontrada.');
        }
        throw new Error(`Error del Servidor HTTP: ${respuesta.status}`);
      }
      
      const datosJson = await respuesta.json();
      const textoIngles = datosJson.fact;

      // 2. Fetch a la API de MyMemory para traducción (Inglés -> Español)
      const urlTraduccion = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textoIngles)}&langpair=en|es`;
      const respuestaTraduccion = await fetch(urlTraduccion);
      const datosTraduccion = await respuestaTraduccion.json();
      
      // Actualización del estado con el texto final traducido
      setDato(datosTraduccion.responseData.translatedText);

      // 3. Fetch a la API de The Cat API para obtener una foto aleatoria
      const respuestaFoto = await fetch('https://api.thecatapi.com/v1/images/search');
      const datosFoto = await respuestaFoto.json();
      setfotogatito(datosFoto[0].url);

    } catch (err) {
      // Diferenciación de errores: TypeError (Fallo de Red/CORS) vs Errores HTTP
      if (err instanceof TypeError) {
        setError('Error de Red: Falló la conexión (Verifica la URL o conexión a internet).');
      } else {
        setError(err.message);
      }
    } finally {
      // Desactivación del indicador de carga tras resolver o rechazar la promesa
      setCargando(false);
    }
  };

  // useEffect con array de dependencias vacío para ejecutar la petición solo en el montaje (Mount)
  useEffect(() => {
    obtenerDatoCurioso();
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="bg-white text-gray-800 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl border border-purple-100 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-purple-600"></div>

        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 flex items-center justify-center gap-3">
          <Cat size={36} className="text-purple-600" /> 
          Datos Curiosos
        </h1>
        
        {/* Renderizado condicional del error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r-lg mb-6 flex items-start text-left gap-3 shadow-sm">
            <AlertTriangle className="flex-shrink-0 mt-1 text-red-600" size={24} />
            <div>
              <strong className="block text-red-700 text-lg mb-1">¡Alerta del Sistema!</strong>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Renderizado condicional del estado de carga */}
        {cargando && !error && (
          <div className="text-purple-500 flex flex-col items-center justify-center gap-3 py-10">
            <RefreshCw className="animate-spin" size={36} />
            <span className="text-lg animate-pulse font-medium">Traduciendo información del servidor...</span>
          </div>
        )}

        {/* Renderizado condicional del dato e imagen cargado exitosamente */}
        {!cargando && !error && (
          <div className="flex flex-col items-center gap-6 py-8">
            {fotogatito && (
              <img 
                src={fotogatito} 
                alt="Gatito aleatorio" 
                className="w-40 h-40 object-cover rounded-2xl shadow-lg"
              />
            )}
          
            <div className="relative">
              <MessageCircle className="absolute -top-2 -left-2 text-purple-100 opacity-60" size={56} />
              <p className="text-xl md:text-2xl font-medium italic text-purple-900 relative z-10 px-6 leading-relaxed">
                "{dato}"
              </p>
            </div>
          </div>
        )}

        {/* Botón para forzar una nueva petición */}
        <button 
          onClick={obtenerDatoCurioso} 
          disabled={cargando}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg hover:shadow-purple-400/50 flex items-center justify-center gap-2 mx-auto mt-6"
        >
          {cargando ? (
            <>
              <RefreshCw className="animate-spin" size={20} />
              Cargando...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Obtener Otro Dato
            </>
          )}
        </button>

      </div>
  </div>
  );
}

export default App;
