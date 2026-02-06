# Instruções de Deploy - Netlify

## Passos para Deploy

### 1. Preparar Ícones PWA

Antes de fazer o deploy, você precisa criar os ícones do PWA:

- **icon-192.png**: 192x192 pixels
- **icon-512.png**: 512x512 pixels

**Dica**: Você pode usar ferramentas online como:
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/
- https://www.pwabuilder.com/imageGenerator

Coloque os arquivos na raiz do projeto (mesmo nível que `index.html`).

### 2. Deploy no Netlify

#### Opção A: Via Interface Web

1. Acesse [netlify.com](https://www.netlify.com) e faça login
2. Clique em "Add new site" → "Deploy manually"
3. Arraste a pasta do projeto ou selecione os arquivos
4. Aguarde o deploy concluir

#### Opção B: Via Netlify CLI

```bash
# Instalar Netlify CLI (se ainda não tiver)
npm install -g netlify-cli

# Fazer login
netlify login

# Deploy
netlify deploy --prod
```

#### Opção C: Via Git (Recomendado)

1. Crie um repositório no GitHub/GitLab/Bitbucket
2. Faça push do código
3. No Netlify, conecte o repositório
4. Configure:
   - **Build command**: (deixe vazio - projeto estático)
   - **Publish directory**: `/` (raiz)
5. Clique em "Deploy site"

### 3. Configurações Importantes

#### Headers para PWA

No Netlify, crie um arquivo `_headers` na raiz do projeto (ou configure via Netlify UI):

```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/manifest.json
  Content-Type: application/manifest+json
  Cache-Control: public, max-age=3600

/sw.js
  Content-Type: application/javascript
  Cache-Control: public, max-age=3600
```

Ou configure via `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Content-Type = "application/manifest+json"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Content-Type = "application/javascript"
```

#### HTTPS

O Netlify fornece HTTPS automaticamente. Certifique-se de que está habilitado nas configurações do site.

### 4. Verificar PWA

Após o deploy:

1. Acesse o site no navegador
2. No Chrome/Edge: Menu → "Instalar SPEED TV" ou ícone de instalação na barra de endereço
3. No Firefox: Menu → "Instalar Site como App"
4. No Safari (iOS): Compartilhar → "Adicionar à Tela de Início"

### 5. Testes

Teste as seguintes funcionalidades:

- ✅ Login funciona
- ✅ Redirecionamento mobile/desktop funciona
- ✅ Player carrega e reproduz streams
- ✅ Todas as abas carregam corretamente
- ✅ PWA instala corretamente
- ✅ Service Worker funciona offline (recursos estáticos)

### 6. Domínio Personalizado (Opcional)

1. No Netlify, vá em "Domain settings"
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções do Netlify

### Troubleshooting

**PWA não instala:**
- Verifique se os ícones existem e estão acessíveis
- Verifique se o `manifest.json` está correto
- Verifique se está usando HTTPS

**Service Worker não funciona:**
- Verifique o console do navegador para erros
- Certifique-se de que o arquivo `sw.js` está acessível
- Limpe o cache do navegador

**API retorna CORS:**
- A API deve permitir requisições do seu domínio
- Verifique se a API está configurada corretamente

**Player não carrega:**
- Verifique se o Clappr está carregando (console do navegador)
- Verifique se a URL do stream está correta
- Teste a URL do stream diretamente

## Estrutura Final no Netlify

```
/
├── index.html
├── player-pc.html
├── player-mobile.html
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512.png
├── css/
│   └── styles.css
└── js/
    ├── api.js
    └── player.js
```

## Suporte

Para problemas ou dúvidas, verifique:
- Console do navegador (F12)
- Network tab para ver requisições
- Application tab para verificar Service Worker e Cache
