//import css
import "../../../css/TeamPageCss/ChatLog.css";
//import react bootstrap icons
import { PersonCircle } from "react-bootstrap-icons";


function ChatLog() {
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
                                안
                                녕
                                하
                                세요
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ChatLog;