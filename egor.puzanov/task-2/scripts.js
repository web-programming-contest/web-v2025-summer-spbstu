function IsPerfectNumber(num){
    if(num === 1) return false; 
    let dividersSum = 0;
    const someConst = Math.floor(Math.sqrt(num)) + 1
    for(let i = 1; i < someConst; ++i){
        const res = num / i;
        if(Math.floor(res) === res){
            dividersSum += i;
            dividersSum += res;
        }
    }
    dividersSum -= num;
    return dividersSum === num;
}