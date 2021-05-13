import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
	email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


UserSchema.set('toJSON', {
	transform: function (doc, ret, options) {
		delete ret.__t;
		delete ret.__v;
		delete ret._id;
	}
});
