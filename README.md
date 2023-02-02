# Sabores do Mineiro | Cardápio Online

## What is inside?

This project uses lot of stuff as:

- Tailwind CSS
- TypeScript
- SWR
- Jest
- React Testing Library
- Eslint
- Prettier
- Husky
- Axios

## Getting Started

First install the global dependencies

```bash
npm install -g json-server
```

Then install the project dependencies

```bash
npm install
```

Run the JSON SERVER in a separate terminal

```bash
json-server --watch mock/db.json
```

Then run the development server

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commands

- `start`: runs your application on `localhost:3000`
- `build`: creates the production build version
- `lint`: runs the linter in all components and pages
- `test`: runs jest to test all components
- `test:watch`: runs jest to test all components in watch mode

## Pay attention

- This backend local server (JSON SERVER API) is just to provide the data to the frontend, never use it in production.
