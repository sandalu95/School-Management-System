import { Teacher } from "../teacher";
import { User } from "../user";

export class RegisterTeacherResponse {
  message: string;
  teacher: Teacher;
  user: User;
}
