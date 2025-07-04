// class faculty{

//     constructor(faculty_name){
//         this.faculty = faculty_name
//     }

//     setCollege(college){
//             this.college = college
//     }

//     getFacultyDetails(){
//         return `The name of College is ${this.college} and the faculty is ${this.faculty}`
//     }
// }

// const cli = new faculty("BCA")
// console.log(cli)
// class User extends faculty{

//     constructor(user_id,faculty_name){
//         super()
//         this.id = user_id
//     }

//     setName(name) {
//         this.name = name
//        return console.log(`The name of user is set to ${this.name}`)
//     }
//     getUserDetails(){

//         console.log(`User Id: ${this.id} Name: ${this.name}`)
//         const facdetails = this.getFacultyDetails()
//         console.log(facdetails)
//         return
//     }
// }

// const user1 = new User(`user0146`,"CSIT")
// user1.setName("Abiskar")
// user1.setCollege("ASMT")
// user1.getUserDetails()

// const fs = require("node:fs/promises");
// async function readfile() {
//   const data = await fs.readFile("validation/text.txt", "utf-8")
//   console.log(data)
//     // .then((data) => {
//     //   console.log(data);
//     //   return data;
//     // })
//     // .catch((error) => {
//     //   console.log(error);
//     // });
// }
// (async() =>{

//     console.log("Hello");
//      await readfile();
//     console.log("Hii");
// }
// )()

// const express = require("express");
// const client = require("./client");

// const app = express();
// const port = 8000;

// app.use(express.json()); 

// app.get("/news", (req, res) => {
//   client.getAllNews({}, (error, news) => {
//     if (error) {
//       return res.status(500).json({ error: "Failed to get news" });
//     }
//     res.json(news);
//   });
// });

// app.get("/news/:id", (req, res) => {
//   const { id } = req.params;
//   client.getNews({ id }, (error, news) => {
//     if (error) {
//       return res.status(500).json({ error: "Failed to get news" });
//     }
//     res.json(news);
//   });
// });

// app.post("/news", (req, res) => {
//   const { body, postImage, title } = req.body;
//   client.addNews({ body, postImage, title }, (error, news) => {
//     if (error) {
//       return res.status(500).json({ error: "Failed to create news" });
//     }
//     res.status(201).json({ data: news, msg: "Successfully created news." });
//   });
// });
// app.put("/news/:id", (req, res) => {
//   const { id } = req.params;
//   const { body, postImage, title } = req.body;
//   client.editNews({ id, body, postImage, title }, (error, news) => {
//     if (error) {
//       return res.status(500).json({ error: "Failed to edit news" });
//     }
//     res.json(news);
//   });
// });

// app.delete("/news/:id", (req, res) => {
//   const { id } = req.params;
//   client.deleteNews({ id }, (error, news) => {
//     if (error) {
//       return res.status(500).json({ error: "Failed to delete news" });
//     }
//     res.json({ msg: "Successfully deleted a news item." });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// const arr = [1,2,3,4,5]

// arr.splice(2,2,12,13)
// console.log(arr)

// const date = new Date("2015-03-25 14:06:45 GMT+0545")
// const path = require('path')
// const data = require(path.join(__dirname,"../lib/methods.js"))

// console.log(data)



const testFunction = (count) =>{

    console.log("Hello");
    console.log("Hiii");

    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");
    if(count===1) console.log("hellooooooooooooooooo");

};

testFunction(1);