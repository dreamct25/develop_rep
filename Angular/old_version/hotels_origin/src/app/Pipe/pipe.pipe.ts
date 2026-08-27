import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class PipePipe implements PipeTransform {
  constructor(public sanitizer: DomSanitizer) { }
  transform(value: string, args?: any): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
