import CafeSrc from "../../Images/MainCafeImage.png";
import MainOfficeSrc from "../../Images/MainOfficeImage.png";

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
                <p>모두가 모여 소통할 수 있는 광장입니다</p>
                <img src="https://media2.giphy.com/media/E5Hfk3kV0G5zcKPWy4/giphy.gif?cid=ecf05e47qjqmibqgahzkwf9og8phuofmfqartc3r748pnwum&rid=giphy.gif&ct=g" />
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
                <img src="https://media2.giphy.com/media/E5Hfk3kV0G5zcKPWy4/giphy.gif?cid=ecf05e47qjqmibqgahzkwf9og8phuofmfqartc3r748pnwum&rid=giphy.gif&ct=g" />
            </div>

            <div className="mainContentsContainer" data-aos="fade-up" data-aos-duration="1200">
                <h2>5. 방</h2>
                <p>마치 자신의 방에 있는 듯한 느낌의 프라이빗 룸입니다</p>
                <img src="https://media2.giphy.com/media/E5Hfk3kV0G5zcKPWy4/giphy.gif?cid=ecf05e47qjqmibqgahzkwf9og8phuofmfqartc3r748pnwum&rid=giphy.gif&ct=g" />
            </div>
        </div>
    )
}

export default MainMapArea;