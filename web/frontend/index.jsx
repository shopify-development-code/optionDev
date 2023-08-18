import App from "./App";
import "./assets/css/style.css";
import { createRoot } from 'react-dom/client';
import { Suspense } from "react";
import { Text } from "@shopify/polaris";
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Suspense fallback= {<Loading/>}>
      <App/>
  </Suspense> 
);

function Loading() {
    return <h2>🌀 Loading...</h2>;
}

// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { createRoot } from "react-dom";
// import { Text } from "@shopify/polaris";

// // Your main application component (App.js)
// import App from "./App";

// // Import your CSS file
// import "./assets/css/style.css";

// // Get the container element
// const container = document.getElementById("app");

// // Create a root for rendering
// const root = createRoot(container);

// // Render the content
// function AppWrapper() {
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

//   const handleClick = () => {
//     setShowWelcomeMessage(true);
//   };

//   return (
//     <div onClick={handleClick}>
//       {showWelcomeMessage && (
//         <Text variant="heading3xl" as="h2">
//           Welcome to Genie Product Options
//         </Text>
//       )}
//       {/* <App /> */}
//     </div>
//   );
// }

// // Render the AppWrapper component
// root.render(<AppWrapper />);

