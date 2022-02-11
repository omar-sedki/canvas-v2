function percentToNumber(_value,_parent){
var percentRegExp=/\s*(\d+(?:\.\d+)?)\s*%\s*/;
if(typeof _value=="string" && percentRegExp.test(_value)){_value=Number(RegExp.$1) * _parent/100}
return _value;	
}