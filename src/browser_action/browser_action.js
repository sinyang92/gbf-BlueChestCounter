chrome.storage.local.get(['blueChestObj'], function (result) {
    if (!result.blueChestObj) {
        document.getElementById("blue-chest").innerHTML = 0;
        document.getElementById("white-ring").innerHTML = 0;
        document.getElementById("blue-ring").innerHTML = 0;
        document.getElementById("red-ring").innerHTML = 0;
        document.getElementById("ffj").innerHTML = 0;
        document.getElementById("un-hit").innerHTML = 0;
        document.getElementById("hit-array").innerHTML = '无';
    } else {
        document.getElementById("blue-chest").innerHTML = result.blueChestObj.count;
        document.getElementById("white-ring").innerHTML = result.blueChestObj.whiteRingCount;
        document.getElementById("blue-ring").innerHTML = result.blueChestObj.blueRingCount;
        document.getElementById("red-ring").innerHTML = result.blueChestObj.redRingCount;
        document.getElementById("ffj").innerHTML = result.blueChestObj.ffjCount;
        document.getElementById("un-hit").innerHTML = result.blueChestObj.unHitCount;
        document.getElementById("hit-array").innerHTML = (result.blueChestObj.historyHitArray || []).length > 0 ? getHitStr(result.blueChestObj.historyHitArray) : '无';
    }
});


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("resetCounter").addEventListener("click", resetCounter);
});

function resetCounter() {
    document.getElementById("blue-chest").innerHTML = 0;

    chrome.storage.local.get(['blueChestObj'], function (result) {
        let resetObj;
        if (!result.blueChestObj) {
            resetObj = {
                count: 0,
                ffjCount: 0,
                whiteRingCount: 0,
                blueRingCount: 0,
                redRingCount: 0,
                unHitCount: 0,
                historyHitArray: []
            }
        } else {
            resetObj = result.blueChestObj
            resetObj.count = 0
        }
        chrome.storage.local.set({ 'blueChestObj': resetObj }, function () {
            console.log('蓝箱记录已重置');
        });
    });
}

function getHitStr(array) {
    let str = '';
    array.map((e, i) => {
        str += e.v
        if (i != array.length - 1) str += ';'
    })
    return str
}