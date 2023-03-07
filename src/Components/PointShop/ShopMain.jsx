//import css
import "../../css/PointShopCss/ShopMain.css";
//import react bootstrap
import { useNavigate } from "react-router-dom";


function ShopMain() {
    //화면 전환을 위한 useNavigate 변수
    const navigate = useNavigate();

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
                <h3>캐릭터</h3>
                <hr/>
                <div className="ProductCardContainer" id="ch0" onClick={handleProductClick}>
                    <h4>캐릭터01</h4>
                    <img src="https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg"/>
                    <p>Point : 300p</p>
                </div>
                <div className="ProductCardContainer" id="ch1" onClick={handleProductClick}>
                    <h4>캐릭터02</h4>
                    <img src="https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg"/>
                    <p>Point : 300p</p>
                </div>
                <div className="ProductCardContainer" id="ch2" onClick={handleProductClick}>
                    <h4>캐릭터03</h4>
                    <img src="https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg"/>
                    <p>Point : 300p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>옷</h3>
                <hr/>
                <div className="ProductCardContainer" id="top0" onClick={handleProductClick}>
                    <h4>상의01</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png"/>
                    <p>Point : 100p</p>
                </div>
                <div className="ProductCardContainer" id="top1" onClick={handleProductClick}>
                    <h4>상의02</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png"/>
                    <p>Point : 100p</p>
                </div>
                <div className="ProductCardContainer" id="pants0" onClick={handleProductClick}>
                    <h4>하의01</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg"/>
                    <p>Point : 100p</p>
                </div>
                <div className="ProductCardContainer" id="pants1" onClick={handleProductClick}>
                    <h4>하의02</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg"/>
                    <p>Point : 100p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>모자</h3>
                <hr/>
                <div className="ProductCardContainer" id="hat0" onClick={handleProductClick}>
                    <h4>모자01</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg"/>
                    <p>Point : 80p</p>
                </div>
                <div className="ProductCardContainer" id="hat1" onClick={handleProductClick}>
                    <h4>모자02</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg"/>
                    <p>Point : 80p</p>
                </div>
                <div className="ProductCardContainer" id="hat2" onClick={handleProductClick}>
                    <h4>모자03</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg"/>
                    <p>Point : 80p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>가방</h3>
                <hr/>
                <div className="ProductCardContainer" id="bag0" onClick={handleProductClick}>
                    <h4>가방01</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg"/>
                    <p>Point : 80p</p>
                </div>
                <div className="ProductCardContainer" id="bag1" onClick={handleProductClick}>
                    <h4>가방02</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg"/>
                    <p>Point : 80p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>신발</h3>
                <hr/>
                <div className="ProductCardContainer" id="shoes0" onClick={handleProductClick}>
                    <h4>신발01</h4>
                    <img src="https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg"/>
                    <p>Point : 60p</p>
                </div>
                <div className="ProductCardContainer" id="shoes1" onClick={handleProductClick}>
                    <h4>신발02</h4>
                    <img src="https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg"/>
                    <p>Point : 60p</p>
                </div>
            </div>
            <div className="ProductContainer">
                <h3>기타</h3>
                <hr/>
                <div className="ProductCardContainer" id="color" onClick={handleProductClick}>
                    <h4>머리 염색약</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_960_720.jpg"/>
                    <p>Point : 10p</p>
                </div>
                <div className="ProductCardContainer" id="randomBox" onClick={handleProductClick}>
                    <h4>랜덤박스</h4>
                    <img src="https://cdn.pixabay.com/photo/2016/12/09/04/02/presents-1893640_960_720.jpg"/>
                    <p>Point : 50p</p>
                </div>
            </div>
        </div>
    )
}

export default ShopMain;