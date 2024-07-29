import { ForbiddenException } from '@nestjs/common';

export function checkUserAuthorization(userId: string, requestedUserId: string): void {
  if (userId !== requestedUserId) {
    throw new ForbiddenException('You are not authorized to access or modify this data');
  }
}