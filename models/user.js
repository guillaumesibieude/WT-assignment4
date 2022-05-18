const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member"
  },
  assignedTasks: {
    type: [Schema.Types.ObjectId],
    ref: 'task',
    default: []
  }
},{
  collection: 'users'
});

//hash the password before saving
UserSchema.pre(
    'save',
    async function(next) {
      const hash = await bcrypt.hash(this.password, 10);
  
      this.password = hash;
      next();
    }
);

//compare the actual password with the given one
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;