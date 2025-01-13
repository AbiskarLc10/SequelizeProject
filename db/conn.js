const mysql = require("mysql2/promise");



const dbConnection = async () =>{
    
    try {
        
        const connection = await mysql.createConnection({
            host: "localhost",
              user: "root",
              password: "password",
              database: "mydatabase",
        });

        if(connection){
            console.log("Connected to database successfully");
            return connection;
        }
    } catch (error) {
        
       console.log(error);
       throw new Error("Failed to connect to database");
    }
};


module.exports = dbConnection;