//import Image src
import CafeSrc from "../../Images/MainCafeImage.png";
import MainOfficeSrc from "../../Images/MainOfficeImage.png";
import MainSpringSquareSrc from "../../Images/MainSquareImage_Spring.png";
import MainSummerSquareSrc from "../../Images/MainSquareImage_Summer.png";
import MainAutumnSquareSrc from "../../Images/MainSquareImage_Autumn.png";
import MainWinterSquareSrc from "../../Images/MainSquareImage_Winter.png";
import MainLibrarySrc from "../../Images/MainLibraryImage.png";
import MainRoomSrc from "../../Images/MainRoomImage.png";
//import Carousel
import { Carousel } from "react-bootstrap";

//맵 소개 영역 컴포넌트
function MainMapArea() {
    return (
        <div className="contentsContainer">
            <div className="contentsTitle" data-aos="fade-up" data-aos-duration="1200">
                다양한 만남을 위한 위드리움
                <p>
                    다양한 사람들과 만날 수 있는 광장부터,<br/>
                    관심사를 공유하는 사적인 모임까지
                </p>
            </div>

            <div className="mainContentsContainer" data-aos="fade-up" data-aos-duration="1200">
                <h2>1. 광장</h2>
                <p>모두가 모여 소통할 수 있는 사계절 배경의 광장입니다</p>
                <Carousel fade>
                    <Carousel.Item>
                        <img src={MainSpringSquareSrc} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={MainSummerSquareSrc} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={MainAutumnSquareSrc} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={MainWinterSquareSrc} />
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="mainContentsContainer" data-aos="fade-up" data-aos-duration="1200">
                <h2>2. 카페</h2>
                <p>잔잔한 분위기의 학습하기 좋은 카페입니다</p>
                <img src={CafeSrc} />
            </div>

            <div className="mainContentsContainer" data-aos="fade-up" data-aos-duration="1200">
                <h2>3. 회의실</h2>
                <p>오피스 분위기가 물씬 풍기는 회의실입니다</p>
                <img src={MainOfficeSrc} />
            </div>

            <div className="mainContentsContainer" data-aos="fade-up" data-aos-duration="1200">
                <h2>4. 도서관</h2>
                <p>마음이 편안해지는 도서관입니다</p>
                <img src={MainLibrarySrc} />
            </div>

            <div className="mainContentsContainer" data-aos="fade-up" data-aos-duration="1200">
                <h2>5. 방</h2>
                <p>마치 자신의 방에 있는 듯한 느낌의 프라이빗 룸입니다</p>
                <img src={MainRoomSrc} />
            </div>
        </div>
    )
}

export default MainMapArea;