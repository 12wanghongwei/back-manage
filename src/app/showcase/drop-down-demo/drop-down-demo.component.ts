import { Component, OnInit } from '@angular/core';

import { BaseService } from '../util/baseservice';

@Component({
  selector: 'app-drop-down-demo',
  templateUrl: './drop-down-demo.component.html',
  styleUrls: ['./drop-down-demo.component.css']
})
export class DropDownDemoComponent implements OnInit {

  data: any;
  constructor(private ds: BaseService) {

  }

  ngOnInit() {
    this.getData();
  }
  getData() {
    let url = "src/data/dropdown/drop-down.json"
    this.ds.getData(url, "GET").then(res => {

      this.data = res.data;
    })
  }

}
