const EMPTY_OBJ = {
    //大巴
    count: 0,
    ffjCount: 0,
    whiteRingCount: 0,
    blueRingCount: 0,
    redRingCount: 0,
    unHitCount: 0,
    //akx
    akxCount: 0,//akx蓝数
    akxFfj: 0,
    akxWhiteRingCount: 0,
    akxBlueRingCount: 0,
    akxRedRingCount: 0,
    akxUnHitCount: 0,
    //cb
    cbCount: 0,
    cbFfj: 0,
    //大公
	grandeCount: 0,
	grandeFfjCount: 0,
	grandeWhiteRingCount: 0,
	grandeBlueRingCount: 0,
	grandeRedRingCount: 0,
	grandeUnHitCount: 0,

    historyHitArray: []
}

refreshStats();

document.addEventListener('DOMContentLoaded', function () {
    var obutton = document.getElementById("resetCounter").getElementsByTagName("button");
    for (var i = obutton.length - 1; i >= 0; i--) {
        obutton[i].onclick = i == 0 ? () => resetPbCounter()
            : i == 1 ? () => resetAkxCounter()
            : i == 2 ? () => resetCbCounter()
            : () => resetGrandeCounter()
    }
});

function resetPbCounter() {
    chrome.storage.sync.get("blueChestObj", function (result) {
        let resetObj;
        if (!result.blueChestObj) {
            resetObj = EMPTY_OBJ;
        } else {
            resetObj = result.blueChestObj;
            resetObj.count = 0;
            resetObj.whiteRingCount = 0;
            resetObj.blueRingCount = 0;
            resetObj.redRingCount = 0;
            resetObj.unHitCount = 0;
        }

        chrome.storage.sync.set({ "blueChestObj": resetObj }, function () {
            console.log('大巴蓝箱记录已重置' + JSON.stringify(resetObj));
        })
        refreshStats();
    })
}

function resetAkxCounter() {
    chrome.storage.sync.get("blueChestObj", function (result) {
        let resetObj;
        if (!result.blueChestObj) {
            resetObj = EMPTY_OBJ;
        } else {
            resetObj = result.blueChestObj;
            resetObj.akxCount = 0;
            resetObj.akxFfj = 0;
            resetObj.akxWhiteRingCount = 0;
            resetObj.akxBlueRingCount = 0;
            resetObj.akxRedRingCount = 0;
            resetObj.akxUnHitCount = 0;
        }

        chrome.storage.sync.set({ "blueChestObj": resetObj }, function () {
            console.log('akx蓝箱记录已重置' + JSON.stringify(resetObj));
        });
        refreshStats();
    });
}

function resetCbCounter() {
    chrome.storage.sync.get("blueChestObj", function (result) {
        let resetObj;
        if (!result.blueChestObj) {
            resetObj = EMPTY_OBJ;
        } else {
            resetObj = result.blueChestObj;
            resetObj.cbCount = 0;
            resetObj.cbFfj = 0;
        }
        chrome.storage.sync.set({ "blueChestObj": resetObj }, function () {
            console.log('cb记录已重置' + JSON.stringify(resetObj));
        });
        refreshStats();
    });
}

function resetGrandeCounter() {
    chrome.storage.sync.get("blueChestObj", function (result) {
        let resetObj;
        if (!result.blueChestObj) {
            resetObj = EMPTY_OBJ;
        } else {
            resetObj = result.blueChestObj;
            resetObj.grandeCount = 0;
            resetObj.grandeFfjCount = 0;
            resetObj.grandeWhiteRingCount = 0;
            resetObj.grandeBlueRingCount = 0;
            resetObj.grandeRedRingCount = 0;
            resetObj.grandeUnHitCount = 0;
        }

        chrome.storage.sync.set({ "blueChestObj": resetObj }, function () {
            console.log('大公蓝箱记录已重置' + JSON.stringify(resetObj));
        });
        refreshStats();
    });
}

