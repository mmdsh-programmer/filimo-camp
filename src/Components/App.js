import { React, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const Team = lazy(() => import("pages/Team"));
const NotFound = lazy(() => import("pages/NotFound"));
const Invite = lazy(() => import("pages/Invite"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="team" element={<Team />} />
        <Route path="invite" element={<Invite />} />
      </Routes>
    </Suspense>
  );
}
