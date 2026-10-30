/*
 * Conteúdo editável do site: serviços, categorias, trabalhos e marcas.
 * Para mudar um texto, edite entre as aspas. Para adicionar um item,
 * copie um bloco { ... }, cole abaixo e ajuste os campos.
 */
window.SITE_CONTEUDO = {
  servicos: [
    {
      titulo: "Conteúdo para marcas",
      descricao: "Reels, stories e posts para divulgar marcas no meu perfil, conectando produtos e experiências à minha rotina e à minha forma de criar conteúdo.",
      imagem: "assets/img/fotos/servico-marcas.jpg" // foto grande ao lado da lista
    },
    {
      titulo: "Conteúdo UGC",
      descricao: "Vídeos no estilo cliente real, produzidos para que as marcas utilizem em seus próprios canais de comunicação.",
      imagem: "assets/img/fotos/servico-ugc.jpg"
    },
    {
      titulo: "Produção de foto e vídeo",
      descricao: "Planejamento, captação, edição e entrega de conteúdos visuais pensados para comunicar ideias, experiências e produtos.",
      imagem: "assets/img/fotos/servico-producao.jpg"
    },
    {
      titulo: "Cobertura de eventos",
      descricao: "Registro e divulgação de eventos por meio de conteúdos que capturam momentos, experiências e detalhes importantes.",
      imagem: "assets/img/fotos/servico-eventos.jpg"
    },
    {
      titulo: "Resenha e experiência com produtos",
      descricao: "Teste e demonstração de produtos no dia a dia, apresentando experiências de forma natural e próxima.",
      imagem: "assets/img/fotos/servico-resenha.jpg"
    }
  ],

  // O "id" é usado no campo "categoria" de cada trabalho.
  categorias: [
    { id: "beleza", nome: "Beleza e Autocuidado" },
    { id: "moda", nome: "Moda" },
    { id: "saude", nome: "Saúde e Bem-estar" },
    { id: "eventos", nome: "Eventos" },
    { id: "viagem", nome: "Viagem e Lifestyle" },
    { id: "criacoes", nome: "Criações e Reflexões" }
  ],

  /*
   * Trabalhos. Cada item é um trabalho independente. Modelo:
   * {
   *   titulo: "Rotina de skincare com a marca X",
   *   categoria: "beleza",                         // um dos ids acima
   *   capa: "assets/img/capas/skincare-x.jpg",     // imagem vertical de preferência
   *   url: "https://www.instagram.com/reel/...",   // publicação original
   *   tipo: "reels",                               // "reels", "video" ou "post"
   *   descricao: "",                               // opcional
   *   video: ""                                    // opcional: "assets/video/arquivo.mp4" abre no visor do site
   * }
   */
  trabalhos: [],

  /*
   * Marcas. Logotipos em assets/img/logos/ (SVG ou PNG transparente).
   * Sem logo, o nome da marca aparece em tipografia no lugar.
   * Faltam os arquivos de Elseve, Mushin, Saint Germain e Scarlet.
   */
  marcas: [
    { nome: "Kibon", logo: "assets/img/logos/kibon.png" },
    { nome: "Keeta", logo: "assets/img/logos/keeta.png" },
    { nome: "Tampax", logo: "assets/img/logos/tampax.png" },
    { nome: "Mercado Livre", logo: "assets/img/logos/mercado-livre.png" },
    { nome: "Fanta", logo: "assets/img/logos/fanta.svg" },
    { nome: "Pantene", logo: "assets/img/logos/pantene.png" },
    { nome: "Verisure", logo: "assets/img/logos/verisure.png" },
    { nome: "Elseve", logo: "" },
    { nome: "L'Oréal", logo: "assets/img/logos/loreal.svg" },
    { nome: "Alva", logo: "assets/img/logos/alva.png" },
    { nome: "Mushin", logo: "" },
    { nome: "Aura Beauty", logo: "assets/img/logos/aura-beauty.png" },
    { nome: "Guava", logo: "assets/img/logos/guava.svg" },
    { nome: "Probiotica", logo: "assets/img/logos/probiotica.svg" },
    { nome: "Avozon", logo: "assets/img/logos/avozon.png" },
    { nome: "Saint Germain", logo: "" },
    { nome: "MAC", logo: "assets/img/logos/mac.png" },
    { nome: "Tupperware", logo: "assets/img/logos/tupperware.png" },
    { nome: "Avvi", logo: "assets/img/logos/avvi.svg" },
    { nome: "Oceane", logo: "assets/img/logos/oceane.png" },
    { nome: "Slow Beauty", logo: "assets/img/logos/slow-beauty.png" },
    { nome: "TAO DEO", logo: "assets/img/logos/tao-deo.png" },
    { nome: "Euro Relógios", logo: "assets/img/logos/euro-relogios.png" },
    { nome: "Scarlet", logo: "" },
    { nome: "GE Beauty", logo: "assets/img/logos/ge-beauty.svg" },
    { nome: "Rituária", logo: "assets/img/logos/rituaria.png" }
  ]
};
