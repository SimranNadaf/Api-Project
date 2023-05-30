const Books=[{
    ISBN:"12345book",
    title:"just do it",
    pubdate:"27-05-2023",
    language:"en",
    numpage:"200",
    author:[1,2],
    category:['motivation','boigraphy']
}];

const Authors=[{
    Id:"1",
    name:"simran nadaf",
    books:["12345book","my123life"]
},
{
    Id:"2",
    name:"abdul kalam",
    books:["12345book"]
}];

const Publications=[{
    Id:"1",
    name:"kapurs",
    books:['12345book']
}];

module.exports = {Books, Authors, Publications};