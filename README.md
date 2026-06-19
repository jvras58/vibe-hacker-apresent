# Estrutura das aulas em HTML

Agora o projeto está organizado para reaproveitar o mesmo design em várias aulas.

```txt
slides-aulas/
├── index.html
├── styles.css
├── script.js
└── aulas/
    └── prompt-engineering/
        └── index.html
```

## Como abrir

Abra o arquivo `index.html` da raiz para ver o menu de aulas.

Ou abra diretamente:

```txt
aulas/prompt-engineering/index.html
```

## Como criar outra aula

Crie uma nova pasta dentro de `aulas/`:

```txt
aulas/nome-da-aula/index.html
```

No `<head>` desse novo HTML, use:

```html
<link rel="stylesheet" href="../../styles.css" />
<script src="../../script.js" defer></script>
```

Assim todas as aulas usam o mesmo `styles.css` e o mesmo `script.js` da raiz.

## Notas do apresentador

No `script.js`, esta flag controla as notas:

```js
const PRESENTATION_FLAGS = {
  enablePresenterNotes: true,
  allowUrlParamOverride: true
};
```

Para ocultar sem editar o arquivo:

```txt
index.html?notes=0
```
