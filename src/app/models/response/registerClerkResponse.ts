import { User } from "../user";
import { Clerk } from "../clerk";

export class RegisterClerkResponse {
  message: string;
  clerk: Clerk;
  user: User;
}
