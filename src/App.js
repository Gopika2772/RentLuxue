import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from './pages/buyer/Landing';
import SellerRegister from './pages/register/SellerRegister';
import Sellerlogin from './pages/login/Sellerlogin';
import { useSelector } from "react-redux";
import Post from './pages/seller/Post';
import ViewPost from './pages/seller/ViewPost';
import Home from './pages/buyer/Home';
import Login from './pages/login/Login';
import Register from "./pages/register/Register";
import UpdatePost from './pages/seller/UpdatePost';
import Results from './pages/buyer/Results';
import OwnerDetails from './pages/buyer/OwnerDetails';


function App() {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            {user.role === "buyer" && (
              <>
                <Route path="/buyerRegister" element={<Register />} />
                <Route path="/buyerLogin" element={<Login />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/viewpost" element={<ViewPost />} />
                <Route path="/results/:city" element={<Results user={user} />} />
                <Route path="/owner/:user_id" element={<OwnerDetails />} />
              </>
            )}
            {user.role === "seller" && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<Post user={user} />} />
                <Route path="/viewpost" element={<ViewPost user={user} />} />
                <Route path="/sellerRegister" element={<SellerRegister />} />
                <Route path="/sellerlogin" element={<Sellerlogin />} />
                <Route path="/updatepost/:post_id" element={<UpdatePost user={user} />} />
                <Route path="/ownerdetails/:user_id" element={<OwnerDetails user={user} />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/buyerRegister" element={<Register user={user} />} />
            <Route path="/buyerLogin" element={<Login user={user} />} />
            <Route path="/sellerRegister" element={<SellerRegister user={user} />} />
            <Route path="/sellerlogin" element={<Sellerlogin user={user} />} />
            <Route path="/post" element={<Post user={user} />} />
            <Route path="/viewpost" element={<ViewPost user={user} />} />
            <Route path="/ownerdetails/:user_id" element={<OwnerDetails user={user} />} />
          </>
        )}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
