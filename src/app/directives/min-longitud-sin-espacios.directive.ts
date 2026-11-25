import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[nsMinLongitudSinEspacios]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinLongitudSinEspaciosDirective,
      multi: true
    }
  ]
})
export class MinLongitudSinEspaciosDirective implements Validator {
  @Input('nsMinLongitudSinEspacios') longitudMinima: number = 4;

  validate(control: AbstractControl): ValidationErrors | null {
    const valor = (control.value || '').toString().trim();

    if (!valor) {
      return { campoVacio: true };
    }

    if (valor.length < Number(this.longitudMinima)) {
      return {
        minLongitudSinEspacios: {
          requerida: Number(this.longitudMinima),
          actual: valor.length
        }
      };
    }

    return null;
  }
}
