import mongoose from 'mongoose';
export const  connectDB = async()=>{
    try{
        mongoose.connect('mongodb+srv://romashirodkar19:Bhaktiroma%401926@testcluster.rvrsfci.mongodb.net/rentwize_real');
        console.log('Database connected');
    }catch(err){
        console.log(err);
    }
}

