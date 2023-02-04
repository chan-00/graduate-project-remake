import axios from "axios";

function functionProfileImageModify(formData, setProfileImage, handleProfileImageModifyModalClose) {
    axios({
        url: "http://" + process.env.server_ip + ":8000/back/image_test/",
        data: formData,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((res) => {
        alert("프로필 수정이 완료되었습니다!");
        setProfileImage(res.data.post_data);
        handleProfileImageModifyModalClose();
    }).catch((err) => {
        console.log(err);
    });
}

export default functionProfileImageModify;