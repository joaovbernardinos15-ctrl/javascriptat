//let rosePrice = 8;
//let lilyPrice = 10;
//let tulipPrice = 2;

//let numberOfRoses = 70;
//let numberOfLilies = 50;
//let numberOfTulips = 120;

//let rosesValue = rosePrice * numberOfRoses;
//let liliesValue = lilyPrice * numberOfLilies;
//let tulipsValue = tulipPrice * numberOfTulips;

//let total = rosesValue + liliesValue + tulipsValue;
//console.log("Rose – unit price:", rosePrice, ", quantity:", numberOfRoses, ", value:", rosesValue);
//console.log("Lily – unit price:", lilyPrice, ", quantity:", numberOfLilies, ", value:", liliesValue);
//console.log("Tulip – unit price:", tulipPrice, ", quantity:", numberOfTulips, ", value:", tulipsValue);
//console.log("Total: ", total);


//let Maxwell = "Maxwell";
//let Wright = "Wright";
//let phone = "0191 719 6495";
//let email = "Curabitur.egestas.nunc@nonummyac.co.uk";
//console.log(Maxwell, Wright, phone, email);


 
//let Raja = "Raja";
//let Villarreal = "Villarreal";
//let phone1 = "0866 398 2895";
//let email1 = "posuere.vulputate@sed.com";
//console.log(Raja, Villarreal, phone1, email1);


//let Helen = "Helen";
//let Richards = "Richards";
//let phone2 = "0800 1111";
//let email2 = "libero@convallis.edu";
//console.log(Helen, Richards, phone2, email2);


// ----------- 2.1


//let year = 1990;
//console.log(year); // -> 1990
//console.log(1991); // -> 1991
//console.log("Alice"); // -> Alice


//let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//console.log(days[0]); // -> Sun
//console.log(days[1]); // -> Mon
//console.log(days[2]); // -> Tue
//console.log(days[5]); // -> Fri


//let  names  =  [["Olivia",  "Emma",  "Mia",  "Sofia"],  ["William",  "James",  "Daniel"]];
//console.log(names[0]);  //  ->  ["Olivia",  "Emma",  "Mia",  "Sofia"]
//console.log(names[0][1]);  //  ->  Emma
//console.log(names[1][1]);  //  ->  James
//console.log(names[1][2]);  //  ->  Daniel
   
//let  femaleNames  =  names[0];
//console.log(femaleNames[0]);  //  ->  Olivia
//console.log(femaleNames[2]);  //  ->  Mia


//let  user1  =  {
//         name:  "Calvin",
//         surname:  "Hart",
//        age:  66,
//         email:  "CalvinMHart@teleworm.us"
//};
   
//let  user2  =  {
//         name:  "Mateus",
//         surname:  "Pinto",
//         age:  21,
//         email:  "MateusPinto@dayrep.com"
//};

//let  users  =[  
//         {
//                 name:  "Calvin",
//                 surname:  "Hart",
//                 age:  66,
//                 email:  "CalvinMHart@teleworm.us"
//         },
//         {
//                 name:  "Mateus",
//                 surname:  "Pinto",
//                 age:  21,
//                 email:  "MateusPinto@dayrep.com"
//         }
// ];
   
//console.log(users[1].name);  //  ->  Calvin
//console.log(users[0].age);  //  ->  21



//let users = [
//    {
//    "title": "Speaking JavaScript",
//   "author": "Axel Rauschmayer",
//    "pages": 460,
//},
//{
//   "title": "Programming JavaScript Applications",
//    "author": "Eric Elliott",
//    "pages": 254,
//},
//{

//    "title": "Understanding ECMAScript 6",
//    "author": "Nicholas C. Zakas",
//    "pages": 352,
//    }
    
//];




"use strict"; 
 
const prefix = "username_";  // só está mostrando username_
 
let userName = "Adam"; 
// const userName = "Adam"; 
 
let prefixedUserName; 
// const prefixedUserName; 
 
userName = "Adam"; 
prefixedUserName = prefix + userName; 
 
console.log(prefixedUserName /*+ prefixedUserName2*/); 
// console.log(prefixedUserName2); 
