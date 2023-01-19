//import react router
import { useNavigate } from "react-router-dom";


function BoardListShow({posts}) {
    //라우팅을 위한 useNavigate 함수
    const navigate = useNavigate();

    //팀 리스트에서 특정 팀을 클릭했을 때 팀 상세 페이지로 넘어가게 하기 위한 이벤트 함수
    const handleBoardClick = (boardID) => {
        window.sessionStorage.setItem("currentClickBoardID", boardID);
        navigate("/boarddetail");
    }

    return (
        <tbody>
            {posts.map((post) => (
                <tr key={post[0][0]} id={post[0][0]} onClick={() => handleBoardClick(post[0][0])}>
                    <td>{post[0][1]}</td>
                    <td>{post[0][2]}</td>
                    <td>{post[1][0]}</td>
                    <td>{post[0][3]}</td>
                    <td>{post[0][4]}</td>
                    <td>{post[0][5]}</td>
                </tr>
            ))}
        </tbody>
    )
}

export default BoardListShow;