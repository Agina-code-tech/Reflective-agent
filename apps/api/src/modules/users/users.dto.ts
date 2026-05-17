import type { ReflectionPacing, ReflectionStyle } from "@shared/types";

export class UpdatePreferencesDto {
  intent?: string;

  reflectionStyle?: ReflectionStyle;

  pacingPreference?: ReflectionPacing;
}
