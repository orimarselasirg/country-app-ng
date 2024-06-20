import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  ngOnInit(): void {
    this.debounce
    .pipe(
      debounceTime(400)
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.onDebounce.unsubscribe()
  }

  private debounce: Subject<string> = new Subject<string>

  @Input()
  public placeholder: string = ""

  @Input()
    public initialValue: string = ""


  @Output()
  public inputEmmit: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  emitValue(value: string): void {
    this.inputEmmit.emit(value)
  }

  onKeyPress(value: string): void {
      this.debounce.next(value)
  }

}
