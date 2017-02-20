function startMove(obj,json,fn){
	clearInterval(obj.iTimer);
	var iCur = 0;
	var iSpeed = 0;
	obj.iTimer = setInterval(function(){
		var iBtn = true;
		for(var attr in json){
			var iTarget = json[attr];
			if(attr == 'opacity'){
				iCur = Math.round(getStyle(obj,'opacity')*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			iSpeed = ( iTarget - iCur ) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur != iTarget){
				iBtn = false;
				if(attr == 'opacity'){
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+(iCur + iSpeed)+')';
				}else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		}
		if(iBtn){
			clearInterval(obj.iTimer);
			fn && fn.call(obj);
		}
	},30);
}
function getStyle(obj,attr){
	return obj.currentScale?obj.currentScale[attr]:getComputedStyle(obj,false)[attr];
}