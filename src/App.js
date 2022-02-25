import { React, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("pages/Home"));
const TeamLeaderBoard = lazy(() => import("pages/TeamLeaderBoard"));
const MyTeamLeaderBoard = lazy(() => import("pages/MyTeamLeaderBoard"));
const PersonalLeaderBoard = lazy(() => import("pages/PersonalLeaderBoard"));
const CreateTeam = lazy(() => import("pages/CreateTeam"));
const AddTeamMate = lazy(() => import("pages/AddTeamMate"));
const NotFound = lazy(() => import("pages/NotFound"));
const Invite = lazy(() => import("pages/Invite"));
const Challenge = lazy(() => import("pages/Challenge"));
const Register = lazy(() => import("pages/Register"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="leader-board/individual" element={<PersonalLeaderBoard />} />
        <Route path="leader-board/teams" element={<TeamLeaderBoard />} />
        <Route path="leader-board/teams/my-team" element={<MyTeamLeaderBoard />} />
        <Route path="leader-board/teams/create" element={<CreateTeam />} />
        <Route path="leader-board/teams/add-teammate" element={<AddTeamMate />} />
        <Route path="invite" element={<Invite />} />
        <Route path="challenge" element={<Challenge />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Suspense>
  );
}
