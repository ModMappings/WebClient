import { Pipe, PipeTransform } from '@angular/core';
import {Mapping} from '../../../generated';

@Pipe({
  name: 'className'
})
export class ClassNamePipe implements PipeTransform {

  transform(value: Mapping | null | undefined): unknown {
    return value?.output?.substr(value?.output?.lastIndexOf('/') + 1);
  }

}
