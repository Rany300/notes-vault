import { Component, forwardRef, OnInit } from '@angular/core';
import { Colors, Note } from 'src/app/services/note.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorSelectorComponent),
      multi: true
    }
  ]
})
export class ColorSelectorComponent implements ControlValueAccessor, OnInit {


  
  colors: Colors[] = Object.values(Colors)
  // TODO: Initial value does not work yet
  selectedColor: Note['color'] = Colors.yellow


  constructor() {}

  ngOnInit(): void {}

  onChange: any = () => { };
  onTouched: any = () => { };
  
  writeValue(color: Note['color']): void {
    this.selectedColor = color
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  selectColor(color: Note['color']) {
    this.selectedColor = color
    this.onChange(color)
    this.onTouched()
  }


  public get color(): Note['color'] {
    return this.selectedColor;
  }
}
