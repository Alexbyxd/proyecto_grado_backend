import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt'


@Injectable()
export class HashPasswordPipePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if(metadata.type !== 'body'){
      return value
    }

    if(metadata.metatype.name !== 'CreateCategoriaDto'){
      return value
    }

    if(!value.password_hash){
      throw new Error('La contraseña es requerido')
    }

    const rondasHash = 10
    const hash = await bcrypt.hash(value.password_hash, rondasHash)
    value.password_hash = hash
    
    return value;
  }
}
