
	"use strict"
	/*
	 * ★ 数组的扩展
	 * 		Array.from();
	 * 			将类数组对象转为真正的数组
	 * 		Array.of();
	 * 			将一组参数转换为数组
	 * 		arr.find();
	 * 			找出一个符合条件的数组元素
	 * 				参数：
	 * 					1.会点函数
	 * 					2.回调函数内 this 的指向
	 * 				遍历整个数组，遍历过程中调用回调函数，如果回调函数的返回值为 true，则返回当前正在遍历的元素；
	 * 				如果所有元素都不符合条件则返回 undefined
	 * 		arr.findIndex();
	 * 			找出一个符合条件的数组元素
	 * 				参数：
	 * 					1.会点函数
	 * 					2.回调函数内 this 的指向
	 * 				遍历整个数组，遍历过程中调用回调函数，如果回调函数的返回值为 true，则返回当该数组元素的位置；
	 * 				如果所有元素都不符合条件则返回 -1
	 * 		arr.fill();
	 * 			填充数组
	 * 				参数：
	 * 					1.填充的内容
	 * 					2.起始位置
	 * 					3.结束位置
	*/
//	var body=document.body;
//	var h2 = document.getElementsByTagName('h2');
//	var newStr = document.createElement("span");
//	newStr.innerHTML = '红色字体代表高亮提示或输出值';
//	for(var i=0;i<h2.length;i++){
//		body.insertBefore(newStr,h2[i]);
//	}
// Array.from()  把类数组转成数组
//1. 排序
var oDiv1 = document.getElementById('divs'),
	aDivs = document.getElementsByClassName('alertDiv');
var arrPx = [].slice.call(aDivs);
console.dir(arrPx);
//2. 排序
var newArr = Array.from(aDivs);
console.log(newArr);

//3.
var str = 'suntao';
var arr = Array.from(str);
console.log(arr);
html('arrFrom',arr);

// Array.of()  把参数转换为数组
var aaa = Array.of(1,2,3,4,5,6);
html('arrOf',aaa + `，此处参数为 1，2，3，4，5，6`);
	
	//arr.find 
	var findArr = [1,2,3,4,5];
	var bbb = findArr.find(function(value,index){
		return value < 4;
	})
	html('arrFind',bbb+`，找不到我则返回 undefined`);
	
	//arr.findIndex
	var findArr1 = [1,2,3,4,5];
	var ccc = findArr1.findIndex(function(value,index){
		return value > 4; //4
	})
	html('findIndex',ccc + `,而找不到则返回 -1`);
	
	//arr.fill
	var arrFill = [4,5,6,7,8];
	arrFill.fill('我是填充的内容',1,3);
	html('arrFill', arrFill);
	
	
	//for...of...
	var forOfArr = [1,2,3,4,5];
	var forOfStr = 'suntao';
	for(var value of forOfArr){
		html('forOf',value+'，');
	}
	for(var value of forOfStr){
		html('forOf',value+'，');
	}
	html('forOf',`对象不自带遍历接口`);
	
	//for..of..Keys
	var keyArr = [1,2,3,4,5];
	for(var key of keyArr.keys()){
		html('forOfKeys',key);
	}
	
	//解构赋值
//	for(var [key,value] of keyArr.entries()){
//		html('entries','key值为'+key + '，');
//		html('entries','value值为'+value + '，');
//	}

	//数组推导
