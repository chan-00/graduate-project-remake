//import css
import "../../../css/TeamPageCss/ChatLog.css";
//import react bootstrap icons
import { PersonCircle } from "react-bootstrap-icons";
//import react hooks
import { useEffect, useState } from "react";
//import functions
import functionGetUnityChatLog from "../../../Functions/FunctionTeam/functionGetUnityChatLog";


function ChatLog() {
    //구분선을 그어야 되는 기준값을 담을 변수
    let chatDateChangeStatus = 1;
    //날짜 값이 담길 변수
    let chatLogDate = "";

    //채팅 로그 데이터를 배열 형태로 저장받기 위한 useState 변수
    const [ chatLogArray, setChatLogArray ] = useState([]);

    //unity로부터 해당 팀에서의 채팅 로그가 있었는지 데이터를 받기 위한 useEffect 함수 
    useEffect(() => {
        functionGetUnityChatLog(window.sessionStorage.currentClickTeam, setChatLogArray);
    }, []);
    console.log(chatLogArray);

    return (
        <div id="chatAllContainer">   
            <div id="chatLogContainer">
                <div id="chatTitleContainer">
                    <h4>{window.sessionStorage.currentClickTeam}</h4>
                </div>
                <hr></hr>
                <div id="chatContentsContainer">
                    {chatLogArray.map((chatLog) => {
                        if(chatLogDate !== chatLog[3].substr(0, 10)) {
                            chatLogDate = chatLog[3].substr(0, 10);
                            chatDateChangeStatus = 1;
                        }
                        else if(chatLogDate === chatLog[3].substr(0, 10)) {
                            chatDateChangeStatus = 0;
                        }
                        console.log(chatLogDate);
                        console.log(chatDateChangeStatus);

                        return (
                            <div className={chatLog[2] === window.sessionStorage.nickname ? "myChat" : "otherChat"} key={chatLog[0]}>
                                {chatDateChangeStatus === 1 ? <p className="chatLogDateText" style={{marginBottom:"10px"}}>{chatLogDate}</p> : null}
                                {chatLog[2] === window.sessionStorage.nickname ? null : <PersonCircle title={chatLog[2]}></PersonCircle>}
                                <div className="chatContents">
                                    <p>
                                        {chatLog[1]}
                                    </p>
                                </div>
                                {chatLog[2] === window.sessionStorage.nickname ? <PersonCircle title={chatLog[2]}></PersonCircle> : null}
                                <div className="chatTime">
                                    <span>{chatLog[3].substr(11, 15)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ChatLog;