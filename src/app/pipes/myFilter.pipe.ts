import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'myFilter',
  pure: false,
})
export class myFilterPipe implements PipeTransform {
  transform(items: any[], myFilter: (item: any) => boolean): any {
    if (!items || !myFilter) {
      return items;
    }
    return items.filter((item) => myFilter(item));
  }
}
