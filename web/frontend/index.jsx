import App from "./App";
import "./assets/css/style.css";
import "./assets/css/App.css";
import { createRoot } from 'react-dom/client';
// import { Suspense } from "react";
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
      <App/>
);

// function Loading() {
//     return <h2>🌀 Loading...</h2>;
// }

