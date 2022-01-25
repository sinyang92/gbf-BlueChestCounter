const regex = new RegExp("http:\/\/game\.granbluefantasy\.jp\/#result_multi\/(?!detail)[0-9]*");
const BLUE_CHEST_CLASS_NAME = "ico-treasure-11-mini";
const anima_id_list = ["10_41", "10_42", "10_43", "10_44", "10_45", "10_46"];
const UB_NICKNAME = '大巴'
const AKX_ID = ["10_534"];
const AKX_NICKNAME = 'akx'
const CB_ID = ['10_138']
const CB_NICKNAME = '超巴'
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

	historyHitArray: []
};
var check;

$(window).bind('hashchange', function () {
	if (window.location.href.match(regex)) {
		check = setInterval(function () {
			if (isMonster(AKX_ID, AKX_NICKNAME)) {
				if (document.getElementsByClassName(BLUE_CHEST_CLASS_NAME).length > 0) {
					chrome.storage.local.get(['blueChestObj'], function (result) {
						if (!result.blueChestObj) {
							chrome.storage.local.set({ 'blueChestObj': getBlueChestObj(undefined, AKX_NICKNAME) }, function () {
								console.log('akx蓝箱、戒指设置初始化');
							});
						} else {
							let obj = getBlueChestObj(result.blueChestObj, AKX_NICKNAME)
							chrome.storage.local.set({ 'blueChestObj': obj }, function () {
								console.log('akx蓝箱设置为： ' + (obj.akxCount));
							})
						}
					});
				}
			} else if (isMonster(CB_ID, CB_NICKNAME)) {
				chrome.storage.local.get(['blueChestObj'], function (result) {
					if (!result.blueChestObj) {
						chrome.storage.local.set({ 'blueChestObj': getBlueChestObj(undefined, CB_NICKNAME) }, function () {
							console.log('cb设置初始化');
						});
					} else {
						let obj = getBlueChestObj(result.blueChestObj, CB_NICKNAME)
						chrome.storage.local.set({ 'blueChestObj': obj }, function () {
							console.log('cb数设置为： ' + (obj.cbCount));
						})
					}
				});
			} else if (isMonster(anima_id_list, UB_NICKNAME)) {
				if (document.getElementsByClassName(BLUE_CHEST_CLASS_NAME).length > 0) {
					chrome.storage.local.get(['blueChestObj'], function (result) {
						if (!result.blueChestObj) {
							chrome.storage.local.set({ 'blueChestObj': getBlueChestObj(undefined, UB_NICKNAME) }, function () {
								console.log('大巴蓝箱、戒指设置初始化');
							});
						} else {
							let obj = getBlueChestObj(result.blueChestObj, UB_NICKNAME)
							chrome.storage.local.set({ 'blueChestObj': obj }, function () {
								console.log('大巴蓝箱设置为： ' + (obj.count));
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

function isMonster(idList, nickName) {
	var retVal = false
	for (i = 0; i < idList.length; i++) {
		if (document.querySelector("[data-key='" + idList[i] + "']") != undefined) {
			console.log("侦测到" + nickName + "结算页");
			clearInterval(check);
			retVal = true;
			break;
		}
	}
	return retVal;
}

function getBlueChestObj(data, scene) {
	switch (scene) {
		case UB_NICKNAME:
			return getUbBlueChestObj(data, scene)
		case AKX_NICKNAME:
			return getAkxBlueChestObj(data, scene)
		case CB_NICKNAME:
			return getCbChestObj(data, scene)
	}
}

function getUbBlueChestObj(data, scene) {
	let obj = data || EMPTY_OBJ
	obj.count += 1
	obj.unHitCount += 1
	if (document.querySelector("[data-key='17_20004']")) {
		obj.ffjCount += 1
		obj.historyHitArray.push({ k: new Date().toLocaleString(), v: scene + ':' + obj.unHitCount })
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

function getAkxBlueChestObj(data, scene) {
	let obj = data || EMPTY_OBJ
	obj.akxCount += 1
	obj.akxUnHitCount += 1
	if (document.querySelector("[data-key='17_20004']")) {
		obj.akxFfj += 1
		obj.historyHitArray.push({ k: new Date().toLocaleString(), v: scene + ':' + obj.akxUnHitCount })
		obj.akxUnHitCount = 0
	} else if (document.querySelector("[data-key='73_1']")) {
		obj.akxWhiteRingCount += 1
	} else if (document.querySelector("[data-key='73_2']")) {
		obj.akxBlueRingCount += 1
	} else if (document.querySelector("[data-key='73_3']")) {
		obj.akxRedRingCount += 1
	}
	return obj;
}

function getCbChestObj(data, scene) {
	let obj = data || EMPTY_OBJ
	obj.cbCount += 1
	if (document.querySelector("[data-key='17_20004']")) {
		obj.cbFfj += 1
		obj.historyHitArray.push({ k: new Date().toLocaleString(), v: scene + '' })
	}
	return obj;
}