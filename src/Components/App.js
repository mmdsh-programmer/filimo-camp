import { React, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const Team = lazy(() => import("pages/Team"));
const NotFound = lazy(() => import("pages/NotFound"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="team" element={<Team />} />
      </Routes>
    </Suspense>
  );
}
