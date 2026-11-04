(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var conteudo = window.SITE_CONTEUDO || {};
  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs, filhos) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (chave) {
        var valor = attrs[chave];
        if (valor === null || valor === undefined || valor === false) return;
        if (chave === "text") node.textContent = valor;
        else node.setAttribute(chave, valor === true ? "" : valor);
      });
    }
    (filhos || []).forEach(function (filho) { if (filho) node.appendChild(filho); });
    return node;
  }

  function linkWhatsApp(mensagem) {
    var numero = String(config.whatsapp || "").replace(/\D/g, "");
    if (!numero) return null;
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
  }

  function botaoOrcamento(texto, mensagem, classe) {
    var href = linkWhatsApp(mensagem);
    // Sem número configurado, o botão leva até a seção de contato.
    return el("a", {
      class: classe || "botao",
      href: href || "#contato",
      target: href ? "_blank" : null,
      rel: href ? "noopener" : null,
      text: texto
    });
  }

  // Foto com espaço reservado: se o arquivo não existir, mostra a composição de luz.
  function foto(src, alt, tom, aviso, eager) {
    var caixa = el("div", { class: "foto " + (tom || "foto--quente") });
    if (src) {
      var img = el("img", { src: src, alt: alt || "", loading: eager ? null : "lazy", decoding: "async" });
      img.addEventListener("error", function () { caixa.classList.add("foto--vazia"); img.remove(); });
      caixa.appendChild(img);
    } else {
      caixa.classList.add("foto--vazia");
    }
    if (aviso) caixa.appendChild(el("span", { class: "foto__aviso", text: aviso }));
    return caixa;
  }

  /* Entrada da página */
  function iniciarEntrada() {
    requestAnimationFrame(function () {
      document.documentElement.classList.add("carregado");
    });
  }

  /* Menu do celular */
  function iniciarMenu() {
    var botao = document.querySelector(".menu-botao");
    var menu = document.getElementById("menu-movel");
    if (!botao || !menu) return;
    var rotulo = botao.querySelector(".menu-botao__texto");

    function abrir(aberto) {
      botao.setAttribute("aria-expanded", String(aberto));
      rotulo.textContent = aberto ? "Fechar" : "Menu";
      document.documentElement.classList.toggle("menu-aberto", aberto);
      if (aberto) {
        menu.hidden = false;
        requestAnimationFrame(function () { menu.classList.add("aberto"); });
        menu.querySelector("a").focus();
      } else {
        menu.classList.remove("aberto");
        setTimeout(function () { if (!menu.classList.contains("aberto")) menu.hidden = true; }, reduzirMovimento ? 0 : 300);
      }
    }

    botao.addEventListener("click", function () { abrir(botao.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) abrir(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && botao.getAttribute("aria-expanded") === "true") { abrir(false); botao.focus(); }
    });
  }

  /* Faixa contínua com os serviços */
  function iniciarFaixa() {
    var trilho = document.querySelector("[data-faixa]");
    if (!trilho || !conteudo.servicos) return;
    function grupo() {
      var g = el("div", { class: "faixa__grupo" });
      conteudo.servicos.forEach(function (s) {
        g.appendChild(el("span", { class: "faixa__item", text: s.titulo }));
        g.appendChild(el("span", { class: "faixa__estrela", text: "✦" }));
      });
      return g;
    }
    // Dois grupos idênticos: a animação desloca 50% e recomeça sem emenda.
    trilho.appendChild(grupo());
    trilho.appendChild(grupo());
  }

  /* Serviços: lista que abre um por vez e foto grande que acompanha */
  var ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  var TONS = ["foto--quente", "foto--oliva", "foto--areia", "foto--noite", "foto--rosa"];

  function iniciarServicos() {
    var lista = document.querySelector("[data-servicos]");
    var midia = document.querySelector("[data-servicos-midia]");
    if (!lista || !conteudo.servicos) return;

    var quadros = [];
    conteudo.servicos.forEach(function (servico, i) {
      if (midia) {
        var quadro = el("div", { class: "servicos__quadro" + (i === 0 ? " ativo" : "") }, [
          foto(servico.imagem, "", TONS[i % TONS.length], "Foto · " + servico.titulo)
        ]);
        midia.appendChild(quadro);
        quadros.push(quadro);
      }

      var idPainel = "servico-" + i;
      var mensagem = String(config.mensagemServico || "").replace("{servico}", servico.titulo);

      var botao = el("button", {
        class: "servico__botao", type: "button",
        "aria-expanded": i === 0 ? "true" : "false", "aria-controls": idPainel
      }, [
        el("span", { class: "servico__numero", "aria-hidden": "true", text: ROMANOS[i] || String(i + 1) }),
        el("span", { class: "servico__titulo", text: servico.titulo }),
        el("span", { class: "servico__sinal", "aria-hidden": "true" })
      ]);

      var painel = el("div", {
        class: "servico__painel" + (i === 0 ? " aberto" : ""), id: idPainel, role: "region", "aria-label": servico.titulo
      }, [el("div", { class: "servico__painel-interno" }, [
        el("div", { class: "servico__corpo" }, [
          el("p", { class: "servico__descricao", text: servico.descricao }),
          botaoOrcamento("Solicitar orçamento", mensagem)
        ])
      ])]);

      lista.appendChild(el("li", { class: "servico" + (i === 0 ? " servico--aberto" : ""), "data-indice": i }, [
        el("h3", { class: "servico__cabeca" }, [botao]),
        painel
      ]));
    });

    function mostrarQuadro(i) {
      quadros.forEach(function (q, j) { q.classList.toggle("ativo", j === i); });
    }

    lista.addEventListener("click", function (e) {
      var botao = e.target.closest(".servico__botao");
      if (!botao) return;
      var abrir = botao.getAttribute("aria-expanded") !== "true";
      lista.querySelectorAll(".servico").forEach(function (item) {
        var b = item.querySelector(".servico__botao");
        var ativo = abrir && b === botao;
        b.setAttribute("aria-expanded", String(ativo));
        item.classList.toggle("servico--aberto", ativo);
        item.querySelector(".servico__painel").classList.toggle("aberto", ativo);
        if (ativo) mostrarQuadro(Number(item.getAttribute("data-indice")));
      });
    });

    lista.addEventListener("mouseover", function (e) {
      var item = e.target.closest(".servico");
      if (item) mostrarQuadro(Number(item.getAttribute("data-indice")));
    });
    lista.addEventListener("mouseleave", function () {
      var aberto = lista.querySelector(".servico--aberto");
      if (aberto) mostrarQuadro(Number(aberto.getAttribute("data-indice")));
    });
  }

  /* Trabalhos e cases */
  var ROTULO_TIPO = { reels: "Reels", video: "Vídeo", post: "Publicação" };

  function nomeCategoria(id) {
    var cat = (conteudo.categorias || []).filter(function (c) { return c.id === id; })[0];
    return cat ? cat.nome : "";
  }

  function cartaoTrabalho(trabalho, indice) {
    var descricaoImagem = trabalho.titulo || ("Isa em " + nomeCategoria(trabalho.categoria));
    var capa = foto(trabalho.capa, descricaoImagem, TONS[indice % TONS.length]);
    capa.classList.add("trabalho__capa");
    if (trabalho.url || trabalho.video) {
      capa.appendChild(el("span", { class: "trabalho__tipo", text: ROTULO_TIPO[trabalho.tipo] || "Publicação" }));
    }

    var legenda = el("div", { class: "trabalho__legenda" }, [
      el("span", { class: "trabalho__categoria", text: nomeCategoria(trabalho.categoria) }),
      trabalho.titulo ? el("span", { class: "trabalho__titulo", text: trabalho.titulo }) : null,
      trabalho.descricao ? el("span", { class: "trabalho__descricao", text: trabalho.descricao }) : null
    ]);

    var alvo;
    if (trabalho.video) {
      alvo = el("button", { class: "trabalho", type: "button", "data-video": trabalho.video, "aria-label": "Assistir " + (trabalho.titulo || "vídeo") });
    } else if (trabalho.url) {
      alvo = el("a", { class: "trabalho", href: trabalho.url, target: "_blank", rel: "noopener", "aria-label": (trabalho.titulo || "Trabalho") + " (abre a publicação original em nova aba)" });
    } else if (trabalho.capa) {
      // Sem link: a foto abre ampliada no próprio site.
      alvo = el("button", { class: "trabalho", type: "button", "data-imagem": trabalho.capa, "data-alt": descricaoImagem, "aria-label": "Ampliar foto: " + descricaoImagem });
    } else {
      alvo = el("div", { class: "trabalho" });
    }
    alvo.appendChild(capa);
    alvo.appendChild(legenda);
    alvo.style.setProperty("--i", indice);
    return el("li", { class: "galeria__item" }, [alvo]);
  }

  function espacoReservado(categoriaId, indice) {
    var capa = el("div", { class: "foto trabalho__capa foto--vazia " + TONS[indice % TONS.length] }, [
      el("span", { class: "foto__aviso", text: "Capa do trabalho" })
    ]);
    var alvo = el("div", { class: "trabalho trabalho--reservado", "aria-hidden": "true" }, [
      capa,
      el("div", { class: "trabalho__legenda" }, [
        el("span", { class: "trabalho__categoria", text: nomeCategoria(categoriaId) }),
        el("span", { class: "trabalho__titulo", text: "Em breve" })
      ])
    ]);
    alvo.style.setProperty("--i", indice);
    return el("li", { class: "galeria__item" }, [alvo]);
  }

  function iniciarTrabalhos() {
    var filtros = document.querySelector("[data-filtros]");
    var galeria = document.querySelector("[data-galeria]");
    if (!filtros || !galeria) return;

    var categorias = [{ id: "todos", nome: "Todos" }].concat(conteudo.categorias || []);
    var trabalhos = conteudo.trabalhos || [];
    var atual = "todos";

    categorias.forEach(function (cat, i) {
      filtros.appendChild(el("button", {
        class: "filtro", type: "button", role: "tab", id: "filtro-" + cat.id,
        "aria-selected": i === 0 ? "true" : "false", "aria-controls": "galeria",
        tabindex: i === 0 ? "0" : "-1", "data-categoria": cat.id, text: cat.nome
      }));
    });

    function montar(categoriaId) {
      var lista = el("ul", { class: "galeria__lista" });
      var itens = trabalhos.filter(function (t) { return categoriaId === "todos" || t.categoria === categoriaId; });

      if (itens.length) {
        itens.forEach(function (t, i) { lista.appendChild(cartaoTrabalho(t, i)); });
      } else if (config.mostrarEspacosReservados) {
        var ids = categoriaId === "todos"
          ? (conteudo.categorias || []).map(function (c) { return c.id; }).concat(["beleza", "moda", "eventos"])
          : [categoriaId, categoriaId, categoriaId, categoriaId, categoriaId];
        ids.forEach(function (id, i) { lista.appendChild(espacoReservado(id, i)); });
      } else {
        var vazio = el("div", { class: "galeria__vazio" }, [
          el("p", { text: categoriaId === "todos" ? "Os trabalhos chegam aqui em breve." : "Os trabalhos de " + nomeCategoria(categoriaId) + " chegam aqui em breve." })
        ]);
        if (config.instagram) {
          vazio.appendChild(el("a", { class: "link-sublinhado", href: "https://www.instagram.com/" + config.instagram + "/", target: "_blank", rel: "noopener", text: "Enquanto isso, veja meu Instagram" }));
        }
        galeria.replaceChildren(vazio);
        return;
      }
      galeria.replaceChildren(lista);
    }

    function selecionar(botao, focar) {
      var id = botao.getAttribute("data-categoria");
      filtros.querySelectorAll(".filtro").forEach(function (b) {
        var ativo = b === botao;
        b.setAttribute("aria-selected", String(ativo));
        b.setAttribute("tabindex", ativo ? "0" : "-1");
      });
      galeria.setAttribute("aria-labelledby", botao.id);
      if (focar) botao.focus();
      if (id === atual) return;
      atual = id;

      if (reduzirMovimento) { montar(id); return; }
      // Mantém a altura durante a troca para evitar saltos na página.
      galeria.style.minHeight = galeria.offsetHeight + "px";
      galeria.classList.add("trocando");
      setTimeout(function () {
        montar(id);
        galeria.classList.remove("trocando");
        setTimeout(function () { galeria.style.minHeight = ""; }, 500);
      }, 220);
    }

    filtros.addEventListener("click", function (e) {
      var botao = e.target.closest(".filtro");
      if (botao) selecionar(botao);
    });

    filtros.addEventListener("keydown", function (e) {
      var botoes = Array.prototype.slice.call(filtros.querySelectorAll(".filtro"));
      var i = botoes.indexOf(document.activeElement);
      if (i < 0) return;
      var proximo = null;
      if (e.key === "ArrowRight") proximo = botoes[(i + 1) % botoes.length];
      else if (e.key === "ArrowLeft") proximo = botoes[(i - 1 + botoes.length) % botoes.length];
      else if (e.key === "Home") proximo = botoes[0];
      else if (e.key === "End") proximo = botoes[botoes.length - 1];
      if (proximo) {
        e.preventDefault();
        selecionar(proximo, true);
        proximo.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    });

    // Foco: ao passar o mouse num trabalho, os outros recuam (inspirado em focus-cards).
    galeria.addEventListener("mouseover", function (e) {
      var item = e.target.closest(".galeria__item");
      galeria.classList.toggle("com-foco", !!item);
      galeria.querySelectorAll(".galeria__item").forEach(function (li) { li.classList.toggle("em-foco", li === item); });
    });
    galeria.addEventListener("mouseleave", function () {
      galeria.classList.remove("com-foco");
    });

    galeria.setAttribute("aria-labelledby", "filtro-todos");
    montar(atual);
    iniciarVisor(galeria);
  }

  /* Visor de vídeo */
  function iniciarVisor(galeria) {
    var visor = document.querySelector("[data-visor]");
    var midia = document.querySelector("[data-visor-midia]");
    if (!visor || !midia || typeof visor.showModal !== "function") return;
    var origem = null;

    galeria.addEventListener("click", function (e) {
      var botao = e.target.closest("[data-video], [data-imagem]");
      if (!botao) return;
      origem = botao;
      if (botao.hasAttribute("data-video")) {
        midia.replaceChildren(el("video", { src: botao.getAttribute("data-video"), controls: true, autoplay: true, playsinline: true }));
      } else {
        midia.replaceChildren(el("img", { src: botao.getAttribute("data-imagem"), alt: botao.getAttribute("data-alt") || "" }));
      }
      visor.showModal();
    });

    function fechar() { visor.close(); }
    visor.querySelector("[data-fechar-visor]").addEventListener("click", fechar);
    visor.addEventListener("click", function (e) { if (e.target === visor) fechar(); });
    visor.addEventListener("close", function () { midia.replaceChildren(); if (origem) origem.focus(); });
  }

  /* Marcas */
  function iniciarMarcas() {
    var grade = document.querySelector("[data-marcas]");
    var contagem = document.querySelector("[data-marcas-contagem]");
    if (!grade || !conteudo.marcas) return;
    if (contagem) contagem.textContent = conteudo.marcas.length + " marcas com quem já criei";

    conteudo.marcas.forEach(function (marca) {
      var item = el("li", { class: "marca" });
      var nome = el("span", { class: "marca__nome", text: marca.nome });
      if (marca.logo) {
        var img = el("img", { src: marca.logo, alt: marca.nome, loading: "lazy", decoding: "async" });
        img.addEventListener("error", function () { img.replaceWith(nome); item.classList.add("marca--sem-logo"); });
        // Logos quadrados ou verticais ganham mais altura para ter o mesmo peso visual dos horizontais.
        img.addEventListener("load", function () {
          if (img.naturalWidth / img.naturalHeight < 1.6) item.classList.add("marca--quadrada");
        });
        item.appendChild(img);
      } else {
        item.classList.add("marca--sem-logo");
        item.appendChild(nome);
      }
      grade.appendChild(item);
    });
  }

  /* Cupons: toque para copiar */
  function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(texto);
    return new Promise(function (ok, falha) {
      var campo = el("textarea", { readonly: true, style: "position:fixed;opacity:0" });
      campo.value = texto;
      document.body.appendChild(campo);
      campo.select();
      try { document.execCommand("copy") ? ok() : falha(); } catch (e) { falha(e); }
      campo.remove();
    });
  }

  function iniciarCupons() {
    var grade = document.querySelector("[data-cupons]");
    var aviso = document.querySelector("[data-cupom-aviso]");
    if (!grade || !conteudo.cupons) return;

    conteudo.cupons.forEach(function (cupom) {
      var marca = cupom.logo
        ? el("img", { class: "cupom__logo", src: cupom.logo, alt: cupom.marca, loading: "lazy" })
        : el("span", { class: "cupom__nome", text: cupom.marca });
      var botao = el("button", { class: "cupom", type: "button", "data-codigo": cupom.codigo, "aria-label": "Copiar cupom " + cupom.codigo + " da " + cupom.marca }, [
        el("span", { class: "cupom__marca" }, [marca]),
        el("span", { class: "cupom__codigo", text: cupom.codigo }),
        el("span", { class: "cupom__acao", "aria-hidden": "true", text: "Copiar cupom" })
      ]);
      grade.appendChild(el("li", null, [botao]));
    });

    grade.addEventListener("click", function (e) {
      var botao = e.target.closest(".cupom");
      if (!botao) return;
      var codigo = botao.getAttribute("data-codigo");
      var acao = botao.querySelector(".cupom__acao");
      copiarTexto(codigo).then(function () {
        botao.classList.add("copiado");
        acao.textContent = "Copiado!";
        if (aviso) aviso.textContent = "Cupom " + codigo + " copiado.";
        setTimeout(function () { botao.classList.remove("copiado"); acao.textContent = "Copiar cupom"; }, 2200);
      }, function () {
        acao.textContent = "Selecione e copie: " + codigo;
      });
    });
  }

  /* Contato */
  function iniciarContato() {
    var area = document.querySelector("[data-contato]");
    if (!area) return;
    var temCanal = false;

    if (linkWhatsApp("")) {
      area.appendChild(botaoOrcamento("Solicitar orçamento pelo WhatsApp", config.mensagemGeral, "botao botao--claro"));
      temCanal = true;
    }

    var lista = el("ul", { class: "contato__canais" });
    if (config.instagram) {
      lista.appendChild(el("li", null, [el("a", {
        class: "link-sublinhado", href: "https://www.instagram.com/" + config.instagram + "/", target: "_blank", rel: "noopener",
        text: "Instagram @" + config.instagram
      })]));
    }
    if (config.email) {
      lista.appendChild(el("li", null, [el("a", { class: "link-sublinhado", href: "mailto:" + config.email, text: config.email })]));
    }
    if (lista.children.length) { area.appendChild(lista); temCanal = true; }

    if (!temCanal) {
      area.appendChild(el("p", { class: "contato__pendente", text: "Os canais de contato serão publicados em breve." }));
    }
  }

  /* Entrada com desfoque (inspirado em blur-fade) */
  function iniciarSurgir() {
    var alvos = document.querySelectorAll(".surgir");
    if (reduzirMovimento || !("IntersectionObserver" in window)) {
      alvos.forEach(function (a) { a.classList.add("visivel"); });
      return;
    }
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    alvos.forEach(function (a) { observador.observe(a); });
  }

  /* Frase que acende palavra por palavra ao rolar (inspirado em text-reveal, sem prender a rolagem) */
  function iniciarRevelarPalavras() {
    var frase = document.querySelector("[data-revelar-palavras]");
    if (!frase) return;
    var texto = frase.textContent.trim();
    frase.setAttribute("aria-label", texto);
    frase.textContent = "";
    var palavras = texto.split(/\s+/).map(function (p) {
      var s = el("span", { class: "palavra", "aria-hidden": "true", text: p });
      frase.appendChild(s);
      frase.appendChild(document.createTextNode(" "));
      return s;
    });
    if (reduzirMovimento) { palavras.forEach(function (p) { p.classList.add("acesa"); }); return; }

    var agendado = false;
    function atualizar() {
      agendado = false;
      var r = frase.getBoundingClientRect();
      var alto = window.innerHeight;
      // 0 quando a frase entra por baixo, 1 quando chega a 35% do topo
      var progresso = Math.min(1, Math.max(0, (alto - r.top) / (alto * 0.65 + r.height * 0.5)));
      var acesas = Math.round(progresso * palavras.length);
      palavras.forEach(function (p, i) { p.classList.toggle("acesa", i < acesas); });
    }
    window.addEventListener("scroll", function () {
      if (!agendado) { agendado = true; requestAnimationFrame(atualizar); }
    }, { passive: true });
    atualizar();
  }

  /* Topo: transparente sobre a abertura, sólido depois */
  function iniciarTopo() {
    var topo = document.getElementById("topo");
    var hero = document.getElementById("inicio");
    if (!topo || !hero) return;
    var ultimo = null;
    function verificar() {
      var rolou = window.scrollY > 40;
      if (rolou !== ultimo) { topo.classList.toggle("topo--solido", rolou); ultimo = rolou; }
    }
    window.addEventListener("scroll", verificar, { passive: true });
    window.addEventListener("resize", verificar);
    verificar();
  }

  /* Leve deslocamento da foto da abertura ao rolar */
  function iniciarParallaxHero() {
    var midia = document.querySelector(".hero__midia");
    if (!midia || reduzirMovimento) return;
    var agendado = false;
    window.addEventListener("scroll", function () {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(function () {
        agendado = false;
        var y = Math.min(window.scrollY, window.innerHeight);
        midia.style.transform = "translate3d(0," + (y * 0.18).toFixed(1) + "px,0)";
      });
    }, { passive: true });
  }

  /* Maré: quando o contato entra na tela, a onda sobe e revela o vídeo */
  function iniciarMare() {
    var arco = document.querySelector("[data-mare]");
    var secao = document.getElementById("contato");
    if (!arco || !secao) return;
    if (reduzirMovimento || !("IntersectionObserver" in window)) {
      arco.classList.add("mare-subiu");
      secao.classList.add("mar-chegou");
      return;
    }
    // Sem @property o --mare não anima; nesse caso o vídeo só aparece.
    if (!(window.CSS && CSS.registerProperty)) {
      var janela = arco.querySelector(".contato__janela");
      if (janela) janela.style.setProperty("--mare", "0%");
    }
    new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        if (entrada.target === secao) secao.classList.add("mar-chegou");
        else arco.classList.add("mare-subiu");
        obs.unobserve(entrada.target);
      });
    }, { threshold: [0.25] }).observe(secao);
    new IntersectionObserver(function (entradas, obs) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        arco.classList.add("mare-subiu");
        obs.disconnect();
      });
    }, { threshold: 0.45 }).observe(arco);
  }

  /* Vídeos do mar: tocam só quando estão na tela */
  function iniciarMar() {
    var videos = document.querySelectorAll("[data-video-mar]");
    if (!videos.length) return;
    if (reduzirMovimento || !("IntersectionObserver" in window)) {
      videos.forEach(function (v) { if (v.hasAttribute("poster")) v.setAttribute("controls", ""); });
      return;
    }
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        var v = entrada.target;
        if (entrada.isIntersecting) {
          var tocando = v.play();
          if (tocando && tocando.catch) tocando.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { rootMargin: "100px 0px" });
    videos.forEach(function (v) { observador.observe(v); });
  }

  var ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = new Date().getFullYear();

  iniciarMenu();
  iniciarFaixa();
  iniciarServicos();
  iniciarTrabalhos();
  iniciarMarcas();
  iniciarCupons();
  iniciarContato();
  iniciarSurgir();
  iniciarRevelarPalavras();
  iniciarTopo();
  iniciarParallaxHero();
  iniciarMar();
  iniciarMare();
  iniciarEntrada();
})();
