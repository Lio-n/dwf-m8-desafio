//* React
import React from "react";
import { Routes, Route } from "react-router-dom";

//* Components
import { Layout } from "components";

//* Pages
import {
  Home,
  Login,
  Password,
  MisDatos,
  MisMascotas,
  EditarReporte,
  ReportarMascota,
} from "pages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="login">
          <Route index element={<Login />} />
          <Route path="password" element={<Password />} />
        </Route>

        <Route path="mis-datos" element={<MisDatos />} />

        <Route path="mis-mascotas" element={<MisMascotas />}>
          <Route path="editar" element={<EditarReporte />} />
        </Route>

        <Route path="reportar" element={<ReportarMascota />} />
      </Route>
    </Routes>
  );
}

export { AppRoutes };
