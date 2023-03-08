//import css
import "../../css/PointShopCss/ProductDetail.css";
//import react bootstrap
import Spinner from 'react-bootstrap/Spinner';
//import react hooks
import { useEffect, useState } from "react";
//import react bootstrap
import { useNavigate } from "react-router-dom";
//import functions
import functionUserPoint from "../../Functions/FunctionShop/functionUserPoint";
import functionPurchase from "../../Functions/FunctionShop/functionPurchase";
import functionGetRandomProduct from "../../Functions/FunctionShop/functionGetRandomProduct";


function ProductDetail() {
    //화면 전환을 위한 useNavigate 변수
    const navigate = useNavigate();

    //---접속된 아이템에 따라 화면을 다르게 표시하게 하기 위한 값---
    //제품 이미지 경로
    const [ imageSrc, setImageSrc ] = useState();
    //제품 이름
    const [ productTitle, setProductTitle ] = useState();
    //제품 가격
    const [ productPrice, setProductPrice ] = useState();
    //---접속된 아이템에 따라 화면을 다르게 표시하게 하기 위한 값---
    //유저가 현재 보유하고 있는 포인트 값을 갖고 있을 useState 변수
    const [ userPoint, setUserPoint ] = useState(0);
    //로딩 화면을 표시하기 위한 status 변수
    const [ loadingStatus, setLoadingStatus ] = useState(false);
    //현재 선택한 상품의 카테고리
    const [ productCategory, setProductCategory ] = useState();
    //염색약일 경우 어떤 색을 선택했는지에 대한 값
    const [ selectHairColor, setSelectHairColor ] = useState("color0");

    //비정상적인 경로 접속 차단과 유저의 보유 포인트 값을 알기 위한 useEffect 함수
    useEffect(() => {
        if(!window.sessionStorage.clickItem || !window.sessionStorage.id) {
            alert("비정상적인 접근입니다!");
            navigate("/shop");
        }
        else if(window.sessionStorage.clickItem && window.sessionStorage.id) {
            functionUserPoint(window.sessionStorage.id, setUserPoint, setLoadingStatus);

            if(window.sessionStorage.clickItem === "ch0") {
                setImageSrc("https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg");
                setProductTitle("캐릭터01");
                setProductPrice(300);
                setProductCategory("character");
            }
            else if(window.sessionStorage.clickItem === "ch1") {
                setImageSrc("https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg");
                setProductTitle("캐릭터02");
                setProductPrice(300);
                setProductCategory("character");
            }
            else if(window.sessionStorage.clickItem === "ch2") {
                setImageSrc("https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg");
                setProductTitle("캐릭터03");
                setProductPrice(300);
                setProductCategory("character");
            }
            else if(window.sessionStorage.clickItem === "top0") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png");
                setProductTitle("상의01");
                setProductPrice(100);
                setProductCategory("outfit");
            }
            else if(window.sessionStorage.clickItem === "top1") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png");
                setProductTitle("상의02");
                setProductPrice(100);
                setProductCategory("outfit");
            }
            else if(window.sessionStorage.clickItem === "pants0") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg");
                setProductTitle("하의01");
                setProductPrice(100);
                setProductCategory("outfit");
            }
            else if(window.sessionStorage.clickItem === "pants1") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg");
                setProductTitle("하의02");
                setProductPrice(100);
                setProductCategory("outfit");
            }
            else if(window.sessionStorage.clickItem === "hat0") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg");
                setProductTitle("모자01");
                setProductPrice(80);
                setProductCategory("hat");
            }
            else if(window.sessionStorage.clickItem === "hat1") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg");
                setProductTitle("모자02");
                setProductPrice(80);
                setProductCategory("hat");
            }
            else if(window.sessionStorage.clickItem === "hat2") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg");
                setProductTitle("모자03");
                setProductPrice(80);
                setProductCategory("hat");
            }
            else if(window.sessionStorage.clickItem === "bag0") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg");
                setProductTitle("가방01");
                setProductPrice(80);
                setProductCategory("bag");
            }
            else if(window.sessionStorage.clickItem === "bag1") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg");
                setProductTitle("가방02");
                setProductPrice(80);
                setProductCategory("bag");
            }
            else if(window.sessionStorage.clickItem === "shoes0") {
                setImageSrc("https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg");
                setProductTitle("신발01");
                setProductPrice(60);
                setProductCategory("shoes");
            }
            else if(window.sessionStorage.clickItem === "shoes1") {
                setImageSrc("https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg");
                setProductTitle("신발02");
                setProductPrice(60);
                setProductCategory("shoes");
            }
            else if(window.sessionStorage.clickItem === "color") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_960_720.jpg");
                setProductTitle("머리 염색약");
                setProductPrice(10);
                setProductCategory("hair color");
            }
            else if(window.sessionStorage.clickItem === "randomBox") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/12/09/04/02/presents-1893640_960_720.jpg");
                setProductTitle("랜덤박스");
                setProductPrice(50);
                setProductCategory("random box");
            }
        }
    }, []);

    //구매 버튼 클릭 시 호출되는 이벤트 함수
    const handlePurchase = () => {
        if(userPoint - productPrice >= 0 && window.sessionStorage.clickItem !== "randomBox") {
            if(productCategory === "character") {
                functionPurchase(productPrice, window.sessionStorage.id, window.sessionStorage.clickItem, productCategory, navigate);
            }
            else {
                if(window.sessionStorage.clickItem === "color") {
                    functionPurchase(productPrice, window.sessionStorage.id, selectHairColor, "outfit", navigate);
                }
                else {
                    functionPurchase(productPrice, window.sessionStorage.id, window.sessionStorage.clickItem, "outfit", navigate);
                }
            }
        }
        else if(userPoint - productPrice >= 0 && window.sessionStorage.clickItem === "randomBox") {
            
        }
        else if(userPoint - productPrice < 0) {
            alert("현재 보유한 포인트가 부족하여 구매할 수 없습니다.");
        }
    }

    //염색약 고를 때 색 바뀔 때마다 호출되는 이벤트 함수
    const handleChangeHairColor = (e) => {
        setSelectHairColor(e.target.value);
    }

    if(loadingStatus) {
        return (
            <div id="productDetailAllContainer">
                <div id="productDetailContainer">
                    <img src={imageSrc}/>
                    <div>
                        <h3>{productTitle}</h3>
                        {window.sessionStorage.clickItem === "color" ? 
                        <select onChange={handleChangeHairColor}>
                            <option value="color0">빨간색</option>
                            <option value="color1">초록색</option>
                            <option value="color2">파란색</option>
                            <option value="color3">검정색</option>
                            <option value="color4">하얀색</option>
                        </select> : null}
                        <hr/>
                        <p>가격</p>
                        <span>{productPrice}p</span>
                        <p>보유 포인트</p>
                        <span>{userPoint}p</span>
                        <p>잔액</p>
                        <span>{userPoint - productPrice}p</span>

                        <button onClick={handlePurchase}>바로 구매 &gt;</button>
                        <div>
                            <p>상품 카테고리 : {productCategory}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if(!loadingStatus) {
        return (
            <div id='boardDetailAllContainer' style={{textAlign:"center"}}>
                <Spinner animation="border" />
            </div>
        )
    }
}

export default ProductDetail;