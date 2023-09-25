//import css
import "../../css/PointShopCss/ShopMain.css";
//import react bootstrap
import { Modal } from "react-bootstrap";
//import react bootstrap icon
import { QuestionCircle } from "react-bootstrap-icons";
//import react hooks
import { useState } from "react";
//import react router
import { useNavigate } from "react-router-dom";
//image src
import RandomBoxSrc from "../../Images/RandomBoxImage.jpg";
import HairColorSrc from "../../Images/HairColorMainImage.png";
import HatSrc01 from "../../Images/Hat01.png";
import HatSrc02 from "../../Images/Hat02.png";
import HatSrc03 from "../../Images/Hat03.png";
import BagSrc01 from "../../Images/Bag01.png";
import BagSrc02 from "../../Images/Bag02.png";
import SnowTopSrc from "../../Images/SnowTop.png";
import SnowBottomSrc from "../../Images/SnowBottom.png";
import CharacterSrc01 from "../../Images/Character01.png";
import CharacterSrc02 from "../../Images/Character02.png";
import CharacterSrc03 from "../../Images/Character03.png";

function ShopMain() {
    //화면 전환을 위한 useNavigate 변수
    const navigate = useNavigate();

    //포인트 휙득 방법을 알려주는 Modal 창의 Boolean useState 변수
    const [ pointHintModalShow, setPointHintModalShow ] = useState(false);

    //randombox result Modal 창을 켜고 끄는 함수이다.
    const handlePointHintModalShow = () => setPointHintModalShow(true);
    const handlePointHintModalClose = () => setPointHintModalShow(false);

    //특정 상품 카드를 클릭했을 때 화면 전환을 위해 호출되는 이벤트 함수
    const handleProductClick = (e) => {
        if(window.sessionStorage.id) {
            window.sessionStorage.setItem("clickItem", e.target.parentElement.id);
            navigate("/product");
        }
        else {
            alert("로그인한 상태에서만 구매 페이지로 이동 가능합니다.");
            navigate("/signin");
        }
    }

    return (
        <div>
            <div className="ProductContainer">
                <div id="pointQuestionContainer" onClick={() => handlePointHintModalShow()}>
                    <QuestionCircle/>
                    <span>포인트 획득 방법</span>
                </div>
                
                <h3>캐릭터</h3>
                <hr/>
                <div className="ProductCardContainer CharacterImage" id="ch0" onClick={handleProductClick}>
                    <h4>캐릭터01</h4>
                    <img src={CharacterSrc01} />
                    <p>Point : 300p</p>
                </div>
                <div className="ProductCardContainer CharacterImage" id="ch1" onClick={handleProductClick}>
                    <h4>캐릭터02</h4>
                    <img src={CharacterSrc02} />
                    <p>Point : 300p</p>
                </div>
                <div className="ProductCardContainer CharacterImage" id="ch2" onClick={handleProductClick}>
                    <h4>캐릭터03</h4>
                    <img src={CharacterSrc03} />
                    <p>Point : 300p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>옷</h3>
                <hr/>
                <div className="ProductCardContainer" id="top0" onClick={handleProductClick}>
                    <h4>상의</h4>
                    <img src={SnowTopSrc}/>
                    <p>Point : 100p</p>
                </div>
                <div className="ProductCardContainer" id="pants0" onClick={handleProductClick}>
                    <h4>하의</h4>
                    <img src={SnowBottomSrc}/>
                    <p>Point : 100p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>모자</h3>
                <hr/>
                <div className="ProductCardContainer" id="hat0" onClick={handleProductClick}>
                    <h4>토끼 모자</h4>
                    <img src={HatSrc01}/>
                    <p>Point : 80p</p>
                </div>
                <div className="ProductCardContainer" id="hat1" onClick={handleProductClick}>
                    <h4>호랑이 모자</h4>
                    <img src={HatSrc02}/>
                    <p>Point : 80p</p>
                </div>
                <div className="ProductCardContainer" id="hat2" onClick={handleProductClick}>
                    <h4>버킷 햇</h4>
                    <img src={HatSrc03}/>
                    <p>Point : 80p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>가방</h3>
                <hr/>
                <div className="ProductCardContainer" id="bag0" onClick={handleProductClick}>
                    <h4>빨간색 가방</h4>
                    <img src={BagSrc01}/>
                    <p>Point : 80p</p>
                </div>
                <div className="ProductCardContainer" id="bag1" onClick={handleProductClick}>
                    <h4>갈색 가방</h4>
                    <img src={BagSrc02}/>
                    <p>Point : 80p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>기타</h3>
                <hr/>
                <div className="ProductCardContainer" id="color" onClick={handleProductClick}>
                    <h4>머리 염색약</h4>
                    <img src={HairColorSrc}/>
                    <p>Point : 10p</p>
                </div>
                <div className="ProductCardContainer" id="randomBox" onClick={handleProductClick}>
                    <h4>랜덤박스</h4>
                    <img src={RandomBoxSrc}/>
                    <p>Point : 50p</p>
                </div>
            </div>
            <Modal show={pointHintModalShow} onHide={handlePointHintModalClose}>
                <Modal.Header closeButton>
                    <h4>포인트 획득 경로</h4>
                </Modal.Header>
                <Modal.Body>
                    <p>댓글 작성 : 1 point</p>
                    <p>게시글 작성 : 2 point</p>
                    <p>팀 생성 : 10 point</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ShopMain;