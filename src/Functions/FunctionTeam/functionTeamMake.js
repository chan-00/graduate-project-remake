import axios from "axios";

function functionTeamMake(idValue, teamnameRef, teamDescRef, teamCategory, navigate) {
    //백엔드와 통신하기 전 입력한 내용의 길이를 체크하는 조건문 코드이다.
    if(teamnameRef.current.value.length === 0 || teamnameRef.current.value.length > 100) {
        alert("팀 이름을 입력하지 않았거나 100글자 이상입니다.");
        teamnameRef.current.focus();
        return false;
    }
    else if(teamDescRef.current.value.length > 400) {
        alert("팀 설명이 400글자 이상입니다.");
        teamDescRef.current.focus();
        return false;
    }

    //팀명을 정규 표현식으로 입력에 제한을 거는 코드이다.
    const teamnamePattern = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣]*$/;
    if(!teamnamePattern.test(teamnameRef.current.value)) {
        alert("현재 입력한 팀 이름에 특수문자 혹은 공백이 포함되어 있습니다.");
        teamnameRef.current.focus();
        return false;
    }

    axios.post("http://" + process.env.server_ip + ":8000/back/make_team/", {
        id: idValue,
        teamname: teamnameRef.current.value,
        teamdesc: teamDescRef.current.value,
        teamcategory: teamCategory
    }).then((res) => {
        if(res.data.chk_message === "팀 생성이 완료되었습니다.") {
            alert(res.data.chk_message);
            navigate("/team");
        }
        else if(res.data.chk_message === "팀 이름이 중복입니다.") {
            alert("이미 해당 팀명으로 팀이 만들어져 있습니다.");
            teamnameRef.current.focus();
        }
        else if(res.data.chk_message === "사용 할 수 없는 팀 이름입니다.") {
            alert("사용 할 수 없는 팀 이름입니다.(Team, Question, Share, list-group-item)");
            teamnameRef.current.focus();
        }
    }).catch((err) => {
        console.log(err);
    })
}

export default functionTeamMake;