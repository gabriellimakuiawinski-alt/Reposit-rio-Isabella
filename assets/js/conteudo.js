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
  // Preencha "url" com o link da publicação original para o trabalho abrir no Instagram/TikTok.
  trabalhos: [
    { titulo: "Kibon", categoria: "eventos", capa: "assets/img/capas/reel-01.jpg", url: "https://www.instagram.com/reel/DU8vTQLiQum/", tipo: "reels" },
    { titulo: "Océane Edition", categoria: "beleza", capa: "assets/img/capas/reel-13.jpg", url: "https://www.instagram.com/reel/DaOq7L7iZ8G/", tipo: "reels" },
    { titulo: "Eu só uso MAC", categoria: "beleza", capa: "assets/img/capas/reel-10.jpg", url: "https://www.instagram.com/reel/DYuodnCijFb/", tipo: "reels" },
    { titulo: "212 Mansion", categoria: "eventos", capa: "assets/img/capas/reel-18.jpg", url: "https://www.instagram.com/reel/Db1bRWjiJeZ/", tipo: "reels" },
    { titulo: "Yoga Sunset by Scarlet", categoria: "saude", capa: "assets/img/capas/reel-11.jpg", url: "https://www.instagram.com/reel/DZAp7iBiva1/", tipo: "reels" },
    { titulo: "Avozon", categoria: "beleza", capa: "assets/img/capas/reel-06.jpg", url: "https://www.instagram.com/reel/DXfQ2sDCYuX/", tipo: "reels" },
    { titulo: "Probiótica", categoria: "saude", capa: "assets/img/capas/reel-02.jpg", url: "https://www.instagram.com/reel/DVDv7RfF4aF/", tipo: "reels" },
    { titulo: "Um dia comigo criando conteúdo", categoria: "criacoes", capa: "assets/img/capas/reel-14.jpg", url: "https://www.instagram.com/reel/Dav8E8tBiI1/", tipo: "reels" },
    { titulo: "Outfit check", categoria: "moda", capa: "assets/img/capas/reel-08.jpg", url: "https://www.instagram.com/reel/DYiOsAHCKJl/", tipo: "reels" },
    { titulo: "Vale o hype?", categoria: "beleza", capa: "assets/img/capas/reel-15.jpg", url: "https://www.instagram.com/reel/DbEfvo8iTaw/", tipo: "reels" },
    { titulo: "Uma noite na Casa Laces", categoria: "eventos", capa: "assets/img/capas/reel-16.jpg", url: "https://www.instagram.com/reel/DbUGDuJBvEz/", tipo: "reels" },
    { titulo: "3 coisas que consumo na internet", categoria: "criacoes", capa: "assets/img/capas/reel-17.jpg", url: "https://www.instagram.com/reel/DbWl_xciHZB/", tipo: "reels" },
    { titulo: "Óleo de avocado Avozon", categoria: "beleza", capa: "assets/img/capas/reel-09.jpg", url: "https://www.instagram.com/reel/DY5mC-0izSm/", tipo: "reels" },
    { titulo: "", categoria: "beleza", capa: "assets/img/capas/reel-05.jpg", url: "https://www.instagram.com/reel/DV045iwDV7t/", tipo: "reels" },
    { titulo: "", categoria: "moda", capa: "assets/img/capas/reel-07.jpg", url: "https://www.instagram.com/reel/DYAwW70SjKO/", tipo: "reels" },
    { titulo: "", categoria: "moda", capa: "assets/img/capas/reel-12.jpg", url: "https://www.instagram.com/reel/DZtFYEDCmIg/", tipo: "reels" },
    { titulo: "", categoria: "moda", capa: "assets/img/capas/reel-04.jpg", url: "https://www.instagram.com/reel/DVhb70nCT-H/", tipo: "reels" },
    { titulo: "", categoria: "criacoes", capa: "assets/img/capas/reel-03.jpg", url: "https://www.instagram.com/reel/DVZngx6gUer/", tipo: "reels" },
    { titulo: "", categoria: "eventos", capa: "assets/img/capas/reel-19.jpg", url: "https://www.instagram.com/reel/DcoeoQbgLmQ/", tipo: "reels" },
    { titulo: "TAO DEO", categoria: "beleza", capa: "assets/img/capas/tao-deo.jpg", url: "", tipo: "post" },
    { titulo: "", categoria: "viagem", capa: "assets/img/capas/mirante.jpg", url: "", tipo: "post" }
  ],

  /*
   * Marcas. Logotipos em assets/img/logos/ (SVG ou PNG transparente).
   * Sem logo, o nome da marca aparece em tipografia no lugar.
   * Faltam os arquivos de Elseve e Mushin.
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
    { nome: "Saint Germain", logo: "assets/img/logos/saint-germain.png" },
    { nome: "MAC", logo: "assets/img/logos/mac.png" },
    { nome: "Tupperware", logo: "assets/img/logos/tupperware.png" },
    { nome: "Avvi", logo: "assets/img/logos/avvi.svg" },
    { nome: "Oceane", logo: "assets/img/logos/oceane.png" },
    { nome: "Slow Beauty", logo: "assets/img/logos/slow-beauty.png" },
    { nome: "TAO DEO", logo: "assets/img/logos/tao-deo.png" },
    { nome: "Euro Relógios", logo: "assets/img/logos/euro-relogios.png" },
    { nome: "Scarlet", logo: "assets/img/logos/scarlet.png" },
    { nome: "GE Beauty", logo: "assets/img/logos/ge-beauty.svg" },
    { nome: "Rituária", logo: "assets/img/logos/rituaria.png" },
    { nome: "Vans", logo: "assets/img/logos/vans.svg" },
    { nome: "Granado", logo: "assets/img/logos/granado.png" },
    { nome: "Phebo", logo: "assets/img/logos/phebo.png" },
    { nome: "Braé", logo: "assets/img/logos/brae.png" }
  ],

  /*
   * Cupons de desconto. "logo" é opcional (usa os arquivos de assets/img/logos/).
   */
  cupons: [
    { marca: "Vans", codigo: "VANSCREWBELLA", logo: "assets/img/logos/vans.svg" },
    { marca: "Océane", codigo: "BELLA", logo: "assets/img/logos/oceane.png" },
    { marca: "Guava", codigo: "BELLAGUAVA", logo: "assets/img/logos/guava.svg" },
    { marca: "Aura Beauty", codigo: "AURABELLA", logo: "assets/img/logos/aura-beauty.png" },
    { marca: "Granado", codigo: "GRA-Isabella", logo: "assets/img/logos/granado.png" },
    { marca: "Phebo", codigo: "PHE-essencialmenteIsa", logo: "assets/img/logos/phebo.png" },
    { marca: "Mushin", codigo: "ISABELLA", logo: "" },
    { marca: "Avozon", codigo: "ISABELLA10", logo: "assets/img/logos/avozon.png" },
    { marca: "Alva Personal Care", codigo: "ISABELLAK10", logo: "assets/img/logos/alva.png" },
    { marca: "Saint Germain", codigo: "A-SGISABELLAPA", logo: "assets/img/logos/saint-germain.png" },
    { marca: "TAO DEO", codigo: "ISA10", logo: "assets/img/logos/tao-deo.png" },
    { marca: "GE Beauty", codigo: "ISABELLA10", logo: "assets/img/logos/ge-beauty.svg" },
    { marca: "Scarlet", codigo: "SCARLETISA", logo: "assets/img/logos/scarlet.png" },
    { marca: "Rituária", codigo: "RITISAAHOLIVR", logo: "assets/img/logos/rituaria.png" },
    { marca: "Slow Beauty", codigo: "ISABELLA", logo: "assets/img/logos/slow-beauty.png" },
    { marca: "Euro Relógios", codigo: "ISABELLA-689", logo: "assets/img/logos/euro-relogios.png" },
    { marca: "Braé", codigo: "ESSENCIALMENTEISA", logo: "assets/img/logos/brae.png" }
  ]
};
