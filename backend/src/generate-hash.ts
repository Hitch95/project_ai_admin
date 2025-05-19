import bcrypt from "bcrypt";

console.log('admin:', await bcrypt.hash('admin', 10));
console.log('user:', await bcrypt.hash('user', 10));