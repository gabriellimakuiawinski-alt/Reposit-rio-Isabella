# Ferramentas do Claude neste repositório

**MCPs (`.mcp.json`)**
- `shadcn` (shadcn@4.23.0): componentes shadcn/ui.
- `magic` (@21st-dev/magic@0.2.3): precisa da variável de ambiente `TWENTYFIRST_API_KEY` (chave em https://21st.dev/magic/console). Não commitar a chave.
- `chrome-devtools` (chrome-devtools-mcp@1.12.0): usa o Chromium do ambiente de nuvem (`/opt/pw-browsers/chromium`), em headless e sem sandbox. Num computador local, remova `--executablePath` e as opções `--chrome-arg` de `.mcp.json`.

**Skills (`.claude/skills/`)**
- `frontend-design` (anthropics/skills)
- `web-design-guidelines` (vercel-labs/agent-skills), com cópia local das regras em `command.md`
