import { React, lazy, Suspense, Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Background from "./Components/Background";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { PrivateRoute } from "./Routes/LoginRoute";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

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
const Landing = lazy(() => import("pages/Landing"));

export default function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <ToastContainer
          position="bottom-left"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {location.pathname !== "/landing" && <Background />}

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
              {/* <Route
                path="leader-board/individual"
                element={
                  <PrivateRoute>
                    <PersonalLeaderBoard />
                  </PrivateRoute>
                }
              /> */}
              {/* <Route
                path="leader-board/teams"
                element={
                  <PrivateRoute>
                    <TeamLeaderBoard />
                  </PrivateRoute>
                }
              /> */}
              {/* <Route
                path="leader-board/invitees"
                element={
                  <PrivateRoute>
                    <Invitees />
                  </PrivateRoute>
                }
              /> */}
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
                path="challenge/:id"
                element={
                  <PrivateRoute>
                    <Challenge />
                  </PrivateRoute>
                }
              />
              <Route path="register" element={<Register />} />
              <Route path="join-team/:id" element={<InvitedModal />} />
              <Route
                path="games/:id"
                element={
                  <PrivateRoute>
                    <Games />
                  </PrivateRoute>
                }
              />
              <Route path="landing" element={<Landing />} />
              <Route path="info-slider" element={<InfoSlider />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </Fragment>
    </QueryClientProvider>
  );
}
