function FnDiv(){
	this.divNode = null;
	this.oTitle = null;
	this.aTop = document.body.scrollTop || document.documentElement.scrollTop;
	this.disX = 0;
	this.disY = 0;
	this.arrH = [];
	this.popSize = null;
	this.downX = 0,
	this.downY = 0,
	this.downW = 0,
	this.downH = 0;
	this.settings = {
		title : '默认弹窗',
		w : 400,
		h : 400,
		dir : 'center',
		mark : false,
		drag : false,
		scroll : false,
		html : html,
		size : false,
		popMaxW : 666,
		popMinW : 290,
		popMaxH : clientH() - 5,
		popMinH : 400
	}
}
FnDiv.prototype.json = {};
FnDiv.prototype.init = function( opt ){
	extend( this.settings , opt );
	if( this.json[opt.bs] == undefined ){
		this.json[opt.bs] = true;
	}
	if( this.json[opt.bs] ){
		this.createNode();
		this.fnClose();
		this.settings.mark && this.createMark();
		this.settings.drag && this.fnDrag();
		this.settings.scroll && this.scroll();
		this.settings.size && this.scale();
		if(browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad){
			this.popSize.style.display = 'none';
		}
		this.json[opt.bs] = false;
	}
};
FnDiv.prototype.createNode = function(){
	this.divNode = document.createElement('div');
	this.divNode.className = 'FnDiv';
	this.divNode.innerHTML = '<div class="title"><span>'+ this.settings.title +'</span><span class="close">x</span></div><div class="content">'+this.settings.html+'</div><div id="popSize"></div>';
	document.body.appendChild( this.divNode );
	this.nodeStyle();
	this.oTitle = this.divNode.getElementsByTagName('div')[0];
}
FnDiv.prototype.nodeStyle = function(){
	this.divNode.style.width = this.settings.w + 'px';
	this.divNode.style.height = this.settings.h + 'px';
	this.divNode.style.zIndex = this.settings.z;
	if( this.settings.dir == 'center' ){
		this.divNode.style.left = ( clientW() - this.divNode.offsetWidth ) / 2 + 'px';
		this.divNode.style.top = (  clientH() - this.divNode.offsetHeight ) / 2 + this.aTop + 'px';
	}else if( this.settings.dir == 'right' ){
		this.divNode.style.left = ( clientW() - this.divNode.offsetWidth ) + 'px';
		this.divNode.style.top = ( clientH() - this.divNode.offsetHeight ) + 'px';
	}
}
FnDiv.prototype.fnClose = function(){
	var This = this;
	var oSpan = this.divNode.getElementsByTagName('span')[1];
	oSpan.onclick = function(){
		document.body.removeChild( This.divNode );
		This.settings.mark && document.body.removeChild( This.oMark );
		This.json[This.settings.bs] = true;
	};
}
FnDiv.prototype.createMark = function(){
	var oMark = document.createElement('div');
	oMark.id = 'mark';
	this.oMark = oMark;
	document.body.appendChild(oMark);
	oMark.style.width = clientW() + 'px';
	oMark.style.height = clientH() + 'px';
	oMark.style.top = this.aTop + 'px';
	var aMark = document.getElementById('mark'),
		This = this;
	aMark.onclick = function(){
		document.body.removeChild( This.divNode );
		This.settings.mark && document.body.removeChild( This.oMark );
		This.json[This.settings.bs] = true;
	};
}
FnDiv.prototype.fnDrag = function(){
	var This = this;
	this.oTitle.style.cursor = 'move';
	this.oTitle.onmousedown = function(e){
		var e=e||window.event;
		This.fnDown(e);
		return false;
	}
}
FnDiv.prototype.fnDown = function(e){
	var This = this;
	this.disX = e.clientX - this.divNode.offsetLeft;
	this.disY = e.clientY - this.divNode.offsetTop;
	document.onmousemove = function(e){
		var e=e||window.event;
		This.fnMove(e);
	}
	document.onmouseup = function(){
		This.fnUp();
	}
}
FnDiv.prototype.fnMove = function(e){
	divLeft = e.clientX - this.disX;
	divTop = e.clientY - this.disY;
	if( divLeft < 0 ){
		divLeft = 0;
	}else if( divLeft > clientW() - this.divNode.offsetWidth ){
		divLeft = clientW() - this.divNode.offsetWidth;
	}
	if( divTop < 0 ){
		divTop = 0;
	}else if( divTop > clientH() - this.divNode.offsetHeight + this.aTop ){
		divTop = clientH() - this.divNode.offsetHeight + this.aTop;
	}
	this.divNode.style.left = divLeft + 'px';
	this.divNode.style.top = divTop + 'px';
}
FnDiv.prototype.fnUp = function(){
	document.onmousemove = null;
	document.onmouseup = null;
}
FnDiv.prototype.scroll = function(e){
	var e=e||window.event;
	var This = this;
	if( This.oMark ){
		var divMark = This.oMark.offsetTop;
		This.divMark = divMark;
	}
	document.body.onscroll = function(e){
		var e=e||window.event;
		This.aTop = document.body.scrollTop || document.documentElement.scrollTop;
		var divLeft = This.divNode.offsetWidth;
		var divTop = This.divNode.offsetHeight;
		This.divNode.style.left = ( clientW() - divLeft ) / 2 + 'px';
		This.divNode.style.top = ( clientH() - divTop ) / 2 + This.aTop + 'px';
		if( This.oMark ){
			This.oMark.style.top = This.aTop + This.divMark + 'px';
			This.oMark.style.top = This.aTop + 'px';
		}
	}
}
function extend( obj1, obj2 ){
	for( var attr in obj2 ){
		obj1[attr] = obj2[attr];
	}
}
function clientW(){
	return document.documentElement.clientWidth;
}
function clientH(){
	return document.documentElement.clientHeight;
}

