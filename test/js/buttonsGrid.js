function rotate(){
   let b1=document.getElementById("btn1").innerHTML;
   let b2=document.getElementById("btn2").innerHTML;
   let b3=document.getElementById("btn3").innerHTML;
   let b4=document.getElementById("btn4").innerHTML;

   let b6=document.getElementById("btn6").innerHTML;
   let b7=document.getElementById("btn7").innerHTML;
   let b8=document.getElementById("btn8").innerHTML;
   let b9=document.getElementById("btn9").innerHTML;

   document.getElementById("btn1").innerHTML=b4;
   document.getElementById("btn2").innerHTML=b1;
   document.getElementById("btn3").innerHTML=b2;
   document.getElementById("btn4").innerHTML=b7;
 
   document.getElementById("btn6").innerHTML=b3;
   document.getElementById("btn7").innerHTML=b8;
   document.getElementById("btn8").innerHTML=b9;
   document.getElementById("btn9").innerHTML=b6;
}