function IsPerfectNumber(num){
    if(num < 2) return false; 
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

document.addEventListener("DOMContentLoaded", (e) => {
    const messageDiv = document.getElementById("forMessage");
    const errorDiv = document.getElementById("forError");

    const input = document.getElementById("input"); 
    input.addEventListener("change", (e) => {
        messageDiv.style.opacity=0;
        setTimeout(() => { messageDiv.classList = []; }, 200);
        const num = e.target.value;
        if(Math.round(num) != num) {
            errorDiv.textContent = "Число должно быть целым!";
            errorDiv.style.opacity=1;
            setTimeout(() => { errorDiv.style.opacity=0 }, 1500);
            return;
        }
        if(num < 0) {
            errorDiv.textContent = "Число должно быть положительным!";
            errorDiv.style.opacity=1;
            setTimeout(() => { errorDiv.style.opacity=0 }, 1500);
            return;
        }
        if(IsPerfectNumber(parseInt(num))){
            setTimeout(() => { 
                console.log(`число ${num}: true`)
                messageDiv.textContent = `Число ${num} - Идеально!! 🎉🤩🤩🎉`;
                messageDiv.classList.add("perfDiv");
                messageDiv.style.opacity=1;
             }, 300);
        }
        else{
            setTimeout(() => { 
                                console.log(`число ${num}: false`)
                messageDiv.textContent = `Число ${num} - не Идеально..  😢😢`;
                messageDiv.classList.add("inperfDiv");
                messageDiv.style.opacity=1;
            }, 300);
        }
    })

    let flag = false; 
    const button = document.getElementById("check");

    button.addEventListener("click", (e) => {
        if(!flag){
            flag = true;
            button.textContent = "Прекратить";
            test();
         }
        else{
            flag = false;
            button.textContent = "Проверить числа от 0 до 100";
        }
    })


    async function test(){
        for(let i = 0; i < 101; ++i) {
                if(!flag) {return; }
                input.value = i;
                const event = new Event('change');
                input.dispatchEvent(event);
                await sleep(1500); 
            }
    }
})


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


