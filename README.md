# Vibe Coding — apresentação do hackathon

Apresentação HTML para o bloco de vibe coding de um hackathon voltado à comunidade LGBTQIAPN+.

O bloco acontece depois das aulas de Design Thinking, Component-Driven Design e Elevator Pitch. Os slides de vibe coding tratam problema, público, jornada, protótipos, style guide, componentes, testes e proposta de valor como artefatos de entrada — não como decisões a serem refeitas pela IA.

## Estrutura

```txt
index.html                         menu das aulas
styles.css                        design system e responsividade
script.js                         navegação, scroll, progresso e notas
aulas/
  prompt-engineering/             clareza antes do código
  spec-driven-development/        memória do projeto
  vibe-coder-profissional/        práticas e carreira
  tools-superpoderes/             tools e evidência
  ferramentas-ecossistema/        publicação e demo
```

Cada `<section class="slide">` representa um slide. As notas do apresentador ficam dentro de `<aside class="notes">`.

## Como abrir

Abra `index.html` ou use um servidor local para evitar limitações do navegador:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Navegação

- `←` e `→`: slide anterior ou seguinte.
- `↓`, `Page Down` ou `Espaço`: rola o conteúdo; no fim, avança.
- `↑` ou `Page Up`: rola para cima; no início, volta.
- `Home` e `End`: primeiro e último slide.
- `N`: abre ou fecha notas.
- `Esc`: fecha notas.

O número do slide fica no hash da URL, como `#7`. Para ocultar notas e o botão correspondente, use `?notes=0`.

## Tipos de slide

- `cover`: abertura.
- `section-break`: transição de bloco.
- `activity`: atividade obrigatória.
- `demo`: demonstração.
- `recap`: fechamento.

Conteúdo longo pode rolar dentro do próprio slide. Evite texto excessivo: prefira scroll para código, tabelas ou checklists que realmente precisem permanecer juntos.

## Critérios de apresentação

- Corpo de texto projetado em pelo menos 26–28 px quando possível.
- Código em pelo menos 20 px.
- No máximo três cards simultâneos, salvo matrizes de decisão simples.
- Atividade ou demonstração a cada 8–10 minutos.
- Dados pessoais, tokens e chaves nunca entram em slides, prints ou repositório.
