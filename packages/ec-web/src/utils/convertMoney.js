export default function convertToMoney(money) {
    money=String(money);
    var length=money.length;
    var str=money.split('');
    
    var result='';
    var count=0;
   for(var i=length-1;i>=0;i--){
       result+=str[i];
       count++;
       if(i>0){
        if(count===3){
            result+='.'; 
            count=0;
           }
       }
       

   }
   var kq='';
   result=result.split('');
   var lengthResult=result.length
   for(var j=lengthResult-1;j>=0;j--){
    kq+=result[j];
}

return kq;

}