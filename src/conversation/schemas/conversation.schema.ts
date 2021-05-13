import { Schema, Types } from 'mongoose';
import { USER_MODEL_NAME } from 'src/shared/constants';

export const ConversationSchema: Schema = new Schema({
    participants: [
        {
            user: {
                type: Types.ObjectId,
                ref: USER_MODEL_NAME
            }
        }
    ]

}, { timestamps: true });


ConversationSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret.__t;
        delete ret.__v;
        delete ret._id;
    }
});