FnDiv.prototype.scale = function(){
	var This = this;
	this.popSize = document.getElementById('popSize');
	this.popSize.onmousedown = function(e){
		var e=e||window.event;
		This.downX = e.clientX;
		This.downY = e.clientY;
		This.downW = This.divNode.offsetWidth;
		This.downH = This.divNode.offsetHeight;
		document.onmousemove = function(e){
			var e=e||window.event;
			var W = e.clientX - This.downX + This.downW;
			var H = e.clientY - This.downY + This.downH;
			W = range(W, This.settings.popMaxW, This.settings.popMinW);
			H = range(H, This.settings.popMaxH, This.settings.popMinH);
			This.divNode.style.width = W + 'px';
			This.divNode.style.height = H + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			var divLeft = This.divNode.offsetWidth;
			var divTop = This.divNode.offsetHeight;
//			This.divNode.style.left = ( clientW() - divLeft ) / 2 + 'px';
//			This.divNode.style.top = ( clientH() - divTop ) / 2 + This.aTop + 'px';
			startMove(This.divNode,{left:parseInt( ( clientW() - divLeft ) / 2 ) ,top:parseInt( ( clientH() - divTop ) / 2 + This.aTop )});
		}
		return false;
	}
}
function range(val,max,min){
	if(val>max){
		return max;
	}else if(val < min){
		return min;
	}else{
		return val;
	}
}

var browser={
    versions:function(){
   		var u = navigator.userAgent, app = navigator.appVersion;   
   		return {//移动终端浏览器版本信息   
	        trident: u.indexOf('Trident') > -1, //IE内核  
	        presto: u.indexOf('Presto') > -1, //opera内核  
	        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
	        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
	        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
	        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
	        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
	        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
	        iPad: u.indexOf('iPad') > -1, //是否iPad    
	        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部  
	        weixin: u.indexOf('MicroMessenger') > -1, //是否微信   
	        qq: u.match(/\sQQ/i) == " qq" //是否QQ  
    	};  
 	}(),language:(navigator.browserLanguage || navigator.language).toLowerCase()
}