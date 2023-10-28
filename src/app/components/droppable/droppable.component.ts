import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';


@Component({
  selector: 'app-droppable',
  templateUrl: './droppable.component.html',
  styleUrls: ['./droppable.component.scss'],
})
export class DroppableComponent implements OnInit {
  // @ViewChild(HTMLElement) hostElement: HTMLElement;
  // //@Output() elementDropped: EventEmitter<any>;

  // constructor() { }

   ngOnInit() {}

  // async complete(ev, data) {
  //   if (this.isInsideDroppableArea(ev.currentX, ev.currentY)) {
  //     this.elementDropped.emit(data);
  //   }
  // }

  // isInsideDroppableArea(x, y) {
  //   const droppableArea = this.hostElement.getBoundingClientRect();
  //   if (x < droppableArea.left || x >= droppableArea.right) {
  //     return false;
  //   }
  //   if (y < droppableArea.top || y >= droppableArea.bottom) {
  //     return false;
  //   }
  //   return true;
  // }

}
