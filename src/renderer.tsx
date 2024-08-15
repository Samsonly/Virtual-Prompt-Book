import { createRoot } from "react-dom/client";

const App = () => {
  return <h1>Hello, Electron!</h1>;
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
