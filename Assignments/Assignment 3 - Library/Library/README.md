## To run Locally

Clone the project

```bash
  git clone https://github.com/NithinNitz12/BCDV-4023-Full-Stack-Blockchain-Integration---I.git
```
Go to the project directory and install dependencies

```bash
  cd Assignments/Assignment\ 3\ -\ Library/Library
  npm install
```
Open the ```.env``` file and set-up the ```PORT``` and ```API_URL```

```
VITE_API_KEY=<Insert sepolia network address>
VITE_PRIVATE_KEY=<Insert Wallet Private Key>
```
Start the server

```bash
  npm run dev
```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
