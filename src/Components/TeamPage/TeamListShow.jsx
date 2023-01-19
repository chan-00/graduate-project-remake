//import react bootstrap icons
import { PersonCircle } from "react-bootstrap-icons"
//import react router
import { useNavigate } from "react-router-dom";


function TeamListShow({posts}) {
    //라우팅을 위한 useNavigate 함수
    const navigate = useNavigate();

    //팀 리스트에서 특정 팀을 클릭했을 때 팀 상세 페이지로 넘어가게 하기 위한 이벤트 함수
    const handleTeamClick = (teamname) => {
        window.sessionStorage.setItem("currentClickTeam", teamname);
        navigate("/teaminfo");
    }

    return (
        <tbody>
            {posts.map((post, index) => (
                <tr key={post[0][0]} id={post[0][0]} onClick={() => handleTeamClick(post[0][0])}>
                    <td>{post[0][0]}</td>
                    <td>{post[0][1]}</td>
                    <td>
                        {post[1].map((member) => (
                            <PersonCircle key={member[0]} title={member[0]}></PersonCircle>
                        ))}
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default TeamListShow;