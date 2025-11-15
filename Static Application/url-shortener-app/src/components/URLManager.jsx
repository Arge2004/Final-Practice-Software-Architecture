import { useState, useEffect } from 'react';
import { urlService } from '../services/api';

const URLManager = ({ refreshTrigger }) => {
  const [urls, setUrls] = useState([]);
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCode.trim()) {
      setMessage({ type: 'error', text: 'Por favor ingresa un código' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const result = await urlService.getUrlStats(searchCode);
      const exists = urls.find(url => url.shortCode === result.shortCode);
      if (!exists) {
        setUrls([result, ...urls]);
      }
      setSearchCode('');
      setMessage({ type: 'success', text: 'URL encontrada y agregada a la lista' });
    } catch (err) {
      setMessage({ type: 'error', text: 'No se encontró la URL con ese código' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta URL?')) {
      return;
    }

    setDeleteLoading(shortCode);
    try {
      await urlService.deleteUrl(shortCode);
      setUrls(urls.filter(url => url.shortCode !== shortCode));
      setMessage({ type: 'success', text: 'URL eliminada exitosamente' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al eliminar la URL' });
    } finally {
      setDeleteLoading(null);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setMessage({ type: 'success', text: '¡Copiado al portapapeles!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 2000);
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 rounded-full p-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Gestor de URLs
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Busca y administra tus URLs acortadas
        </p>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative group">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Buscar por código corto..."
                className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 group-hover:border-white/20"
              />
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white font-semibold hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              Buscar
            </button>
          </div>
        </form>

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl animate-slideIn ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/50' 
              : 'bg-red-500/10 border border-red-500/50'
          }`}>
            <div className={`flex items-center gap-2 ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {message.type === 'success' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        )}

        {urls.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400">No hay URLs en la lista</p>
            <p className="text-gray-500 text-sm mt-2">Busca URLs por su código corto para agregarlas aquí</p>
          </div>
        ) : (
          <div className="space-y-4">
            {urls.map((url, index) => (
              <div
                key={url.shortCode}
                className="group p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 animate-slideIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-mono text-sm">
                        {url.shortCode}
                      </span>
                      <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-400 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {url.accessCount} {url.accessCount === 1 ? 'visita' : 'visitas'}
                      </span>
                    </div>
                    
                    <p className="text-white text-sm mb-2 break-all group-hover:text-green-300 transition-colors">
                      {url.originalUrl}
                    </p>
                    
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/${url.shortCode}`)}
                      className="text-gray-400 hover:text-green-400 text-xs flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copiar URL corta
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(url.shortCode)}
                    disabled={deleteLoading === url.shortCode}
                    className="flex-shrink-0 p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Eliminar URL"
                  >
                    {deleteLoading === url.shortCode ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default URLManager;
