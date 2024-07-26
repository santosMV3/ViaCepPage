import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ViaCepTable from "./Ex";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ViaCepTable />
  </StrictMode>
);