//	var keyArr2 = [for(value of keyArr) value * 2];  
//	html('sztd',keyArr2);
	
	// ★ 对象的扩展
	function fn(x,y){
		x++;
		y++;
		return {
			x,y
		}
	}
	html('objDiv','x：' + fn(1,2).x + '，' + 'y：' + fn(1,2).y);
	
	var obj = {
		name : 'suntao',
//		showName : function(){
//			return this.name;
//		}
		showName(){
			return this.name;
		}
	}
	
	html( 'showName', obj.showName() );
	
	//对象的  key 表达式形式呈现：
	let sex = '男';
	let person = {
		name : '孙涛',
		[sex] : false,
		['a'+'ge'] : 30,
		['j'+'o'+'b'] : '目前正在找工作',
		['get'+'Name'](){
			return this.name;
		}
	}
	html( 'bdsObj', `&nbsp;&nbsp;姓名:`+person.getName()+`,性别:`+person.age+`,职业:`+person.job );
	
	// 合并对象 Object.assign
	let obj1 = {},
		obj2 = {
			name : 'suntao'
		},
		obj3 = {
			name : '孙涛',
			age : 30
		}
	Object.assign(obj1,obj2,obj3);
	html('hbObj','姓名：'+obj1.name+',年龄：'+obj1.age);
	
	//getPrototype and setPrototype
	function Car(name){
		this.name = name;
	}
	Car.prototype.showName = function(){
		return this.name;
	}
	var c1 = new Car('BMW');
	html('getsetPro',` , getPrototypeOf:` + c1.showName())
//	setPrototype
	function Car1(name){
		this.name = name;
	};
	var c2 = new Car1('Benz');
	Car1.prototype.setName = function(){
		return this.name;
	};
	Object.setPrototypeOf(c1,Car1.prototype);
	html('getsetPro',` , getPrototypeOf:` + c1.setName())
	html('getsetPro',` , setPrototypeOf:` + c2.setName())
	
	//Proxy  代理
//	let objProxy = {
//		x : 1,
//		y : 2
//	}
//	let p1 = new Proxy(objProxy,{
//		get(obj,attr){
//			return obj[attr];
//		},
//		set(obj,attr,value){
//			if(value < 20){
//				obj[attr] = value;
//			}
//			return 2;
//		}
//	})
//	html('proxy',`获取proxy的属性值：` + p1.x);
//	let ProxyVal = objProxy.x = 10;
//	html('proxy',`,设置proxy的属性值：` + ProxyVal )
	html('proxy',`Chrome 不支持，这里进行了注释`)
	
	// observe 绑定事件
	var obObj = {
		x11 : 1,
		y11 : 2
	};
	function fn1(x11){
		html('observe',obObj.x11);
		console.log(x11);
	}
//	Object.observe(obObj,fn1);
	obObj.x11 = 3;
//	Object.unobserve(obObj,fn1)
	obObj.x11 = 4;
	html('unobserve',obObj.x11);
	
	var arrObj = Object.keys(obObj).length;
	html('objKeys',`:她的长度为:`+arrObj);
	
	function html(id,arr){
		return document.getElementById(id).innerHTML += `<span>${arr}</span>`;
	}
	

//	for(let i=0;i<aDivs.length;i++){  // Chrome 不支持 let
//		aDivs[i].style.cursor = 'pointer';
//		aDivs[i].onclick = function(iNow,html){
//			var html = this.innerHTML + '<span class="bSpan">红色字体代表高亮提示或输出值</span>';
//			var d1 = new FnDiv();
//			var This = this;
//			iNow = i + 1;		
//			d1.init({
//				title : `居中弹窗,第 ${iNow} 个`,
//				bs : 0,
//				drag : true,
//				html : html,
//				mark : true,
//				z : 4,
//				scroll : true
//			});
//		}	
//	}
for(var i=0;i<aDivs.length;i++){  // 这里本想把  var 换成 let 但是 chrome 不支持
	aDivs[i].index = i;
	aDivs[i].style.cursor = 'pointer';
//	var newStr = document.createElement("strong");
//	newStr.innerHTML = 'NO.' + toBl( aDivs[i].index+1 ) + '：';
//	oDiv.insertBefore(newStr,aDivs[i]);
		
	aDivs[i].onclick = function(){			
		var html = this.innerHTML + '<span class="bSpan">红色字体代表高亮提示或输出值</span>';
		var xh = toBl ( this.index + 1 );
		var d1 = new FnDiv();
		d1.init({
			title : `ES6笔记之弹窗 ${xh}`,
			w : 300,
			h : 400,
			bs : 0,
			drag : true,
			html : html,
			mark : true,
			z : 6,
			scroll : true,
			size : true,
			popMaxW : 1000
		});
	}	
}
function toBl(n){
	if(n<10){
		return '0' + n;
	}else{
		return '' + n;
	}
}
