# SPEED TV Viewer

Player web profissional para clientes do sistema SPEED TV, desenvolvido como Progressive Web App (PWA) com suporte completo para desktop e mobile.

## 🚀 Características

- ✅ **Login seguro** com validação via API
- ✅ **Player Clappr** com suporte completo a streams m3u8
- ✅ **Interface responsiva** otimizada para PC e mobile
- ✅ **PWA instalável** para uso como app nativo
- ✅ **Tema escuro profissional** com identidade visual moderna
- ✅ **Múltiplas abas**: Canais, Jogos, EPG, Filmes, Séries e Perfil
- ✅ **Tratamento de erros** completo (401, 429, 504)
- ✅ **Status da API** em tempo real

## 📁 Estrutura do Projeto

```
speedtv-viewer/
├── index.html          # Página de login
├── player-pc.html      # Interface desktop
├── player-mobile.html  # Interface mobile
├── manifest.json       # Configuração PWA
├── sw.js              # Service Worker
├── css/
│   └── styles.css     # Estilos globais
└── js/
    ├── api.js         # Gerenciador de API
    └── player.js      # Gerenciador do player Clappr
```

## 🔧 Configuração

### 1. Ícones PWA

Para que o PWA funcione completamente, você precisa adicionar os ícones:

- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

Coloque estes arquivos na raiz do projeto. Eles são referenciados no `manifest.json`.

### 2. Deploy no Netlify

1. Faça upload de todos os arquivos para o Netlify
2. Configure o `start_url` no `manifest.json` (já configurado como `./index.html`)
3. Certifique-se de que o Netlify está servindo os arquivos com os headers corretos para PWA

### 3. Configuração da API

A API base está configurada como:
```
https://speedtv.x44bet.com
```

Todas as rotas da API usam autenticação via query parameters:
```
?user=USUARIO&pass=SENHA
```

## 📱 Funcionalidades

### Login (`index.html`)
- Validação de credenciais via API
- Detecção automática de dispositivo (mobile/desktop)
- Armazenamento seguro de credenciais no localStorage
- Redirecionamento automático para o player apropriado

### Player Desktop (`player-pc.html`)
- Layout com sidebar e área de player
- Navegação por abas no topo
- Busca integrada
- Player em tela cheia

### Player Mobile (`player-mobile.html`)
- Layout otimizado para toque
- Navegação inferior (bottom tabs)
- Player em fullscreen
- Menu lateral deslizante

### Abas Disponíveis

1. **Canais**
   - Lista todos os canais disponíveis
   - Busca por nome ou categoria
   - Reprodução direta ao clicar

2. **Jogos**
   - Lista partidas ao vivo
   - Informações de times e ligas
   - Reprodução do canal do jogo

3. **EPG**
   - Guia de programação
   - Programas atuais por canal
   - Integração com lista de canais

4. **Filmes**
   - Lista de filmes (quando disponível)
   - Mensagem "Em breve" se retornar 503
   - Mensagem de acesso negado se retornar 403

5. **Séries**
   - Lista de séries (quando disponível)
   - Mesmo comportamento de filmes

6. **Perfil**
   - Informações do usuário
   - Status da assinatura
   - Data de expiração
   - Limite de conexões

## 🔐 Segurança

- Credenciais armazenadas localmente (localStorage)
- Verificação de autenticação em todas as páginas
- Redirecionamento automático para login em caso de 401
- Tratamento adequado de erros de autenticação

## 🎨 Design

- **Cor principal**: Azul escuro (#1f6bff)
- **Cor secundária**: Ciano (#00d4ff) para destaques
- **Tema**: Escuro profissional
- **Tipografia**: System fonts (San Francisco, Segoe UI, Roboto)
- **Animações**: Suaves e profissionais

## 🛠️ Tecnologias

- **HTML5** / **CSS3**
- **JavaScript** (Vanilla)
- **Clappr Player** (via CDN)
- **Service Worker** (PWA)
- **Fetch API** (requisições HTTP)

## 📡 APIs Utilizadas

- `GET /api/user/info` - Informações do usuário e login
- `GET /api/status` - Status da API
- `GET /api/channels` - Lista de canais
- `GET /api/channel/{id}` - Stream do canal
- `GET /api/jogos` - Lista de jogos
- `GET /api/epgs` - Guia de programação
- `GET /api/filmes` - Lista de filmes
- `GET /api/series` - Lista de séries

## ⚠️ Tratamento de Erros

- **401**: Redireciona para login
- **429**: Mostra mensagem de limite de conexões
- **504**: Permite tentar novamente
- **503**: Mostra "Em breve" (filmes/séries)
- **403**: Mostra "Acesso negado"

## 📝 Notas

- O sistema detecta automaticamente se é mobile ou desktop
- O player usa apenas o campo `m3u8` retornado por `/api/channel/{id}`
- Nunca usa o campo `url` da lista de canais (conforme especificação)
- O PWA funciona offline para recursos estáticos
- Requisições da API sempre vão para a rede

## 🚀 Deploy

Para fazer deploy no Netlify:

1. Conecte seu repositório ou faça upload dos arquivos
2. Configure o build command (não necessário, projeto estático)
3. Configure o publish directory como raiz do projeto
4. Adicione os ícones `icon-192.png` e `icon-512.png`
5. Acesse o site e instale como PWA

## 📄 Licença

Este projeto foi desenvolvido para uso com o sistema SPEED TV.
