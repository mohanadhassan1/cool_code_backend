/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Task } from '../../task/database/task.schema';
import * as bcrypt from 'bcrypt';

@Schema({ collection: 'users' })
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    linkedinURL: string;
    
    // @Prop()
    // token: string;

    // @Prop({ type: [{ type: Task.schema }] })
    // tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function(next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next()
    } catch (error) {
        next(error)
    }
})