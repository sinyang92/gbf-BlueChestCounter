const regex = new RegExp("http:\/\/game\.granbluefantasy\.jp\/#result_multi\/(?!detail)[0-9]*");
const BLUE_CHEST_CLASS_NAME = "ico-treasure-11-mini";
const anima_id_list = ['10_41', '10_42', '10_43', '10_44', '10_45', '10_46'];

$(window).bind('hashchange', function() {
    if (window.location.href.match(regex)) {
		var check = setInterval(function() {

			if (isBigBa() && document.getElementsByClassName(BLUE_CHEST_CLASS_NAME).length > 0) {
				chrome.storage.local.get(['blueChest'], function(result){
					if (result.blueChest === undefined){
						chrome.storage.local.set({'blueChest': 1}, function(){
							console.log('蓝箱设置为： ' + 1);
							clearInterval(check);
						});

					} else {
						let count = result.blueChest;
						chrome.storage.local.set({'blueChest': (count + 1)}, function(){
							console.log('蓝箱设置为： ' + (count + 1));
							clearInterval(check);
						})
					}
				});
			}
		}, 500);
		
}});

function isBigBa() {
	anima_id_list.forEach(id => {
		if (document.querySelector("[data-key='" + id + "']") != undefined) {
			return true
		}
	})

	return false
}