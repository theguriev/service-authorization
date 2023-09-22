import { model } from "mongoose";
import schema from "../schema/user";

const UserModel = model("Users", schema);

export default UserModel;
