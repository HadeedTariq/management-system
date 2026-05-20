import { Route, Routes } from "react-router-dom";

import LoadingBar from "./components/LoadingBar";

import { useDispatch } from "react-redux";

import { useEffect } from "react";

import { useAuthChecker } from "./hooks/useAuthChecker";
import { useFullApp } from "./store/hooks/useFullApp";
import HomePage from "./pages/app/routes/HomePage";
import Layout from "./pages/app/components/Layout";
import Authenticate from "./pages/auth/routes/Authenticate";
import AuthProtector from "./pages/auth/components/AuthProtector";
import ForgetPassword from "./pages/auth/routes/ForgetPassword";
import ResetPassword from "./pages/auth/routes/ResetPassword";
import AdminSidebar from "./pages/app/components/admin/AdminSidebar";
import AllSocities from "./pages/app/routes/admin/socities/AllSocities";
import CreateSociety from "./pages/app/routes/admin/socities/CreateSociety";
import UpdateSociety from "./pages/app/routes/admin/socities/UpdateSociety";
import ManageUsers from "./pages/app/routes/admin/users/ManageUsers";
import ManageSocietyMembers from "./pages/app/routes/admin/socities/ManageSocietyMembers";
import AboutUs from "./pages/app/routes/AboutUs";
import SocietyHeadDashboard from "./pages/app/components/society-head/SocietyHeadDashboard";
import SocietyHeadDashboardFrontPage from "./pages/app/routes/society-head/SocietyHeadDashboardFrontPage";
import SocietyHeadSocieties from "./pages/app/routes/society-head/SocietyHeadSocieties";
import MySocietyPosts from "./pages/app/routes/society-head/MySocietyPosts";
import CreateSocietyPost from "./pages/app/routes/society-head/CreateSocietyPost";
import UpdateSocietyPost from "./pages/app/routes/society-head/UpdateSocietyPost";
import MySocietyEvents from "./pages/app/routes/society-head/MySocietyEvents";
import CreateSocietyEvent from "./pages/app/routes/society-head/CreateSocietyEvent";
import UpdateSocietyEvent from "./pages/app/routes/society-head/UpdateSocietyEvent";
import AllPosts from "./pages/app/routes/society-head/AllPosts";
import AllEvents from "./pages/app/routes/society-head/AllEvents";
import AllClientSideSocieties from "./pages/app/routes/AllClientSideSocieties";
import AllClientSideEvents from "./pages/app/routes/AllClientSideEvents";
import SocietyDetailsPage from "./pages/app/routes/SocietyDetailsPage";
import EventsDetailsPage from "./pages/app/routes/EventsDetailsPage";
import FeaturesPage from "./pages/app/routes/FeaturesPage";
import PortalSidebar from "./pages/app/components/portal/PortalSidebar";
import MyProfile from "./pages/app/routes/portal/MyProfile";
import JoinedSocieties from "./pages/app/routes/portal/JoinedSocieties";
import SavedPosts from "./pages/app/routes/portal/SavedPosts";
import SavedEvents from "./pages/app/routes/portal/SavedEvents";
import AdminAuthLayout from "./components/AdminAuthLayout";

function App() {
  const { user } = useFullApp();

  const dispatch = useDispatch();
  const { isPending, mutate: authUser } = useAuthChecker(dispatch);

  useEffect(() => {
    if (!user) {
      authUser();
    }
  }, [user]);

  if (isPending) return <LoadingBar />;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="societies" element={<AllClientSideSocieties />} />
        <Route path="societies/:id" element={<SocietyDetailsPage />} />
        <Route path="events" element={<AllClientSideEvents />} />
        <Route path="events/:id" element={<EventsDetailsPage />} />
      </Route>

      <Route
        path="/authenticate"
        element={
          <AuthProtector>
            <Layout />
          </AuthProtector>
        }
      >
        <Route index element={<Authenticate />} />
        <Route path="forgot-password" element={<ForgetPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="/portal" element={<PortalSidebar />}>
        <Route index element={<MyProfile />} />
        <Route path="joined-societies" element={<JoinedSocieties />} />
        <Route path="saved-posts" element={<SavedPosts />} />
        <Route path="saved-events" element={<SavedEvents />} />
      </Route>

      <Route
        path="/admin-dashboard"
        element={
          <AdminAuthLayout>
            <AdminSidebar />
          </AdminAuthLayout>
        }
      >
        <Route index element={<ManageUsers />} />
        <Route path="societies">
          <Route index element={<AllSocities />} />
          <Route path="manage-members/:id" element={<ManageSocietyMembers />} />
          <Route path="create" element={<CreateSociety />} />
          <Route path="update/:id" element={<UpdateSociety />} />
        </Route>
      </Route>

      <Route path="/society-head-dashboard" element={<SocietyHeadDashboard />}>
        <Route index element={<SocietyHeadDashboardFrontPage />} />
        <Route path="my-societies" element={<SocietyHeadSocieties />} />
        <Route path="my-posts" element={<AllPosts />} />
        <Route path="my-events" element={<AllEvents />} />
        <Route path="my-society/posts/:id" element={<MySocietyPosts />} />
        <Route path="my-society/events/:id" element={<MySocietyEvents />} />
        <Route
          path="my-society/:id/create-post"
          element={<CreateSocietyPost />}
        />
        <Route
          path="my-society/:id/create-event"
          element={<CreateSocietyEvent />}
        />
        <Route
          path="my-society/:id/update-post/:postId"
          element={<UpdateSocietyPost />}
        />
        <Route
          path="my-society/:id/update-event/:eventId"
          element={<UpdateSocietyEvent />}
        />
      </Route>
    </Routes>
  );
}

export default App;
