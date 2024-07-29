import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  private readonly logger = new Logger(JwtAuthGuard.name)

  constructor(private readonly jwtService: JwtService) {
    super();
    this.logger.debug
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];

    try {
      console.log("JWT Service", this.jwtService)
      const decoded = this.jwtService.verify(token);
      console.log("Decoded token:", decoded)
      request.user = decoded; 
      return true;
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

}