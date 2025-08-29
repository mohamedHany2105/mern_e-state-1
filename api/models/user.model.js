import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img_profile:{
      type:String,
      default:"https://uifqnenvbpazlwmaalgj.supabase.co/storage/v1/object/public/img/1755954224471-Screenshot%20(3).png"
    }
  },
  {
    timestamps: true,
  }
);

const User=mongoose.model('User',userSchema) ;

export default User;
