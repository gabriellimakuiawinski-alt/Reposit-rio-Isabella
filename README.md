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

O site foi desenhado para fotos grandes. Enquanto um arquivo não existe, aparece uma composição de luz com uma etiqueta dizendo qual foto vai ali. Basta salvar a foto com o nome indicado:

```
assets/img/fotos/
  hero.jpg              abertura em tela cheia (mínimo 2000 px no lado maior)
  sobre-1.jpg           retrato em arco da seção Sobre mim (vertical)
  sobre-2.jpg           detalhe do studio de cílios (vertical)
  sobre-3.jpg           peças de crochê (quadrada)
  servico-marcas.jpg    uma foto por serviço (vertical), troca ao escolher o serviço
  servico-ugc.jpg
  servico-producao.jpg
  servico-eventos.jpg
  servico-resenha.jpg
  contato.jpg           fundo da seção de contato (horizontal)
assets/img/capas/       capas dos trabalhos (3:4)
assets/img/logos/       logotipos das marcas
assets/video/           vídeos que abrem no visor do próprio site
```

Antes de subir as fotos, exporte em JPG ou WebP com até 2000 px no lado maior.

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

## Logotipos

22 das 26 marcas já têm logotipo em `assets/img/logos/`, baixados dos sites oficiais das marcas, da Wikimedia Commons e do Seeklogo. Faltam Elseve, Mushin, Saint Germain e Scarlet, que aparecem com o nome em tipografia.

Para trocar ou adicionar um logo, salve o arquivo (SVG ou PNG com fundo transparente) em `assets/img/logos/` e preencha o campo `logo` da marca em `conteudo.js`. No computador, os logos ficam em tom neutro e ganham cor ao passar o mouse; no celular, aparecem sempre coloridos.

## Compartilhamento em redes sociais

Salve uma imagem 1200×630 em `assets/img/fotos/compartilhamento.jpg` e descomente a linha `og:image` no `<head>` do `index.html`. Ao publicar, troque o caminho pelo endereço completo do site.
