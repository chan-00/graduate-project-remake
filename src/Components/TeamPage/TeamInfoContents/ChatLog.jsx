//import css
import "../../../css/TeamPageCss/ChatLog.css";
//import react bootstrap icons
import { PersonCircle } from "react-bootstrap-icons";
//import react hooks
import { useEffect, useState } from "react";
//import functions
import functionGetUnityChatLog from "../../../Functions/FunctionTeam/functionGetUnityChatLog";


function ChatLog() {

    //채팅 로그 데이터를 배열 형태로 저장받기 위한 useState 변수
    const [ chatLogArray, setChatLogArray ] = useState([]);

    //unity로부터 해당 팀에서의 채팅 로그가 있었는지 데이터를 받기 위한 useEffect 함수 
    useEffect(() => {
        //functionGetUnityChatLog(window.sessionStorage.currentClickTeam, setChatLogArray);
    })

    return (
        <div id="chatAllContainer">   
            <div id="chatLogContainer">
                <div id="chatTitleContainer">
                    <h4>{window.sessionStorage.currentClickTeam}</h4>
                </div>
                <hr></hr>
                <div id="chatContentsContainer">
                    <div className="otherChat">
                        <PersonCircle></PersonCircle>
                        <div className="chatContents">
                            <p>
                                안녕하세요.
                            </p>
                        </div>
                        <div className="chatTime">
                            <span>09:54</span>
                        </div>
                    </div>
                    <div className="myChat">
                        <div className="chatContents">
                            <p>
                                어쩌라고요.
                            </p>
                        </div>
                        <PersonCircle></PersonCircle>
                        <div className="chatTime">
                            <span>09:56</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatLog;