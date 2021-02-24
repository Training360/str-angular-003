import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(
    value: any[] | null,
    key: string,
    phrase: string | number | boolean,
    props?: {count: number}): any[] | null {
    if (!Array.isArray(value) || !key || !phrase) {
      return value;
    }

    phrase = typeof phrase !== 'number' ? ('' + phrase).toLowerCase() : phrase;

    const filtered =  value.filter( item => {
      if (typeof item[key] === 'number' && typeof phrase === 'number') {
        return item[key] === phrase;
      }

      return ('' + item[key]).toLowerCase().includes( (phrase as string) );
    });

    if (props?.count) {
      props.count = filtered.length;
    }

    return filtered;
  }

}
