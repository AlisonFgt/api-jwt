import mongoose from 'mongoose';

const uri: string = 'mongodb://localhost:27017/auth';

mongoose.connect(uri, (err: any) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log("Sucessfully Connected to MongoDB");
    }
});

export const TopicSchema = new mongoose.Schema({
    title: {type:String, required: true},
    author: {type:String, required: true},
    description: {type:String, required: false},
    createdAt: {type:Date, required: false}
})

export const Topic = mongoose.model('Topic', TopicSchema);