//import Main css
import "../../css/MainPageCss/Main.css";
//import aos
import AOS from "aos";
import "aos/dist/aos.css";
//import react hooks
import { useEffect } from "react";
//import user component
import MainMapArea from "./MainMapArea";
import MainCharacterArea from "./MainCharacterArea";


//메인 페이지 영역 제작
//맵 소개와 캐릭터 소개 영역은 내용이 길어져 따로 component로 만들었다.
function Main() {
    //스크롤을 내릴 때 fade-on 되는 애니메이션 적용을 위한 AOS 객체의 초기화를 useEffect에서 해 줘야 한다.
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <div className="contentCenter" id="mainContentContainer">
                <div data-aos="fade-up" data-aos-duration="1200">
                    상상하는 모든 것.<br/>
                    서일대학교에서.
                </div>
                <button id="">시작하기</button>
            </div>
            <MainMapArea></MainMapArea>
            <MainCharacterArea></MainCharacterArea>
        </>
    )
}

export default Main;