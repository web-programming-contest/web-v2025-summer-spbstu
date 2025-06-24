function intersection(arr1, arr2){
    const intersection = [];
    if(arr1.length < arr2.length){
        arr1.sort();
        for(let i = 0; i < arr2.length; ++i){
            const index = binSearch(arr1, arr2[i]);
            if(index != -1){
                arr1.splice(index, 1);
                intersection.push(arr2[i]);
            }
        }
    }
    else{
        arr2.sort();
        for(let i = 0; i < arr1.length; ++i){
            const index = binSearch(arr2, arr1[i]);
            if(index != -1){
                arr2.splice(index, 1);
                intersection.push(arr1[i]);
            }
        }
    }
    return intersection;
}

function intersection1(arr1, arr2){ //Версия, сделанная на занятии
    const intersection = [];
    arr1.sort();
    arr2.sort();
    const len = Math.min(arr1.length, arr2.length);
    let i = 0, j = 0;
    while(i < arr1.length && j < arr2.length){
        if(arr1[i] == arr2[j]){
            intersection.push(arr1[i]);
            ++i;
            ++j;
        }
        else if (arr1[i] > arr2[j]){
            ++j;
        }
        else{
            ++i;
        }
    }
    return intersection;
}

function binSearch(arr, x) {

    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {

        const mid = Math.floor((start + end) / 2);

        if (arr[mid] === x) return mid;

        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }

    return -1;
}

document.addEventListener("DOMContentLoaded", (e) => {
    const displayDiv = document.getElementById("displayDiv");
    displayDiv.style.opacity=0;
    const styleDiv =  document.getElementById("forStyle");
    const messageDiv = document.getElementById("forMessage");
    const errorDiv = document.getElementById("forError");

    const input1 = document.getElementById("arr1"); 
    const input2 = document.getElementById("arr2"); 

    document.getElementById("start").addEventListener("click", (e) => {
        displayDiv.style.opacity=0;
        setTimeout(() => { styleDiv.classList = [] }, 300);
        let arr1 = [];
        let arr2 = [];
        try{
            const val1 = input1.value;
            arr1 = val1.includes(", ") ? val1.split(", ") : 
                   val1 === "" ? [] : [val1];
        }
        catch{
            errorDiv.textContent = "Что-то не так с первым массивом! Вы правильно все ввели?";
            errorDiv.style.opacity=1;
            setTimeout(() => { errorDiv.style.opacity=0 }, 1500);
            return;
        }
        try{
            const val2 = input2.value;
            arr2 = val2.includes(", ") ? val2.split(", ") : 
                   val2 === "" ? [] : [val2];
        }
        catch{
            errorDiv.textContent = "Что-то не так со вторым массивом! Вы правильно все ввели?";
            errorDiv.style.opacity=1;
            return;
        }

        setTimeout(() => {
            document.getElementById("elementsDiv1").textContent=`['${arr1.join("\', \'")}']`;
            document.getElementById("elementsDiv2").textContent=`['${arr2.join("\', \'")}']`;
            const result = intersection(arr1, arr2);
            if(result.length === 0){
                document.getElementById("labelMessage").textContent = "Их пересечение - пустое 😭";
                styleDiv.classList.add("emptyDiv");
                
            }
            else{
                document.getElementById("labelMessage").textContent = "Их пересечение 🧐";
                styleDiv.classList.add("NotEmptyDiv");
            }
            messageDiv.textContent=`['${result.join("\', \'")}']`;
            displayDiv.style.opacity=1;
        }, 400);
    })

    document.getElementById("check").addEventListener("click", (e) => {
        const arr1 = Array.from({ length: Math.ceil(Math.random()*12) }, () => Math.round(Math.random()*30));
        const arr2 = Array.from({ length: Math.ceil(Math.random()*12) }, () => Math.round(Math.random()*30));

        input1.value =arr1.join(", ");
        input2.value=arr2.join(", ");

        const event = new Event('click');
        document.getElementById("start").dispatchEvent(event);

    })
})




