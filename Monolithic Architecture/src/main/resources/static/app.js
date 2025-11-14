// Configuración de la API
const API_BASE_URL = window.location.origin;
let currentShortCode = null;

// Manejar el formulario de creación de URL
document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const originalUrl = document.getElementById('originalUrl').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/urls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                originalUrl: originalUrl
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear la URL corta');
        }
        
        const shortUrl = await response.text();
        
        // Mostrar resultado
        document.getElementById('shortUrlDisplay').value = shortUrl;
        document.getElementById('resultSection').style.display = 'block';
        document.getElementById('errorSection').style.display = 'none';
        
        // Limpiar formulario
        document.getElementById('createForm').reset();
        
    } catch (error) {
        showError(error.message);
    }
});

// Manejar el formulario de estadísticas
document.getElementById('statsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const shortCode = document.getElementById('shortCode').value;
    currentShortCode = shortCode;
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/urls/${shortCode}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('URL no encontrada');
            }
            throw new Error('Error al obtener las estadísticas');
        }
        
        const stats = await response.json();
        
        // Mostrar estadísticas
        document.getElementById('statOriginalUrl').textContent = stats.originalUrl;
        document.getElementById('statShortCode').textContent = stats.shortCode;
        document.getElementById('statVisits').textContent = stats.accessCount || 0;
        document.getElementById('statCreatedAt').textContent = formatDate(stats.createdAt);
        
        document.getElementById('statsDisplay').style.display = 'block';
        
    } catch (error) {
        alert(`Error: ${error.message}`);
        document.getElementById('statsDisplay').style.display = 'none';
    }
});

// Función para copiar al portapapeles
function copyToClipboard(event) {
    const shortUrlInput = document.getElementById('shortUrlDisplay');
    shortUrlInput.select();
    shortUrlInput.setSelectionRange(0, 99999); // Para móviles
    
    navigator.clipboard.writeText(shortUrlInput.value)
        .then(() => {
            // Cambiar texto del botón temporalmente
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✅ Copiado';
            btn.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 2000);
        })
        .catch(err => {
            alert('Error al copiar: ' + err);
        });
}

// Función para eliminar URL
async function deleteUrl() {
    if (!currentShortCode) return;
    
    if (!confirm(`¿Estás seguro de que deseas eliminar la URL con código "${currentShortCode}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/urls/${currentShortCode}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar la URL');
        }
        
        alert('URL eliminada exitosamente');
        
        // Limpiar y ocultar estadísticas
        document.getElementById('statsForm').reset();
        document.getElementById('statsDisplay').style.display = 'none';
        currentShortCode = null;
        
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Función para mostrar errores
function showError(message) {
    document.getElementById('errorMessage').textContent = `❌ ${message}`;
    document.getElementById('errorSection').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    
    // Ocultar error después de 5 segundos
    setTimeout(() => {
        document.getElementById('errorSection').style.display = 'none';
    }, 5000);
}

// Función para formatear fecha
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return date.toLocaleDateString('es-ES', options);
}

// Mensaje de bienvenida en consola
console.log('%c🔗 URL Shortener Frontend', 'color: #4f46e5; font-size: 20px; font-weight: bold;');
console.log('%cFrontend conectado a: ' + API_BASE_URL, 'color: #10b981; font-size: 14px;');
