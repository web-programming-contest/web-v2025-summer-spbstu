"use strict";

function findEquilibriumIndex(arr) {
    let frontInd = 0;
    let backInd = arr.length - 1;
    let frontSum = 0;
    let backSum = 0;
    while (frontInd <= backInd) {
        if (frontSum > backSum) {
            backSum += arr[backInd];
            --backInd;
        }
        else {
            frontSum += arr[frontInd];
            ++frontInd;
        }
    }
    if (frontSum === backSum && frontInd !== 0) {
        return frontInd;
    }
    else {
        return -1;
    }
}
