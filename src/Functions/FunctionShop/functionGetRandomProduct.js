//랜덤박스를 돌렸을 때 확률에 따른 결과 값을 반환해주는 함수
function functionGetRandomProduct() {
    //랜덤값 생성 (1~1000)
    const ranNum = Math.floor((Math.random() * 999) +1);

    //경품 생성
    const gift = ['ch3', 'hat3', 'top2', 'pants2', 'bag2', 'shoes2', 'ch0', 'ch1', 'ch2', 'top0', 'top1', 'pants0', 'pants1', 'hat0', 'hat1', 'hat2', 'bag0', 'bag1', 'shoes0', 'shoes1', '100', '50', '30', '10'];
    //확률 생성
    const pbt = [20, 28, 36, 44, 52, 60, 74, 87, 100, 120, 140, 160, 180, 194, 207, 220, 240, 260, 280, 300, 350, 500, 800, 1000];

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