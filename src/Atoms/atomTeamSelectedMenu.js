import { atom } from "recoil";
//팀 페이지에서 사용자가 현재 어떤 메뉴를 클릭했는지에 대한 정보 값
const atomTeamSelectedMenu = atom({
    key: "atomTeamSelectedMenu",
    default: "TeamInfo"
});

export default atomTeamSelectedMenu;