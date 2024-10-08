import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      //si no hay roles definidos, permmite el acceso
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta accion',
      );
    }

    const esAutorizado = roles.some((role) => user.roles.include(role));
    if (!esAutorizado) {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta accion',
      );
    }

    return true;
  }
}
