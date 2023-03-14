//import react-routing
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//import user component
import Header from "./Components/MainPage/Header";
import Footer from "./Components/MainPage/Footer";
import Main from "./Components/MainPage/Main";
import DownloadFileInfo from "./Components/MainPage/DownloadFileInfo";

import SignIn from "./Components/SignPage/SignIn";
import SignUp from "./Components/SignPage/SignUp";
import IdSearch from "./Components/SignPage/IdSearch";
import PwSearch from "./Components/SignPage/PwSearch";
import PwModify from "./Components/SignPage/PwModify";

import MyPage from "./Components/MyPage/MyPage";
import LetterBox from "./Components/MyPage/LetterBox";
import LockerPage from "./Components/MyPage/LockerPage";

import TeamMake from "./Components/TeamPage/TeamMake";
import TeamMain from "./Components/TeamPage/TeamMain";
import TeamDetail from "./Components/TeamPage/TeamDetail";

import OfferBoard from "./Components/BoardPage/OfferBoard";
import QuestionBoard from "./Components/BoardPage/QuestionBoard";
import ShareBoard from "./Components/BoardPage/ShareBoard";
import BoardDetail from "./Components/BoardPage/BoardDetail";
import BoardWrite from "./Components/BoardPage/BoardWrite";
import BoardModify from "./Components/BoardPage/BoardModify";

import InfoSearch from "./Components/SearchPage/InfoSearch";
import TeamSearch from "./Components/SearchPage/TeamSearch";

import ShopMain from "./Components/PointShop/ShopMain";
import ProductDetail from "./Components/PointShop/ProductDetail";

import ScrollToTop from "./Components/ScrollToTop";

//import App css
import "./css/App.css";

//react에서 BrowserRouter로 라우팅 처리를 하였다.
function App() {

  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/downloadinfo" element={<DownloadFileInfo/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/idsearch" element={<IdSearch/>} />
          <Route path="/pwsearch" element={<PwSearch/>} />
          <Route path="/pwmodify" element={<PwModify/>} />

          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/letterbox" element={<LetterBox/>} />
          <Route path="/locker" element={<LockerPage/>} />

          <Route path="/shop" element={<ShopMain/>} />
          <Route path="/product" element={<ProductDetail/>} />
          
          <Route path="/teammake" element={<TeamMake/>} />
          <Route path="/team" element={<TeamMain/>} />
          <Route path="/teaminfo" element={<TeamDetail/>} />
          
          <Route path="/offerboard" element={<OfferBoard/>} />
          <Route path="/questionboard" element={<QuestionBoard/>} />
          <Route path="/shareboard" element={<ShareBoard/>} />
          <Route path="/boarddetail" element={<BoardDetail/>} />
          <Route path="/boardwrite" element={<BoardWrite/>} />
          <Route path="/boardmodify" element={<BoardModify/>} />

          <Route path="/infosearch" element={<InfoSearch/>} />
          <Route path="/teamsearch" element={<TeamSearch/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App;