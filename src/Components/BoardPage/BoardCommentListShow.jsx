//react bootstrap icons
import { Pencil, Trash } from "react-bootstrap-icons";
//import functions
import functionBoardCommentDelete from "../../Functions/FunctionBoard/functionBoardCommendDelete";


function BoardCommentListShow({posts, commentRef, setModifyState, setCommentInfo}) {
    //수정 버튼 클릭 시 호출되는 이벤트 함수
    const handleCommentModify = (modifyCommend, modifyCommentID) => {
        commentRef.current.value = modifyCommend;
        commentRef.current.focus();
        setModifyState(modifyCommentID);
    }
    //삭제 버튼 클릭 시 호출되는 이벤트 함수
    const handleCommentDelete = (deleteCommentID) => {
        functionBoardCommentDelete(window.sessionStorage.currentClickBoardID, deleteCommentID, setCommentInfo, setModifyState, commentRef);
    }

    return (
        <div>
            {posts.map((post) => {
                return(
                    <div key={post[0]} id={post[0]} className="commentsContainer">
                        <span>{post[2]}</span>
                        <pre>{post[1]}</pre>
                        <span>
                            {post[3]}
                            {post[2] === window.sessionStorage.nickname ? 
                                <div>
                                    <Pencil onClick={() => handleCommentModify(post[1], post[0])}></Pencil>
                                    <Trash onClick={() => handleCommentDelete(post[0])}></Trash>
                                </div> : null}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default BoardCommentListShow;