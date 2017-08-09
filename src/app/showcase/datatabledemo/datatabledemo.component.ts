import { Component, OnInit } from '@angular/core';

import { BaseService } from '../util/baseservice';

const  url = "src/data/data-grid.json";
@Component({
  selector: 'table-test',
  templateUrl: './datatabledemo.component.html',
  styleUrls: ['./datatabledemo.css']
})


export class DataTableDemo implements OnInit {

  constructor(private ds: BaseService
  ) { }
  //初始化查询数据。把data赋给表格
  ngOnInit() {
    this.getData();
  }

  /*************表格所需要初始化的变量******************************** */
  btnAdd:boolean  = true;
  btnDelete:boolean  = true;
  btnImport:boolean  = true;
  btnExport:boolean = true;
  btnList: string[] = ["启用","编辑","删除"];
  title = ['班号', '年级', '地址', '标记', 'mark'];
  arrbutes = ["classCode", "gradeId", "className", "remark", "address"];
  isLink = [true, true, false, false, false];
  paging:boolean = true;
  data = new Array();
  total: number;
  pageSize = 10;
  page = 1;
  sizeList = [5, 10, 20, 50];
  isCheck = true;
  btnstyle = [
    { "color": "green" },
    { "color": "red" },
    { "color": "" }]

    buttonHeaders=[{
      value:'一键计算',
      style:{background: "red"}
    }]
    /****************************************************************** */





  /**
   * 查询后台的数据，赋给data，改变data的值，后台的值也就改变了。
   */
  getData() {
    this.ds.getData(url,"GET").then(
      res => {
        this.data = res.data;
        this.total = res.total;
      }
    )
  }

  /**
   * 
   * @param data 真分页情况下，页号，页大小改变就会查询后台的数据。
   */
  changepage(data: any) {
    console.log(data);
    let url = "src/data/data-grid.json" + "\n页号page: " + data.page + "\n页大小pageSize:" + data.pageSize + "\n总页数totalPages:" + data.totalPages;
    alert(url);
    let dataurl = "src/data/data-test.json";
    this.ds.getData(dataurl,"GET").then(
      res => {

        this.data = res.data
        console.log(this.data);
        this.total = res.total;
      }
    )

  }


  /**
   * 批量删除数据
   * @param el 
   */
  deleteDatas(el:any) {
    alert(el);
    for(let i =0; i<el.length;i++){
         this.data.splice(el[i]-i,1);  
         this.total--;
    }
  


  }

/**
 * 
 * @param el 删除单个数据
 */
  deleteData(el:number) {
    alert("要删除的索引:"+el);
    this.data.splice(el,1);


  }

  


  /**
   * 
   * @param obj 自定义操作列方法
   */
  operatData(obj: any) {
    console.log(obj);
    console.log(obj.element);
   

    switch (obj.element.innerText) {
      case "启用":
      //业务代码块
        alert("启用");
         obj.element.innerText = "我成功了";
        break;
      case "编辑":
       //业务代码块
        alert("编辑");
         obj.element.innerText = "我成功了";
        break;
      default:
       //业务代码块
        alert("删除")
        this.deleteData(obj.data);
         obj.element.innerText = "我成功了";
        break;
    }
  }

/**
 * 
 * @param data 点击td的链接触发的事件
 */
  linkClick(data: any) {
    alert(data);
  }
}








