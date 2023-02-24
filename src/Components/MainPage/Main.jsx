//import Main css
import "../../css/MainPageCss/Main.css";
//import aos
import AOS from "aos";
import "aos/dist/aos.css";
//import react hooks
import { useEffect, useState, useRef } from "react";
//import user component
import MainMapArea from "./MainMapArea";
import MainCharacterArea from "./MainCharacterArea";
//import functions
import functionDownloadUnityFile from "../../Functions/functionDownloadUnityFile";
//import react router
import { useNavigate } from "react-router-dom";


//메인 페이지 영역 제작
//맵 소개와 캐릭터 소개 영역은 내용이 길어져 따로 component로 만들었다.
function Main() {
    //화면 이동을 담당할 useNavigate 변수
    const navigate = useNavigate();

    //blob 객체의 다운로드 url 값을 저장할 useState 변수
    const [ downloadUrl, setDownloadUrl ] = useState("");

    //blob 객체를 받을 시 a 링크 클릭을 담당하는 useRef
    const downloadElementRef = useRef();

    //스크롤을 내릴 때 fade-on 되는 애니메이션 적용을 위한 AOS 객체의 초기화를 useEffect에서 해 줘야 한다.
    useEffect(() => {
        AOS.init();
    }, []);
    //백엔드로부터 파일 객체를 받을 시 다운받는 경로가 생기는데, 이 때 화면상에는 보이지 않는 a 태그의 클릭 이벤트를 호출하여 파일을 다운받도록 한다.
    useEffect(() => {
        if(downloadUrl.length !== 0) {
            downloadElementRef.current.click();
            navigate("/downloadinfo");
        }
    }, [downloadUrl]);

    //시작하기 버튼 클릭 시 백엔드로부터 unity 프로그램 파일을 받아 오는 이벤트 함수이다.
    const handleDownloadButtonClick = () => {
        functionDownloadUnityFile(setDownloadUrl, downloadUrl);
        alert("프로그램이 설치되기 전까지 잠깐 기다려 주세요.");
    }

    return (
        <>
            <div className="contentCenter" id="mainContentContainer">
                <div data-aos="fade-up" data-aos-duration="1200">
                    상상하는 모든 것.<br/>
                    위드리움에서.<br />
                    <button id="withriumDownloadButton" onClick={handleDownloadButtonClick}>시작하기</button>
                    <a style={{visibility:"hidden"}} ref={downloadElementRef} href={downloadUrl.length !== 0 ? downloadUrl : null} download="WithRium.zip"></a>
                </div>
                
            </div>
            <MainMapArea></MainMapArea>
            <MainCharacterArea></MainCharacterArea>
        </>
    )
}

export default Main;