import { Body, Controller, Get, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdatePreferencesDto } from "./users.dto";
import { DEMO_USER_ID } from "../auth/auth.service";

@Controller("me")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getMe() {
    return this.usersService.getOrCreateUser(DEMO_USER_ID, "demo@reflective.local");
  }

  @Patch("preferences")
  updatePreferences(@Body() body: UpdatePreferencesDto) {
    return this.usersService.updatePreferences(DEMO_USER_ID, body);
  }
}

