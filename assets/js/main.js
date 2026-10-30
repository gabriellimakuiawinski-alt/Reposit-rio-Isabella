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
        else if (chave === "html") node.innerHTML = valor;
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
        setTimeout(function () { if (!menu.classList.contains("aberto")) menu.hidden = true; }, reduzirMovimento ? 0 : 250);
      }
    }

    botao.addEventListener("click", function () {
      abrir(botao.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) abrir(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
        abrir(false);
        botao.focus();
      }
    });
  }

  /* Sobre mim: texto completo */
  function iniciarSobre() {
    var botao = document.querySelector("[data-alternar-sobre]");
    var mais = document.getElementById("sobre-mais");
    if (!botao || !mais) return;
    var rotulo = botao.querySelector("[data-rotulo]");
    botao.addEventListener("click", function () {
      var aberto = botao.getAttribute("aria-expanded") !== "true";
      botao.setAttribute("aria-expanded", String(aberto));
      mais.classList.toggle("aberto", aberto);
      rotulo.textContent = aberto ? "Ler menos" : "Conheça a Isa";
    });
  }

  /* Serviços */
  var ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  function iniciarServicos() {
    var lista = document.querySelector("[data-servicos]");
    if (!lista || !conteudo.servicos) return;

    conteudo.servicos.forEach(function (servico, i) {
      var idPainel = "servico-" + i;
      var mensagem = String(config.mensagemServico || "").replace("{servico}", servico.titulo);

      var botao = el("button", {
        class: "servico__botao",
        type: "button",
        "aria-expanded": i === 0 ? "true" : "false",
        "aria-controls": idPainel
      }, [
        el("span", { class: "servico__numero", "aria-hidden": "true", text: ROMANOS[i] || String(i + 1) }),
        el("span", { class: "servico__titulo", text: servico.titulo }),
        el("span", { class: "servico__sinal", "aria-hidden": "true" })
      ]);

      var corpo = el("div", { class: "servico__corpo" }, [
        el("p", { class: "servico__descricao", text: servico.descricao }),
        botaoOrcamento("Solicitar orçamento", mensagem)
      ]);

      var interno = [corpo];
      if (servico.imagem) {
        interno.unshift(el("div", { class: "servico__imagem" }, [
          el("img", { src: servico.imagem, alt: "", loading: "lazy" })
        ]));
      }

      var painel = el("div", {
        class: "servico__painel" + (i === 0 ? " aberto" : ""),
        id: idPainel,
        role: "region",
        "aria-label": servico.titulo
      }, [el("div", { class: "servico__painel-interno" }, interno)]);

      var item = el("li", { class: "servico" + (i === 0 ? " servico--aberto" : "") }, [
        el("h3", { class: "servico__cabeca" }, [botao]),
        painel
      ]);
      lista.appendChild(item);
    });

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
      });
    });
  }

  /* Trabalhos e cases */
  var ROTULO_TIPO = { reels: "Reels", video: "Vídeo", post: "Publicação" };

  function iconeTipo(tipo) {
    var span = el("span", { class: "trabalho__tipo" });
    var desenho = tipo === "post"
      ? '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><rect x="1" y="1" width="10" height="10" fill="none" stroke="currentColor"/></svg>'
      : '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M3 1.5v9l7-4.5z" fill="currentColor"/></svg>';
    span.innerHTML = desenho + "<span>" + (ROTULO_TIPO[tipo] || "Publicação") + "</span>";
    return span;
  }

  function nomeCategoria(id) {
    var cat = (conteudo.categorias || []).filter(function (c) { return c.id === id; })[0];
    return cat ? cat.nome : "";
  }

  function cartaoTrabalho(trabalho, indice) {
    var formato = trabalho.tipo === "post" ? "quadrado" : "vertical";
    var capa = el("div", { class: "trabalho__capa" }, [
      trabalho.capa
        ? el("img", { src: trabalho.capa, alt: trabalho.titulo ? "Capa de " + trabalho.titulo : "", loading: "lazy", decoding: "async" })
        : null,
      iconeTipo(trabalho.tipo)
    ]);
    var legenda = el("div", { class: "trabalho__legenda" }, [
      el("span", { class: "trabalho__categoria", text: nomeCategoria(trabalho.categoria) }),
      trabalho.titulo ? el("span", { class: "trabalho__titulo", text: trabalho.titulo }) : null,
      trabalho.descricao ? el("span", { class: "trabalho__descricao", text: trabalho.descricao }) : null
    ]);

    var classe = "trabalho trabalho--" + formato;
    var alvo;
    if (trabalho.video) {
      alvo = el("button", { class: classe, type: "button", "data-video": trabalho.video, "aria-label": "Assistir " + (trabalho.titulo || "vídeo") });
    } else if (trabalho.url) {
      alvo = el("a", {
        class: classe, href: trabalho.url, target: "_blank", rel: "noopener",
        "aria-label": (trabalho.titulo || "Trabalho") + " (abre a publicação original em nova aba)"
      });
    } else {
      alvo = el("div", { class: classe });
    }
    alvo.style.setProperty("--i", indice);
    alvo.appendChild(capa);
    alvo.appendChild(legenda);
    return el("li", { class: "galeria__item" }, [alvo]);
  }

  function espacoReservado(categoriaId, indice) {
    var vertical = indice % 3 !== 1;
    var item = el("li", { class: "galeria__item" }, [
      el("div", { class: "trabalho trabalho--reservado trabalho--" + (vertical ? "vertical" : "quadrado"), "aria-hidden": "true" }, [
        el("div", { class: "trabalho__capa" }, [
          el("span", { class: "trabalho__aviso", text: vertical ? "Capa do Reels" : "Capa da publicação" })
        ]),
        el("div", { class: "trabalho__legenda" }, [
          el("span", { class: "trabalho__categoria", text: nomeCategoria(categoriaId) })
        ])
      ])
    ]);
    item.firstChild.style.setProperty("--i", indice);
    return item;
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
        class: "filtro",
        type: "button",
        role: "tab",
        id: "filtro-" + cat.id,
        "aria-selected": i === 0 ? "true" : "false",
        "aria-controls": "galeria",
        tabindex: i === 0 ? "0" : "-1",
        "data-categoria": cat.id,
        text: cat.nome
      }));
    });

    function montar(categoriaId) {
      var lista = el("ul", { class: "galeria__lista" });
      var itens = trabalhos.filter(function (t) { return categoriaId === "todos" || t.categoria === categoriaId; });

      if (itens.length) {
        itens.forEach(function (t, i) { lista.appendChild(cartaoTrabalho(t, i)); });
      } else if (config.mostrarEspacosReservados) {
        var ids = categoriaId === "todos" ? (conteudo.categorias || []).map(function (c) { return c.id; }) : [categoriaId, categoriaId, categoriaId];
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
        setTimeout(function () { galeria.style.minHeight = ""; }, 400);
      }, 180);
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
      var botao = e.target.closest("[data-video]");
      if (!botao) return;
      origem = botao;
      midia.replaceChildren(el("video", {
        src: botao.getAttribute("data-video"),
        controls: true,
        autoplay: true,
        playsinline: true
      }));
      visor.showModal();
    });

    function fechar() { visor.close(); }
    visor.querySelector("[data-fechar-visor]").addEventListener("click", fechar);
    visor.addEventListener("click", function (e) { if (e.target === visor) fechar(); });
    visor.addEventListener("close", function () {
      midia.replaceChildren();
      if (origem) origem.focus();
    });
  }

  /* Marcas */
  function iniciarMarcas() {
    var grade = document.querySelector("[data-marcas]");
    if (!grade || !conteudo.marcas) return;
    conteudo.marcas.forEach(function (marca) {
      var item = el("li", { class: "marca" + (marca.logo ? "" : " marca--sem-logo") });
      if (marca.logo) {
        item.appendChild(el("img", { src: marca.logo, alt: marca.nome, loading: "lazy", decoding: "async" }));
      } else {
        item.appendChild(el("span", { class: "marca__nome", text: marca.nome }));
      }
      grade.appendChild(item);
    });
  }

  /* Contato */
  function iniciarContato() {
    var area = document.querySelector("[data-contato]");
    if (!area) return;
    var temCanal = false;

    if (linkWhatsApp("")) {
      area.appendChild(botaoOrcamento("Solicitar orçamento pelo WhatsApp", config.mensagemGeral, "botao botao--grande"));
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

  /* Revelação discreta de títulos e fotos */
  function iniciarRevelar() {
    var alvos = document.querySelectorAll(".revelar");
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
    }, { rootMargin: "0px 0px -10% 0px" });
    alvos.forEach(function (a) { observador.observe(a); });
  }

  /* Topo muda de fundo após a abertura */
  function iniciarTopo() {
    var topo = document.getElementById("topo");
    if (!topo) return;
    var ultimo = false;
    function verificar() {
      var rolou = window.scrollY > 40;
      if (rolou !== ultimo) { topo.classList.toggle("topo--rolado", rolou); ultimo = rolou; }
    }
    window.addEventListener("scroll", verificar, { passive: true });
    verificar();
  }

  var ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = new Date().getFullYear();

  iniciarMenu();
  iniciarSobre();
  iniciarServicos();
  iniciarTrabalhos();
  iniciarMarcas();
  iniciarContato();
  iniciarRevelar();
  iniciarTopo();
  iniciarEntrada();
})();
