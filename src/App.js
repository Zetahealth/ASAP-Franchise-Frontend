import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import "./App.css";

// Public Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import FranchiseDirectory from "./pages/FranchiseDirectory";
import FranchiseYourBusiness from "./pages/FranchiseYourBusiness";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Contact from "./pages/Contact";
// import FranchiseDetail from "./pages/FranchiseDetail";
import BusinessOverview from "./pages/BusinessOverview";
import SearchResults from "./pages/SearchResult";
import Dashboard from "./pages/Dashboard";
import LayoutWithNavbar from "./components/NavbarLayout";

// Admin Pages
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageFranchises from "./admin/ManageFranchises";
import ManageUsers from "./admin/ManageUsers";
import AddAndEditFranchise from "./admin/AddAndEditFranchise";
import NewsManagement from "./admin/NewsManagement";
import ServiceManagement from "./admin/ServiceManagment";
import MessageandConnect from "./admin/MessageandConnect";
import ReportsandAnalytics from "./admin/ReportsandAnalytics";
import RelatedDocuments from "./admin/RelatedDocuments";
import UpdateMail from "./admin/UpdateMail";
import AdminRegistration from "./admin/AdminRegistration";

// Newly Added Admin Pages
import PaymentsTransactions from "./admin/PaymentsTransactions";
import LocationSettings from "./admin/LocationSettings";
import PushNotifications from "./admin/PushNotifications";
import ReviewsRatings from "./admin/ReviewsRatings";
import SecurityRoles from "./admin/SecurityRoles";
import SystemSettings from "./admin/SystemSettings";
import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminForgotPassword from "./admin/AdminForgotPassword";
import AdminResetPassword from "./admin/AdminResetPassword";
import UserLogin from "./user/UserLogin";
import UserRegistration from "./user/UserRegistration";
import UserAccount from "./pages/UserAccount";
import FranchiseOwnerAccount from "./FranchiseOwner/FranchiseUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ✅ Public User Routes */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/registration" element={<UserRegistration />} />
      <Route path="/user/forgot-password" element={<AdminForgotPassword />} />
      <Route path="/user/reset-password" element={<AdminResetPassword />} />
      {/* <Route path="/user/account/:id" element={<UserAccount />} /> */}
      {/* ✅ Admin Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
      <Route path="/admin/reset-password" element={<AdminResetPassword />} />
      {/* ✅ Admin Panel Routes (Protected) */}
      <Route path="/admin" element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-franchises" element={<ManageFranchises />} />
          <Route path="add-edit-franchise" element={<AddAndEditFranchise />} />
          <Route path="news-management" element={<NewsManagement />} />
          <Route path="services-management" element={<ServiceManagement />} />
          <Route path="related-document" element={<RelatedDocuments />} />
          <Route path="messages" element={<MessageandConnect />} />
          <Route path="update-mail" element={<UpdateMail />} />
          <Route path="admin-registration" element={<AdminRegistration />} />
          <Route path="reports" element={<ReportsandAnalytics />} />
          <Route path="payments" element={<PaymentsTransactions />} />
          <Route path="location-settings" element={<LocationSettings />} />
          <Route path="notifications" element={<PushNotifications />} />
          <Route path="reviews" element={<ReviewsRatings />} />
          <Route path="security" element={<SecurityRoles />} />
          <Route path="system-settings" element={<SystemSettings />} />
        </Route>
      </Route>

      {/* ✅ Public site with navbar */}
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/franchise-directory" element={<FranchiseDirectory />} />
        <Route path="/franchise-your-business" element={<FranchiseYourBusiness />} />
        <Route path="/news" element={<News />} />
        <Route path="/news-details/:id" element={<NewsDetails />} />
        <Route path="/contact-us" element={<Contact />} />
        {/* <Route path="/franchise-details" element={<FranchiseDetail />} /> */}
        <Route path="/business-overview" element={<BusinessOverview />} />
        <Route path="/search-result" element={<SearchResults />} />
        <Route path="/user/account/:id" element={<UserAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/owner" element={<ProtectedRoute role="owner" />}>
          <Route path="account/:id" element={<FranchiseOwnerAccount />} />
        </Route>
      </Route>
      {/* ✅ Owner Protected Routes */}


    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
