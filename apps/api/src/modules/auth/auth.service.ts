import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

export const DEMO_USER_ID = "demo-user";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  getCurrentUser() {
    return this.usersService.getOrCreateUser(DEMO_USER_ID, "demo@reflective.local");
  }
}

