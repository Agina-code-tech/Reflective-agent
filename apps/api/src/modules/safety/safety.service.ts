import { Injectable } from "@nestjs/common";
import { moderateReflectionOutput } from "@ai/moderation";

@Injectable()
export class SafetyService {
  filterReflection(text: string) {
    return moderateReflectionOutput(text);
  }
}

