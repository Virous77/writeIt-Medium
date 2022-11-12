import "./App.css";
import Navbar from "./components/layouts/Navbar";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignUpPage,
  ErrorPage,
  ForgetPassPage,
  StoryPage,
  WritePage,
  ProfilePage,
  PostDetails,
  Tags,
  BookmarkPost,
  UserProfie,
} from "./pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <section className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile/:username"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/user-profile/:id" element={<UserProfie />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forget-password" element={<ForgetPassPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/our-story" element={<StoryPage />} />
        <Route path="/post-details/:name/:id" element={<PostDetails />} />
        <Route path="/tags/:name/" element={<Tags />} />
        <Route
          path="/bookmark"
          element={
            <PrivateRoute>
              <BookmarkPost />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </section>
  );
}

export default App;
