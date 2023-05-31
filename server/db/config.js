const mongoose=require("mongoose")
const url=process.env.DATABASE;
mongoose.set('strictQuery', false);
mongoose.connect(url,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
   
}
    ).then(console.log("Database connected")).catch((err)=>{
    console.log(err);
})