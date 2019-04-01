import mongoose from 'mongoose';

export const TopicSchema = new mongoose.Schema({
    title: {type:String, required: true},
    author: {type:String, required: true},
    description: {type:String, required: false},
    createdAt: {type:Date, required: false}
})

export const Topic = mongoose.model('Topic', TopicSchema);