import { Suspense } from "react";
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";

import { Layout } from "../components/Layout/Layout";
import {
  Administration,
  Auswahllisten,
  Banking,
  Dashboard,
  Einkauf,
  Help,
  Home,
  Lagerverwaltung,
  PostOffice,
  Rechn,
  Statistik,
  Telefonie,
  Verkauf,
  Warenbestand,
} from "../pages/index";

export function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ReactRoutes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Banking" element={<Banking />} />
            <Route path="Telefonie" element={<Telefonie />} />
            <Route path="Verkauf" element={<Verkauf />} />
            <Route path="Statistik" element={<Statistik />} />
            <Route path="PostOffice" element={<PostOffice />} />
            <Route path="Administration" element={<Administration />} />
            <Route path="Help" element={<Help />} />
            <Route path="Warenbestand" element={<Warenbestand />} />
            <Route path="Einkauf" element={<Einkauf />} />
            <Route path="Auswahllisten" element={<Auswahllisten />} />
            <Route path="Rechn" element={<Rechn />} />
            <Route path="Lagerverwaltung" element={<Lagerverwaltung />} />
          </Route>
        </ReactRoutes>
      </Suspense>
    </BrowserRouter>
  );
}
