// Player Manager usando Clappr
class PlayerManager {
    constructor(containerId) {
        this.containerId = containerId;
        this.player = null;
        this.currentSource = null;
    }

    init(source, options = {}) {
        // Destruir player anterior se existir
        if (this.player) {
            this.destroy();
        }

        const defaultOptions = {
            source: source,
            parentId: this.containerId,
            autoPlay: true,
            mute: false,
            width: '100%',
            height: '100%',
            playback: {
                playInline: true
            },
            plugins: [],
            mediacontrol: {
                seekbar: '#1f6bff',
                buttons: '#ffffff'
            },
            ...options
        };

        // Adicionar plugin de qualidade se disponível
        if (window.Clappr && window.Clappr.Plugins && window.Clappr.Plugins.LevelSelector) {
            defaultOptions.plugins = [window.Clappr.Plugins.LevelSelector];
        }

        this.player = new Clappr.Player(defaultOptions);
        this.currentSource = source;

        // Event listeners
        this.player.on('error', (error) => {
            console.error('Player error:', error);
            this.showError('Erro ao reproduzir o vídeo');
        });

        this.player.on('ready', () => {
            console.log('Player ready');
        });

        return this.player;
    }

    play() {
        if (this.player) {
            this.player.play();
        }
    }

    pause() {
        if (this.player) {
            this.player.pause();
        }
    }

    destroy() {
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }
    }

    showError(message) {
        const container = document.querySelector(this.containerId);
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'player-error';
            errorDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 107, 107, 0.1);
                border: 1px solid rgba(255, 107, 107, 0.3);
                color: #ff6b6b;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                z-index: 1000;
            `;
            errorDiv.textContent = message;
            container.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }
    }

    loadSource(source) {
        if (this.player) {
            this.player.load(source);
            this.currentSource = source;
        } else {
            this.init(source);
        }
    }
}
