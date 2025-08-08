const { connectDB } = require("./src/database/db");
const { app } = require("./src/app");
const port = process.env.PORT;


connectDB().then(() => {
  app.listen(port || 4000, () => {
    console.log(`Server Running on port ${port} url: http://localhost:${port}`);
  });
}).catch((err)=>{
    console.log(`Error from index js / database connection error` , err);
    
})




