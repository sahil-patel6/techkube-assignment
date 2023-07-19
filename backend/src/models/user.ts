import mongoose from "mongoose";
import { Password } from "../util/password";

interface UserAttrs {
  username: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  }
})

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.password)
    this.password = hashed
  }
  done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };