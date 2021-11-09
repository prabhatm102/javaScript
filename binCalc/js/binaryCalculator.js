var res=document.getElementById("res");
var opr;

function expression(op){
    res.innerHTML+=op.innerHTML;
      if(op.innerHTML=='+' || op.innerHTML=='-' || op.innerHTML=="*" || op.innerHTML=="/"){
         opr=op.innerHTML;        
      }
}
function clean(){
    res.innerHTML="";
}
function result(){
    let exp=res.innerHTML.split(opr);
    let val1=exp[0];
    let val2=exp[1];
    let v1= binToDec(val1); 
    let v2= binToDec(val2);
   
    let dec;
      if(opr=='+'){
        dec=v1+v2;
      }else if(opr=='-'){
         dec=v1-v2;
      }else if(opr=='*'){
         dec=v1*v2;
      }else if(opr=='/'){
         dec=v1/v2;
      }
     res.innerHTML=decToBin(dec);
}
function binToDec(bin){
    let i=bin.length-1;
    let sum=0;
    let j=0;
    while(i>=0){
        if(bin[i]==='1'){
           sum+=Math.pow(2,j);
        }
        j++;
        i--;
    }
      return sum;
}

function decToBin(dec){
   let n=Number(dec);
  
   let finRes='';

    while(n>=1){
        if(n%2==0){
            finRes+='0';
        }else{
            finRes+='1';
        }
          n=Math.floor(n/2);
    }
    
      let arr=finRes.split("");
      return arr.reverse().join("");
        
}