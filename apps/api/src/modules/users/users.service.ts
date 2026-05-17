import { Injectable } from "@nestjs/common";
import type { ReflectionProfile } from "@shared/types";
import { defaultReflectionProfile } from "@shared/constants";
import { UpdatePreferencesDto } from "./users.dto";

type UserRecord = {
  id: string;
  email: string;
  reflection_style: ReflectionProfile["reflectionStyle"];
  pacing_preference: ReflectionProfile["pacingPreference"];
  created_at: string;
  intent: ReflectionProfile["intent"];
};

@Injectable()
export class UsersService {
  private readonly users = new Map<string, UserRecord>();

  getOrCreateUser(id: string, email: string) {
    if (!this.users.has(id)) {
      this.users.set(id, {
        id,
        email,
        reflection_style: defaultReflectionProfile.reflectionStyle,
        pacing_preference: defaultReflectionProfile.pacingPreference,
        created_at: new Date().toISOString(),
        intent: defaultReflectionProfile.intent
      });
    }

    return this.users.get(id)!;
  }

  updatePreferences(id: string, input: UpdatePreferencesDto) {
    const current = this.getOrCreateUser(id, "demo@reflective.local");
    const next: UserRecord = {
      ...current,
      intent: input.intent ?? current.intent,
      reflection_style: input.reflectionStyle ?? current.reflection_style,
      pacing_preference: input.pacingPreference ?? current.pacing_preference
    };

    this.users.set(id, next);
    return next;
  }

  getProfile(id: string) {
    const user = this.getOrCreateUser(id, "demo@reflective.local");
    return {
      intent: user.intent,
      reflectionStyle: user.reflection_style,
      pacingPreference: user.pacing_preference
    } satisfies ReflectionProfile;
  }
}

