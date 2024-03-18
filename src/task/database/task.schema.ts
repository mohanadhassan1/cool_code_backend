/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Task extends Document {
    @Prop()
    title: string;

    @Prop()
    description: string; 

    @Prop()
    date: string;

    @Prop()
    completed: boolean;

    @Prop()
    userId: mongoose.Schema.Types.ObjectId
}

export const TaskSchema = SchemaFactory.createForClass(Task);
