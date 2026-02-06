# Instruções de Deploy - Vercel

## Passos para Deploy

### 1. Preparar Ícones PWA

Antes de fazer o deploy, crie os ícones do PWA:

- **icon-192.png**: 192x192 pixels
- **icon-512.png**: 512x512 pixels

Coloque os arquivos na raiz do projeto (mesmo nível que `index.html`).

### 2. Deploy no Vercel

#### Opção A: Via Interface Web (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com) e faça login (pode usar conta GitHub)
2. Clique em **"Add New..." → "Project"**
3. Importe o repositório do GitHub ou faça upload
4. Configure:
   - **Framework Preset**: `Other`
   - **Build Command**: (deixe vazio)
   - **Output Directory**: `.` (ponto - raiz do projeto)
5. Clique em **"Deploy"**

#### Opção B: Via Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy (na pasta do projeto)
vercel --prod
```

#### Opção C: Via Git (Recomendado)

1. Crie um repositório no GitHub
2. Faça push do código
3. No Vercel, importe o repositório
4. O deploy será automático a cada push

### 3. Configurações

O arquivo `vercel.json` já está configurado com os headers de segurança necessários para PWA.

#### HTTPS

O Vercel fornece HTTPS automaticamente em todos os deploys.

### 4. Verificar PWA

Após o deploy:

1. Acesse o site no navegador
2. No Chrome/Edge: Menu → "Instalar SPEED TV"
3. No Safari (iOS): Compartilhar → "Adicionar à Tela de Início"

### 5. Domínio Personalizado (Opcional)

1. No Vercel, vá em **Settings → Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções do Vercel

### Troubleshooting

- **PWA não instala**: Verifique ícones e `manifest.json`
- **API retorna CORS**: A API deve permitir requisições do seu domínio Vercel
- **Player não carrega**: Verifique o console do navegador (F12)

## Estrutura do Projeto

```
/
├── index.html
├── player-pc.html
├── player-mobile.html
├── manifest.json
├── vercel.json
├── sw.js
├── icon-192.png
├── icon-512.png
├── css/
│   └── styles.css
└── js/
    ├── api.js
    └── player.js
```
