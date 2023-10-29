const mongoose=require("mongoose");
let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

exports.mongodb=mongoose.connect("mongodb+srv:",
{
      useNewUrlParser:true,
      useUnifiedTopology:true
}).then(()=>{
      console.log("db is connected");
}).catch((e)=>{
      console.log(e);
      console.log("error is occure");
})

//user schema
const userSchema=mongoose.Schema({
      userName:{
            type:String,
            required:true
      },
      password:{
            type:Number,
            required:true
      }
});

exports.User=mongoose.model("User",userSchema);

//review schema
const reviewSchema = mongoose.Schema(
      {
        comment: { 
            type: String,
            required: true
             },
        user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true
               },
       }
      
)

//book schema
const bookSchema = mongoose.Schema(
      {
        
        reviews: [reviewSchema],
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        }
      }
    )
   
exports.Book = mongoose.model('Book', bookSchema);
