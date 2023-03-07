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

//import App css
import "./css/App.css";

//react에서 BrowserRouter로 라우팅 처리를 하였다.
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/downloadinfo" element={<DownloadFileInfo/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/idsearch" element={<IdSearch/>}></Route>
          <Route path="/pwsearch" element={<PwSearch/>}></Route>
          <Route path="/pwmodify" element={<PwModify/>}></Route>
          <Route path="/mypage" element={<MyPage/>}></Route>
          <Route path="/letterbox" element={<LetterBox/>}></Route>

          <Route path="/shop" element={<ShopMain/>}></Route>
          
          <Route path="/teammake" element={<TeamMake/>}></Route>
          <Route path="/team" element={<TeamMain/>}></Route>
          <Route path="/teaminfo" element={<TeamDetail/>}></Route>
          
          <Route path="/offerboard" element={<OfferBoard/>}></Route>
          <Route path="/questionboard" element={<QuestionBoard/>}></Route>
          <Route path="/shareboard" element={<ShareBoard/>}></Route>
          <Route path="/boarddetail" element={<BoardDetail/>}></Route>
          <Route path="/boardwrite" element={<BoardWrite/>}></Route>
          <Route path="/boardmodify" element={<BoardModify/>}></Route>

          <Route path="/infosearch" element={<InfoSearch/>}></Route>
          <Route path="/teamsearch" element={<TeamSearch/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App;