// import image src 
import DownloadSrc01 from "../../Images/DownloadExplanation01.png";
import DownloadSrc02 from "../../Images/DownloadExplanation02.png";
import DownloadSrc03 from "../../Images/DownloadExplanation03.png";
import DownloadSrc04 from "../../Images/DownloadExplanation04.png";
import DownloadSrc05 from "../../Images/DownloadExplanation05.png";
import DownloadSrc06 from "../../Images/DownloadExplanation06.png";
// import components
import DownloadInfoArea from "./DownloadInfoArea";

function DownloadFileInfo() {

    const infoArray = [["1. 메인 페이지에서 '시작하기' 버튼을 클릭하여 withrium.zip 파일을 다운로드 받습니다.", DownloadSrc01], 
                        ["2. 다운받은 withrium.zip 파일을 압축 해제하면 아래 이미지와 같이 withrium 폴더가 생성됩니다.", DownloadSrc02],
                        ["3. withrium 폴더 안에 있는 GraduatedProject.exe 파일을 클릭하여 실행시킵니다.", DownloadSrc03],
                        ["4. 실행 전 아래 이미지와 같은 화면이 나오는데, 추가 정보를 클릭합니다.", DownloadSrc04],
                        ["5. 아래에 새로 생긴 실행 버튼을 클릭합니다.", DownloadSrc05],
                        ["6. 위 과정을 거치면 최종적으로 Withrium 클라이언트 프로그램이 실행됩니다.", DownloadSrc06]]

    return (
        <div>
            {infoArray.map((info, index) => (
                <DownloadInfoArea explain={info[0]} key={index} imageSrc={info[1]} />
            ))}
        </div>
    )
}

export default DownloadFileInfo;