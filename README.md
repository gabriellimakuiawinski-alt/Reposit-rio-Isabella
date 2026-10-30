# Isabella Kuiawinski · site portfólio

Site estático (HTML, CSS e JavaScript puros). Não precisa de instalação nem de build: abra `index.html` no navegador ou publique a pasta em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, Instagram, e-mail e mensagens automáticas | `assets/js/config.js` |
| Serviços, categorias, trabalhos e marcas | `assets/js/conteudo.js` |
| Textos da abertura, Sobre mim e Contato | `index.html` |
| Cores, fontes e layout | `assets/css/styles.css` (cores no topo, em `:root`) |

Campos de contato vazios não aparecem no site. Sem número de WhatsApp, os botões "Solicitar orçamento" levam até a seção de contato.

## Fotos e arquivos

```
assets/img/fotos/     fotografias pessoais
  hero.jpg            foto da abertura (vertical, mínimo 1200 px de altura)
  sobre.jpg           foto da seção Sobre mim (vertical)
assets/img/capas/     capas dos trabalhos (de preferência verticais, 9:16)
assets/img/logos/     logotipos oficiais (SVG ou PNG com fundo transparente)
assets/img/graficos/  favicon e elementos gráficos
assets/video/         vídeos que abrem no visor do próprio site
```

Para a abertura e o Sobre mim, basta salvar a foto com o nome indicado. Enquanto o arquivo não existe, aparece uma moldura com "Foto da Isa".

Antes de subir as fotos, exporte em JPG ou WebP com até 1600 px no lado maior.

## Adicionar um trabalho

Em `assets/js/conteudo.js`, dentro de `trabalhos: [ ]`:

```js
{
  titulo: "Nome do conteúdo",
  categoria: "beleza",            // beleza, moda, saude, eventos, viagem ou criacoes
  capa: "assets/img/capas/arquivo.jpg",
  url: "https://www.instagram.com/reel/...",
  tipo: "reels",                  // reels, video ou post
  descricao: ""                   // opcional
},
```

Com `url`, o clique abre a publicação original em nova aba. Para abrir um vídeo no próprio site, preencha `video: "assets/video/arquivo.mp4"`.

Enquanto não há trabalhos, a galeria mostra molduras de exemplo. Antes de publicar, mude `mostrarEspacosReservados` para `false` em `config.js`.

## Adicionar um logotipo

Salve o arquivo oficial em `assets/img/logos/` e preencha o campo `logo` da marca em `conteudo.js`, por exemplo `{ nome: "Kibon", logo: "assets/img/logos/kibon.svg" }`. Sem logotipo, aparece o nome da marca em texto simples.

## Compartilhamento em redes sociais

Salve uma imagem 1200×630 em `assets/img/fotos/compartilhamento.jpg` e descomente a linha `og:image` no `<head>` do `index.html`. Ao publicar, troque o caminho pelo endereço completo do site.
