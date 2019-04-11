import mongoose from 'mongoose';
import crypto from 'crypto-js';

export const UserSchema = new mongoose.Schema({
    login: {type:String, required: true},
    password: {type:String, required: true},
    isAdmin: {type:Boolean},
    isActive: {type:Boolean}
})

UserSchema.pre<any>('save', function(next) {
    this.password = crypto.MD5(this.password).toString();
    next();
});

export const User = mongoose.model('User', UserSchema);