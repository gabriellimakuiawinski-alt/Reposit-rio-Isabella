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
      imagem: "" // opcional, ex.: "assets/img/graficos/servico-marcas.jpg"
    },
    {
      titulo: "Conteúdo UGC",
      descricao: "Vídeos no estilo cliente real, produzidos para que as marcas utilizem em seus próprios canais de comunicação.",
      imagem: ""
    },
    {
      titulo: "Produção de foto e vídeo",
      descricao: "Planejamento, captação, edição e entrega de conteúdos visuais pensados para comunicar ideias, experiências e produtos.",
      imagem: ""
    },
    {
      titulo: "Cobertura de eventos",
      descricao: "Registro e divulgação de eventos por meio de conteúdos que capturam momentos, experiências e detalhes importantes.",
      imagem: ""
    },
    {
      titulo: "Resenha e experiência com produtos",
      descricao: "Teste e demonstração de produtos no dia a dia, apresentando experiências de forma natural e próxima.",
      imagem: ""
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
   * Marcas. Quando tiver o arquivo oficial do logotipo, salve em
   * assets/img/logos/ e preencha "logo" com o caminho (SVG ou PNG transparente).
   * Sem logo, o nome da marca aparece no lugar.
   */
  marcas: [
    { nome: "Kibon", logo: "" },
    { nome: "Keeta", logo: "" },
    { nome: "Tampax", logo: "" },
    { nome: "Mercado Livre", logo: "" },
    { nome: "Fanta", logo: "" },
    { nome: "Pantene", logo: "" },
    { nome: "Verisure", logo: "" },
    { nome: "Elseve", logo: "" },
    { nome: "L'Oréal", logo: "" },
    { nome: "Alva", logo: "" },
    { nome: "Mushin", logo: "" },
    { nome: "Aura Beauty", logo: "" },
    { nome: "Guava", logo: "" },
    { nome: "Probiotica", logo: "" },
    { nome: "Avozon", logo: "" },
    { nome: "Saint Germain", logo: "" },
    { nome: "MAC", logo: "" },
    { nome: "Tupperware", logo: "" },
    { nome: "Avvi", logo: "" },
    { nome: "Oceane", logo: "" },
    { nome: "Slow Beauty", logo: "" },
    { nome: "TAO DEO", logo: "" },
    { nome: "Euro Relógios", logo: "" },
    { nome: "Scarlet", logo: "" },
    { nome: "GE Beauty", logo: "" },
    { nome: "Rituária", logo: "" }
  ]
};
