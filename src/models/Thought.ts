import { Schema, model, type Document } from 'mongoose';
import reactionSchema from './Reaction.js';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date | string;
    username: string;
    reactions?: Schema.Types.ObjectId[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp: number): string => new Date(timestamp).toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: [reactionSchema],
                ref: 'reaction',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions?.length || 0;
});

const Thought = model<IThought>('thought', thoughtSchema);

export default Thought;