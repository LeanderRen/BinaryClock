// JavaScript Document

//全局设置：是否为12小时制显示（默认）
var Is12H = new Boolean(true);

//全局设置：是否显示提示信息（默认显示）
var Info = new Boolean(true);

	
//将一个十进制数字返回为二进制字符串
function bin(decimalNum){
	var binstr = new Array();
	binstr = decimalNum.toString(2);

	var n = 6;    //固化显示长度（6位）
	binstr = "00000000".substr(0,n-binstr.length) + binstr;

	return binstr.split("");  //返回将字符串打散成的数组

}


//处理每行灯的亮灭状态
//参数row 为行数，取值范围 0-小时  1-分钟  2-秒钟
//参数arr 为包含二进制信息的数组，一般调用bin()即可
function bitline(row,arr){
	var bit = document.getElementById("clocktab");
	var sbgp;
	
	for(var i=0;i<6;i++){
		if(arr[i]==0)
			sbgp = "0px -64px";
		else
			sbgp = "0px 0px";
		
		bit.rows[row].cells[i].style.backgroundPosition = sbgp;
	}	
}

	
//自动载入定时器
window.onload = function(){
	var timer = setInterval(function(){
		var d = new Date();
		
		//显示或隐藏权值提示
		if(Info == true){
			//显示权值提示
			document.getElementById("BitValue").style.display = "table";
		}
		else{
			//隐藏权值提示
			document.getElementById("BitValue").style.display = "none";
			} 
		
		
		// 处理小时数的二进制bit显示
		var h = d.getHours();
		var bit = document.getElementById("clocktab");
		
		if(Is12H==true){ //12小时制显示方式
			// 在12小时制下会额外显示AM/PM
			if(h <= 12){
			    //AM
			    bitline(0,bin(h));
				
			    bit.rows[0].cells[0].style.backgroundPosition = "0px -128px";
				bit.rows[0].cells[1].style.backgroundPosition = "64px 0px";
				
				if(Info == true)
					bit.rows[0].cells[0].innerHTML = "<span>AM</span>";
				else
					bit.rows[0].cells[0].innerHTML = "";			   
		   }				
			else{
				//PM
				bitline(0,bin(h-12));
				
				bit.rows[0].cells[1].style.backgroundPosition ="0px -128px";  
				bit.rows[0].cells[0].style.backgroundPosition = "64px 0px";

				if(Info == true)
					bit.rows[0].cells[1].innerHTML = "<span>PM</span>";
				else
					bit.rows[0].cells[1].innerHTML = "";
			}			
		}
		else{ //24小时制显示方式（默认）
			bitline(0,bin(h));
			bit.rows[0].cells[0].innerHTML = "";
			bit.rows[0].cells[1].innerHTML = "";
		}
		
		// 处理分钟数的二进制bit显示
		bitline(1,bin(d.getMinutes()));
		
		// 处理秒钟的二进制bit显示
		bitline(2,bin(d.getSeconds()));
		
	},500);	
	
}
