// API Manager para SPEED TV
const API_BASE = 'https://speedtv.x44bet.com';

class APIManager {
    constructor() {
        this.user = localStorage.getItem('user') || '';
        this.pass = localStorage.getItem('pass') || '';
    }

    getAuthParams() {
        return `user=${encodeURIComponent(this.user)}&pass=${encodeURIComponent(this.pass)}`;
    }

    async checkStatus() {
        try {
            const response = await fetch(`${API_BASE}/api/status`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Status check failed:', error);
            return { apiOnline: false };
        }
    }

    async getUserInfo() {
        try {
            const response = await fetch(`${API_BASE}/api/user/info?${this.getAuthParams()}`);
            
            if (response.status === 401) {
                this.handleUnauthorized();
                return null;
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Get user info failed:', error);
            throw error;
        }
    }

    async getChannels() {
        try {
            const response = await fetch(`${API_BASE}/api/channels?${this.getAuthParams()}`);
            
            if (response.status === 401) {
                this.handleUnauthorized();
                return null;
            }
            
            if (response.status === 429) {
                throw new Error('LIMIT_REACHED');
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Get channels failed:', error);
            throw error;
        }
    }

    async getChannel(id) {
        try {
            const response = await fetch(`${API_BASE}/api/channel/${id}?${this.getAuthParams()}`);
            
            if (response.status === 401) {
                this.handleUnauthorized();
                return null;
            }
            
            if (response.status === 429) {
                throw new Error('LIMIT_REACHED');
            }
            
            if (response.status === 504) {
                throw new Error('TIMEOUT');
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            return data.m3u8 || data.url || null;
        } catch (error) {
            console.error('Get channel failed:', error);
            throw error;
        }
    }

    async getJogos() {
        try {
            const response = await fetch(`${API_BASE}/api/jogos?${this.getAuthParams()}`);
            
            if (response.status === 401) {
                this.handleUnauthorized();
                return null;
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Get jogos failed:', error);
            throw error;
        }
    }

    async getEPGs() {
        try {
            const response = await fetch(`${API_BASE}/api/epgs?${this.getAuthParams()}`);
            
            if (response.status === 401) {
                this.handleUnauthorized();
                return null;
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Get EPGs failed:', error);
            throw error;
        }
    }

    async getFilmes() {
        try {
            const response = await fetch(`${API_BASE}/api/filmes?${this.getAuthParams()}`);
            
            if (response.status === 401) {
                this.handleUnauthorized();
                return null;
            }
            
            if (response.status === 403) {
                throw new Error('ACCESS_DENIED');
            }
            
            if (response.status === 503) {
                throw new Error('COMING_SOON');
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Get filmes failed:', error);
            throw error;
        }
    }

    async getSeries() {
        try {
            const response = await fetch(`${API_BASE}/api/series?${this.getAuthParams()}`);
            
            if (response.status === 401) {
                this.handleUnauthorized();
                return null;
            }
            
            if (response.status === 403) {
                throw new Error('ACCESS_DENIED');
            }
            
            if (response.status === 503) {
                throw new Error('COMING_SOON');
            }
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Get series failed:', error);
            throw error;
        }
    }

    handleUnauthorized() {
        localStorage.removeItem('logado');
        localStorage.removeItem('user');
        localStorage.removeItem('pass');
        localStorage.removeItem('user_info');
        window.location.href = 'index.html';
    }

    showError(message, error) {
        let errorMessage = message;
        
        if (error === 'LIMIT_REACHED') {
            errorMessage = 'Limite de conexões atingido. Desconecte outros dispositivos.';
        } else if (error === 'TIMEOUT') {
            errorMessage = 'Tempo de conexão esgotado. Tente novamente.';
        } else if (error === 'ACCESS_DENIED') {
            errorMessage = 'Acesso negado. Verifique sua assinatura.';
        } else if (error === 'COMING_SOON') {
            errorMessage = 'Em breve';
        } else if (error && error.message) {
            errorMessage = `${message}: ${error.message}`;
        }
        
        // Criar elemento de alerta
        const alert = document.createElement('div');
        alert.className = 'alert alert-error';
        alert.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${errorMessage}</span>
        `;
        
        // Inserir no topo do conteúdo
        const content = document.querySelector('.content-area') || document.body;
        content.insertBefore(alert, content.firstChild);
        
        // Remover após 5 segundos
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// Instância global
const api = new APIManager();
