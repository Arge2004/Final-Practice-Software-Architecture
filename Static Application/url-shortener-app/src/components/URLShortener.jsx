import { useState } from 'react';
import { urlService } from '../services/api';

const URLShortener = ({ onUrlCreated }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);
    setLoading(true);

    try {
      const result = await urlService.createShortUrl(originalUrl);
      setShortUrl(result);
      setOriginalUrl('');
      if (onUrlCreated) {
        onUrlCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la URL corta');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:shadow-[0_0_50px_rgba(99,102,241,0.3)]">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Acorta tu URL
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Convierte URLs largas en enlaces cortos y compartibles
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://tu-url-larga.com/path/to/resource"
              required
              className="w-full px-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 group-hover:border-white/20"
            />
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-[2px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl group-hover:bg-transparent transition-all duration-300">
              <span className="relative z-10 text-white font-semibold text-lg flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Acortar URL
                  </>
                )}
              </span>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
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

        {shortUrl && (
          <div className="mt-6 p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl animate-slideIn">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-400 font-semibold">¡URL acortada exitosamente!</p>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1 px-4 py-3 bg-black/30 rounded-xl border border-white/10">
                <p className="text-white font-mono text-sm break-all">{shortUrl}</p>
              </div>
              
              <button
                onClick={copyToClipboard}
                className="flex-shrink-0 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-300 group hover:scale-105 active:scale-95"
                title="Copiar al portapapeles"
              >
                {copied ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>

            {copied && (
              <p className="text-center text-green-400 text-sm mt-3 animate-bounce">
                ✓ Copiado al portapapeles
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default URLShortener;
