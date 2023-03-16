//import react router
import { useNavigate } from "react-router-dom";


function TeamListShow({ posts, userProfileInfo }) {
    //라우팅을 위한 useNavigate 함수
    const navigate = useNavigate();

    //팀 리스트에서 특정 팀을 클릭했을 때 팀 상세 페이지로 넘어가게 하기 위한 이벤트 함수
    const handleTeamClick = (teamname) => {
        window.sessionStorage.setItem("currentClickTeam", teamname);
        window.sessionStorage.setItem("teamSelectMenuValue", "TeamInfo");
        navigate("/teaminfo");
    }

    return (
        <tbody>
            {posts.map((post, index1) => (
                <tr key={post[0][0]} id={post[0][0]} onClick={() => handleTeamClick(post[0][0])} style={{cursor:"pointer"}}>
                    <td>{post[0][0]}</td>
                    <td>{post[0][2]}</td>
                    <td>{post[0][1]}</td>
                    <td>
                        {post[1].map((member, index2) => (
                            <img className="userProfile" src={`data:image/png;base64,${userProfileInfo[index1][index2]}`} key={member[0]} title={member[0]} />
                        ))}
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default TeamListShow;