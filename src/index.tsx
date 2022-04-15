//* React
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// * Recoil
import { RecoilRoot } from "recoil";

//* Router
import { AppRoutes } from "./router";

ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={null}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>,
  document.getElementById("root")
);
