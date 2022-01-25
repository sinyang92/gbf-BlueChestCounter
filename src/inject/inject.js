const regex = new RegExp("http:\/\/game\.granbluefantasy\.jp\/#result_multi\/(?!detail)[0-9]*");
const BLUE_CHEST_CLASS_NAME = "ico-treasure-11-mini";
const anima_id_list = ["10_41", "10_42", "10_43", "10_44", "10_45", "10_46"];
const EMPTY_OBJ = {
	count: 0,
	ffjCount: 0,
	whiteRingCount: 0,
	blueRingCount: 0,
	redRingCount: 0,
	unHitCount:0,
	historyHitArray:[]
};
var check;

$(window).bind('hashchange', function () {
	if (window.location.href.match(regex)) {
		check = setInterval(function () {
			if (isBigBa()) {
				if (document.getElementsByClassName(BLUE_CHEST_CLASS_NAME).length > 0) {
					chrome.storage.local.get(['blueChestObj'], function (result) {
						if (!result.blueChestObj) {
							chrome.storage.local.set({ 'blueChestObj': getBlueChestObj() }, function () {
								console.log('蓝箱、戒指设置初始化');
								// clearInterval(check);
							});
						} else {
							let obj = getBlueChestObj(result.blueChestObj)
							chrome.storage.local.set({ 'blueChestObj': obj }, function () {
								console.log('蓝箱设置为： ' + (obj.count));
								// clearInterval(check);
							})
						}
					});
				}
			}
		}, 500);

	} else {
		clearInterval(check);
	}
});

function isBigBa() {
	var retVal = false

	for (i = 0; i < anima_id_list.length; i++) {
		if (document.querySelector("[data-key='" + anima_id_list[i] + "']") != undefined) {
			console.log("侦测到大巴结算页");
			clearInterval(check);
			retVal = true;
			break;
		}
	}

	return retVal;
}

function getBlueChestObj(data) {
	let obj = data || EMPTY_OBJ
	obj.count += 1
	obj.unHitCount += 1
	if (document.querySelector("[data-key='17_20004']")) {
		obj.ffjCount += 1
		obj.historyHitArray.push({k : new Date().toLocaleString(), v : obj.unHitCount})
		obj.unHitCount = 0
	} else if (document.querySelector("[data-key='73_1']")) {
		obj.whiteRingCount += 1
	} else if (document.querySelector("[data-key='73_2']")) {
		obj.blueRingCount += 1
	} else if (document.querySelector("[data-key='73_3']")) {
		obj.redRingCount += 1
	}
	return obj;
}
