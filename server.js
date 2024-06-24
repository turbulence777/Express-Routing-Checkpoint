const express =require("express")
const app =express()
app.use(express.static(__dirname))
// I created a custom middleware to verify the time of the request.
// The web application is only available during working hours (Monday to Friday,  from 9 to 17).



const middleware=(req,res,next)=>{
    const date=new Date()
    const day=date.getDay()
    const hours=date.getHours()
    console.log(date)
    console.log(day)
    console.log(hours)
if( day>=1 && day<=5 && hours<=9 &&hours>17){
    next()
}
else{

    res.status(400).sendFile(__dirname+"/auth.html")
}
}
app.use(middleware)
app.get('/',(req,res)=>{
    res.status(200).sendFile(__dirname+"/home.html")
})
app.get('/services',(req,res)=>{
    res.status(200).sendFile(__dirname+"/services.html")
})
app.get('/contact',(req,res)=>{
    res.status(200).sendFile(__dirname+"/contact.html")
})
// app.get('/style.css',(req,res)=>{
//     res.status(200).sendFile(__dirname+"/style.css")
// })
const port=5000
app.listen(port,(err)=>{err?console.log(err):console.log("server is running in 5000")})