
//캐릭터 소개 영역 컴포넌트
function MainCharacterArea() {
    return (
        <div className="contentsContainer" id="characterContainer">
            <div className="contentsTitle" data-aos="fade-up" data-aos-duration="1200">
                다양한 아바타를 골라 팀원들과 활동하세요!
            </div>

            {/*
            <div className="mainContentsContainer" data-aos="fade-up" data-aos-duration="1200">
                <div>
                    <img src="https://i.ibb.co/sHQZrGv/1.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co/bFQk6cM/2.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co/c8TQDSX/3.png" />
                </div>
            </div>

            <div className="mainContentsContainer" data-aos="fade-up" data-aos-duration="1200">
                <div>
                    <img src="https://i.ibb.co/pLxBLKq/1.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co/RY71C6C/2.png" />
                </div>
                <div>
                    <img src="https://i.ibb.co/ZWqR9Vs/3.png" />
                </div>
            </div>
            */}
            <div data-aos="fade-up" data-aos-duration="1200" className="mainContentsContainer">
                <div>
                    <img src="https://media2.giphy.com/media/E5Hfk3kV0G5zcKPWy4/giphy.gif?cid=ecf05e47qjqmibqgahzkwf9og8phuofmfqartc3r748pnwum&rid=giphy.gif&ct=g"></img>
                </div>
            </div>
        </div>
    )
}

export default MainCharacterArea;