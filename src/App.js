import { React, lazy, Suspense, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Background from "./Components/Background";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { PrivateRoute } from "./Routes/LoginRoute";

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
const Games = lazy(() => import("pages/Games"));
const Invitees = lazy(() => import("pages/Invitees"));
const InfoSlider = lazy(() => import("pages/InfoSlider"));
const InvitedModal = lazy(() => import("pages/InvitedModal"));

export default function App() {
  const location = useLocation();

  return (
    <Fragment>
      <Background />
      <AnimatePresence exitBeforeEnter>
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="*" element={<NotFound />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="leader-board/individual"
              element={
                <PrivateRoute>
                  <PersonalLeaderBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="leader-board/teams"
              element={
                <PrivateRoute>
                  <TeamLeaderBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="leader-board/invitees"
              element={
                <PrivateRoute>
                  <Invitees />
                </PrivateRoute>
              }
            />
            <Route
              path="leader-board/teams/my-team"
              element={
                <PrivateRoute>
                  <MyTeamLeaderBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="leader-board/teams/create"
              element={
                <PrivateRoute>
                  <CreateTeam />
                </PrivateRoute>
              }
            />
            <Route
              path="leader-board/teams/add-teammate"
              element={
                <PrivateRoute>
                  <AddTeamMate />
                </PrivateRoute>
              }
            />
            <Route
              path="invite"
              element={
                <PrivateRoute>
                  <Invite />
                </PrivateRoute>
              }
            />
            <Route
              path="challenge"
              element={
                <PrivateRoute>
                  <Challenge />
                </PrivateRoute>
              }
            />
            <Route path="register" element={<Register />} />
            <Route path="accept-invite/:id" element={<InvitedModal />} />
            <Route
              path="games/:id"
              element={
                <PrivateRoute>
                  <Games />
                </PrivateRoute>
              }
            />
            <Route path="info-slider" element={<InfoSlider />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Fragment>
  );
}