function getHistoryHitStr(array) {
    let str = '';
    array.map((e, i) => {
        str += (e.k + ' ' + e.v)
        if (i != array.length - 1) str += '; '
    })
    return str
}

function refreshStats() {
    chrome.storage.sync.get("blueChestObj", function (result) {
        if (!result.blueChestObj) {
            document.getElementById("blue-chest").innerHTML = 0;
            document.getElementById("white-ring").innerHTML = 0;
            document.getElementById("blue-ring").innerHTML = 0;
            document.getElementById("red-ring").innerHTML = 0;
            document.getElementById("ffj").innerHTML = 0;
            document.getElementById("un-hit").innerHTML = 0;
    
            document.getElementById("akx-blue-chest").innerHTML = 0;
            document.getElementById("akx-white-ring").innerHTML = 0;
            document.getElementById("akx-blue-ring").innerHTML = 0;
            document.getElementById("akx-red-ring").innerHTML = 0;
            document.getElementById("akx-ffj").innerHTML = 0;
            document.getElementById("akx-un-hit").innerHTML = 0;
    
            document.getElementById("cb-chest").innerHTML = 0;
            document.getElementById("cb-ffj").innerHTML = 0;

            document.getElementById("grande-blue-chest").innerHTML = 0;
            document.getElementById("grande-white-ring").innerHTML = 0;
            document.getElementById("grande-blue-ring").innerHTML = 0;
            document.getElementById("grande-red-ring").innerHTML = 0;
            document.getElementById("grande-ffj").innerHTML = 0;
            document.getElementById("grande-un-hit").innerHTML = 0;
    
            document.getElementById("hit-array").innerHTML = '无';
        } else {
            document.getElementById("blue-chest").innerHTML = result.blueChestObj.count;
            document.getElementById("white-ring").innerHTML = result.blueChestObj.whiteRingCount;
            document.getElementById("blue-ring").innerHTML = result.blueChestObj.blueRingCount;
            document.getElementById("red-ring").innerHTML = result.blueChestObj.redRingCount;
            document.getElementById("ffj").innerHTML = result.blueChestObj.ffjCount;
            document.getElementById("un-hit").innerHTML = result.blueChestObj.unHitCount;
    
            document.getElementById("akx-blue-chest").innerHTML = result.blueChestObj.akxCount;
            document.getElementById("akx-white-ring").innerHTML = result.blueChestObj.akxWhiteRingCount;
            document.getElementById("akx-blue-ring").innerHTML = result.blueChestObj.akxBlueRingCount;
            document.getElementById("akx-red-ring").innerHTML = result.blueChestObj.akxRedRingCount;
            document.getElementById("akx-ffj").innerHTML = result.blueChestObj.akxFfj;
            document.getElementById("akx-un-hit").innerHTML = result.blueChestObj.akxUnHitCount;
    
            document.getElementById("cb-chest").innerHTML = result.blueChestObj.cbCount;
            document.getElementById("cb-ffj").innerHTML = result.blueChestObj.cbFfj;

            document.getElementById("grande-blue-chest").innerHTML = result.blueChestObj.grandeCount;
            document.getElementById("grande-white-ring").innerHTML = result.blueChestObj.grandeWhiteRingCount;
            document.getElementById("grande-blue-ring").innerHTML = result.blueChestObj.grandeBlueRingCount;
            document.getElementById("grande-red-ring").innerHTML = result.blueChestObj.grandeRedRingCount;
            document.getElementById("grande-ffj").innerHTML = result.blueChestObj.grandeFfjCount;
            document.getElementById("grande-un-hit").innerHTML = result.blueChestObj.grandeUnHitCount;
    
            document.getElementById("hit-array").innerHTML = (result.blueChestObj.historyHitArray || []).length > 0 ? getHistoryHitStr(result.blueChestObj.historyHitArray) : '无';
        }
    });
}