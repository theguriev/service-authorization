import { model } from "mongoose";
import schema from "../schemas/user";

const User = model("Users", schema);

export default User;
