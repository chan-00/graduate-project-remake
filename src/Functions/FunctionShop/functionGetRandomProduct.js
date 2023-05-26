//랜덤박스를 돌렸을 때 확률에 따른 결과 값을 반환해주는 함수
function functionGetRandomProduct() {
    //랜덤값 생성 (1~1000)
    const ranNum = Math.floor((Math.random() * 999) +1);

    //경품 생성
    const gift = ['ch3', 'hat3', 'top1', 'pants1', 'ch0', 'ch1', 'ch2', 'top0', 'pants0', 'hat0', 'hat1', 'hat2', 'bag0', 'bag1', '150', '50', '30', '10'];
    //확률 생성
    const pbt = [20, 40, 60, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380, 400, 500, 800, 1000];

    for (let i = 0; i < gift.length; i++) {
        if(i !== 0) {
            if(ranNum > pbt[i - 1] && ranNum <= pbt[i]) {
                return gift[i];
            }
        }
        else if(i === 0) {
            if(ranNum >= 1 && ranNum <= pbt[i]) {
                return gift[i];
            }
        }
    }
}

export default functionGetRandomProduct;