//import react-routing
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

//import user component
import Header from "./Components/MainPage/Header";
import Footer from "./Components/MainPage/Footer";
import Main from "./Components/MainPage/Main";

import SignIn from "./Components/SignPage/SignIn";
import SignUp from "./Components/SignPage/SignUp";
import MyPage from "./Components/MyPage/MyPage";

import TeamMake from "./Components/TeamPage/TeamMake";
import TeamMain from "./Components/TeamPage/TeamMain";
import TeamDetail from "./Components/TeamPage/TeamDetail";

import OfferBoard from "./Components/BoardPage/OfferBoard";
import QuestionBoard from "./Components/BoardPage/QuestionBoard";
import ShareBoard from "./Components/BoardPage/ShareBoard";
import BoardDetail from "./Components/BoardPage/BoardDetail";
import BoardWrite from "./Components/BoardPage/BoardWrite";
import BoardModify from "./Components/BoardPage/BoardModify";

//import App css
import "./css/App.css";

//react에서 BrowserRouter로 라우팅 처리를 하였다.
function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/mypage" element={<MyPage></MyPage>}></Route>

          <Route path="/teammake" element={<TeamMake></TeamMake>}></Route>
          <Route path="/team" element={<TeamMain></TeamMain>}></Route>
          <Route path="/teaminfo" element={<TeamDetail></TeamDetail>}></Route>
          
          <Route path="/offerboard" element={<OfferBoard></OfferBoard>}></Route>
          <Route path="/questionboard" element={<QuestionBoard></QuestionBoard>}></Route>
          <Route path="/shareboard" element={<ShareBoard></ShareBoard>}></Route>
          <Route path="/boarddetail" element={<BoardDetail></BoardDetail>}></Route>
          <Route path="/boardwrite" element={<BoardWrite></BoardWrite>}></Route>
          <Route path="/boardmodify" element={<BoardModify></BoardModify>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default App;