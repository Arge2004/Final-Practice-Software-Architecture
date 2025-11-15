import { useState } from 'react';
import { urlService } from '../services/api';

const URLStats = () => {
  const [shortCode, setShortCode] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStats(null);
    setLoading(true);

    try {
      const result = await urlService.getUrlStats(shortCode);
      setStats(result);
    } catch (err) {
      setError(err.response?.data?.message || 'No se encontraron estadísticas para este código');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-[0_0_50px_rgba(234,179,8,0.3)]">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full p-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
          Estadísticas de URL
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Consulta el rendimiento de tus URLs acortadas
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="Ingresa el código corto (ej: aB1cD2e)"
              required
              pattern="[A-Za-z0-9]{7}"
              title="El código debe tener 7 caracteres alfanuméricos"
              className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 group-hover:border-white/20"
            />
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-600 to-orange-600 p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="relative px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl group-hover:bg-transparent transition-all duration-300">
              <span className="relative z-10 text-white font-semibold text-lg flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Consultando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Consultar Estadísticas
                  </>
                )}
              </span>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl animate-shake">
            <div className="flex items-center gap-2 text-red-400">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {stats && (
          <div className="mt-6 space-y-4 animate-slideIn">
            <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-yellow-400 font-semibold text-lg">Información de la URL</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-black/20 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">URL Original</p>
                  <p className="text-white font-mono text-sm break-all">{stats.originalUrl}</p>
                </div>

                <div className="p-4 bg-black/20 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Código Corto</p>
                  <p className="text-white font-mono text-lg">{stats.shortCode}</p>
                </div>

                <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
                  
                  <div className="relative">
                    <p className="text-gray-300 text-xs uppercase tracking-wide mb-2">Total de Accesos</p>
                    <div className="flex items-end gap-2">
                      <p className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {stats.accessCount}
                      </p>
                      <svg className="w-8 h-8 text-indigo-400 mb-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      {stats.accessCount === 0 ? 'Aún no hay visitas' : 
                       stats.accessCount === 1 ? 'Primera visita registrada' : 
                       'Visitas acumuladas'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default URLStats;
