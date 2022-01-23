chrome.storage.local.get(['blueChest'], function(result){
    if (result.blueChest === undefined){
        document.getElementById("blue-chest").innerHTML = 0;
    } else {
        document.getElementById("blue-chest").innerHTML = result.blueChest;
    }});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("resetCounter").addEventListener("click", resetCounter);
});

function resetCounter() {
    document.getElementById("blue-chest").innerHTML = 0;

    chrome.storage.local.set({'blueChest': 0}, function(){
        console.log('蓝箱设置为： ' + 0);
    });
}