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

## Fotos e vídeos

As fotos ficam em `assets/img/fotos/`. Para trocar uma foto, salve a nova com o mesmo nome:

```
hero.jpg                abertura (horizontal; hoje: selfie de jaqueta preta)
sobre-1/2/3.jpg         colagem da seção Sobre mim (trem e porta vermelha)
retrato-praia.jpg       foto ao lado da frase "Tudo pelo meu olhar"
fora-1/2/3.jpg          colagem da seção Fora das telas (exposição, skate, cidade)
faixa-mirante.jpg       faixa larga de foto antes dos serviços
servico-*.jpg           uma foto por serviço; troca ao escolher o serviço
mar-poster.jpg          quadro mostrado antes do vídeo do mar carregar
```

Capas dos trabalhos: `assets/img/capas/`. Vídeos: `assets/video/mar.mp4` (o vídeo no arco do contato) e `assets/video/mar-fundo.mp4` (textura de mar desfocada no fundo, recortada do mesmo vídeo). Os dois vão e voltam para o loop não ter corte, e só tocam quando estão na tela.

Antes de subir fotos novas, exporte em JPG com até 1800 px no lado maior.

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

Sem `url`, o clique amplia a foto no próprio site. Os trabalhos atuais ainda não têm link: preencha `url` com o endereço da publicação no Instagram ou TikTok.

## Logotipos

22 das 26 marcas já têm logotipo em `assets/img/logos/`, baixados dos sites oficiais das marcas, da Wikimedia Commons e do Seeklogo. Faltam Elseve, Mushin, Saint Germain e Scarlet, que aparecem com o nome em tipografia.

Para trocar ou adicionar um logo, salve o arquivo (SVG ou PNG com fundo transparente) em `assets/img/logos/` e preencha o campo `logo` da marca em `conteudo.js`. No computador, os logos ficam em tom neutro e ganham cor ao passar o mouse; no celular, aparecem sempre coloridos.

## Compartilhamento em redes sociais

Salve uma imagem 1200×630 em `assets/img/fotos/compartilhamento.jpg` e descomente a linha `og:image` no `<head>` do `index.html`. Ao publicar, troque o caminho pelo endereço completo do site.
