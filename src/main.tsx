
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import {
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import "./index.css";
// import App from "./App";

// // create query client
// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>

//       {/* 👇 DEVTOOLS GO HERE */}
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   </React.StrictMode>
// );





import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App";

// ✅ IMPORT THESE
import { apiClient } from "./api/core/api.client";
import { setupMockAdapter } from "./api/mock/mock.api";

// ✅ ACTIVATE MOCK (VERY IMPORTANT)
setupMockAdapter(apiClient);

// create query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);