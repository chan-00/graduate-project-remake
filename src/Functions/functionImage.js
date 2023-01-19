import axios from "axios";
import server_ip from "../serverIP";

function functionImage(formData, setBaseValue) {
    axios({
        url: "http://" + server_ip + ":8000/back/image_test/",
        data: formData,
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((res) => {
        setBaseValue(res.data.post_data);
    }).catch((err) => {
        console.log(err);
    });
}

export default functionImage;