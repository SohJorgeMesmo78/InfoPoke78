import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  
  @Output() pageChange = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  onPageChange(event: any) {
    this.pageChange.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize
    });
  }
}
