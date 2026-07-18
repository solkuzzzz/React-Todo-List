# React To-Do List

**Live demo:** [react-todo-list-olive.vercel.app](https://react-todo-list-olive.vercel.app/)

| | | |
|:---:|:---:|:---:|
| <img src="docs/preview.png" width="220" alt="To-Do List app preview"/> | <img src="docs/add-todo-card.gif" width="220" alt="Add todo card"/> | <img src="docs/delete-todo.gif" width="220" alt="Delete todo"/> |

A small React + Vite to-do list app. Each task card gets a unique pastel background with a bold geometric shape peeking out of its bottom edge; deleting a task swipes it out to the left while a mini version of its shape drops down out of the list.

## Features

- Add, complete/uncomplete, and delete tasks
- Live stats: total, completed, and remaining task counts
- Each task is assigned a themed color + shape combo (from [`src/todoTheme.js`](src/todoTheme.js)) based on its id, so the same task always keeps the same look
- Deleting a task triggers a two-part animation: the card swipes left and fades out, while a small copy of its shape falls out of the list and disappears

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/) for dev server & build
- [ESLint](https://eslint.org/) for linting
- Plain CSS (no UI framework) — see [`src/styles/styles.css`](src/styles/styles.css)

## Getting started

```bash
npm install
npm run dev
```

The app will be available at the URL printed in the terminal (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build     # production build into dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
├── App.jsx          # app shell, holds the todos state
├── TodoInput.jsx     # input + "Add" button
├── TodoStats.jsx      # all / completed / remaining counters
├── TodoList.jsx        # renders the list and the delete/fall animation overlay
├── TodoItem.jsx          # single task card (checkbox, text, delete button, shape)
├── todoTheme.js           # color + shape palette assigned per task id
└── styles/styles.css       # all styling and keyframe animations
```

## Design credit

The card/shape visual style is based on a design reference provided during development. If you have the original design source (Figma, mockup, etc.), link it here for future reference.
