import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['dropdown.component.scss']
})
export class DropdownComponent {
  @Input() label!: string;
  @Input() values!: any[];
  @Input() placeholder: string = 'Select value';
  @Input() onSelect = (v: any) => {};
  isDropdownOpened: boolean = false;
  selectedValue: any;

  constructor(private _elementRef: ElementRef) {
  }

  select(value: any) {
    this.selectedValue = value;
    this.onSelect(value);
  }

  toggleDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  @HostListener('document:click', ['$event'])
  public hideDropdown(event: any) {
    if (this.isDropdownOpened && !this._elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpened = false;
    }
  }
}
