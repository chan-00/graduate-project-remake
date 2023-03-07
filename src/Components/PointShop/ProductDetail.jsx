//import react hooks
import { useEffect, useState } from "react";
//import react bootstrap
import { useNavigate } from "react-router-dom";


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

    //비정상적인 경로 접속 차단과 유저의 보유 포인트 값을 알기 위한 useEffect 함수
    useEffect(() => {
        if(!window.sessionStorage.clickItem || !window.sessionStorage.id) {
            alert("비정상적인 접근입니다!");
            navigate("/shop");
        }
        else if(window.sessionStorage.clickItem && window.sessionStorage.id) {


            if(window.sessionStorage.clickItem === "ch0") {
                setImageSrc("https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg");
                setProductTitle("캐릭터01");
                setProductPrice(300);
            }
            else if(window.sessionStorage.clickItem === "ch1") {
                setImageSrc("https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg");
                setProductTitle("캐릭터02");
                setProductPrice(300);
            }
            else if(window.sessionStorage.clickItem === "ch2") {
                setImageSrc("https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875_960_720.jpg");
                setProductTitle("캐릭터03");
                setProductPrice(300);
            }
            else if(window.sessionStorage.clickItem === "top0") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png");
                setProductTitle("상의01");
                setProductPrice(100);
            }
            else if(window.sessionStorage.clickItem === "top1") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png");
                setProductTitle("상의02");
                setProductPrice(100);
            }
            else if(window.sessionStorage.clickItem === "pants0") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg");
                setProductTitle("하의01");
                setProductPrice(100);
            }
            else if(window.sessionStorage.clickItem === "pants1") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/11/21/16/01/clothes-1846128_960_720.jpg");
                setProductTitle("하의02");
                setProductPrice(100);
            }
            else if(window.sessionStorage.clickItem === "hat0") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg");
                setProductTitle("모자01");
                setProductPrice(80);
            }
            else if(window.sessionStorage.clickItem === "hat1") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg");
                setProductTitle("모자02");
                setProductPrice(80);
            }
            else if(window.sessionStorage.clickItem === "hat2") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/05/17/22/16/baby-1399332_960_720.jpg");
                setProductTitle("모자03");
                setProductPrice(80);
            }
            else if(window.sessionStorage.clickItem === "bag0") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg");
                setProductTitle("가방01");
                setProductPrice(80);
            }
            else if(window.sessionStorage.clickItem === "bag1") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/06/25/12/48/go-pro-1478810_960_720.jpg");
                setProductTitle("가방02");
                setProductPrice(80);
            }
            else if(window.sessionStorage.clickItem === "shoes0") {
                setImageSrc("https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg");
                setProductTitle("신발01");
                setProductPrice(60);
            }
            else if(window.sessionStorage.clickItem === "shoes1") {
                setImageSrc("https://cdn.pixabay.com/photo/2017/04/09/18/54/shoes-2216498_960_720.jpg");
                setProductTitle("신발02");
                setProductPrice(60);
            }
            else if(window.sessionStorage.clickItem === "color") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/06/11/12/13/pink-hair-1450045_960_720.jpg");
                setProductTitle("머리 염색약");
                setProductPrice(10);
            }
            else if(window.sessionStorage.clickItem === "randomBox") {
                setImageSrc("https://cdn.pixabay.com/photo/2016/12/09/04/02/presents-1893640_960_720.jpg");
                setProductTitle("랜덤박스");
                setProductPrice(50);
            }
        }
    }, []);

    return (
        <div id="productDetailAllContainer">
            <img src={imageSrc}/>

        </div>
    )
}

export default ProductDetail;