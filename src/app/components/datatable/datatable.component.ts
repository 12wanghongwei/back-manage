/**
 * Created by WGP on 2017/4/24.
 */
import { Component, OnInit, Input, ElementRef, Output, EventEmitter, DoCheck, OnChanges } from '@angular/core';
import { ModalService } from './modal.service';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'data-table',
  // templateUrl: 'test.html',
  templateUrl: 'datatable.component.html',
  styleUrls: ['./datatable.component.css']
  // styleUrls:['./test.css']
})



export class DataTableComponent implements OnInit, DoCheck, OnChanges {


  @Input() fileUrl = 'https://evening-anchorage-3159.herokuapp.com/api/';
  @Input() data: string[][] = new Array();  //假分页查询是用来保存全部的数据
  @Input() private sizeList: Array<number>; //页大小的选择
  @Input() private title: Array<string>;    //数据标题
  @Input() pageSize: number = 10;     //页大小，初始为10
  @Input() page: number = 1;     //页号，初始为1
  @Input() paging: boolean = false;          //判断是否为真分页
  @Input() total: number;                                 //总记录数

  @Input() arr: string[] = new Array();         //保存json数据串中的字段名（不包括GUID字段）


  @Input() addButton: boolean = true;
  @Input() editButton: boolean = true;
  @Input() deleteButton: boolean = true;
  @Input() importButton: boolean = false;
  @Input() exportButton: boolean = false;
  @Input() ButtonHeaders: any;

  @Input() isDetail: boolean = false; //详情列
  @Input() buttonList: string[] = new Array<string>(); //操作列
  @Input() buttonstyle = new Array<string>();    //按钮样式列
  @Input() isLink = new Array<Boolean>();      //是否为连接列
  @Input() isCheckBox = true;                     //是否有input框

  @Output() linkClickEmitData = new EventEmitter();   //点击链接是发送信息
  @Output() editData = new EventEmitter<any>();      //点击编辑时发送信息
  @Output() addOpen = new EventEmitter<any>();       //点击添加时发送信息
  @Output() operat = new EventEmitter<any>();       //点击操作列按钮时发送信息
  @Output() changepage = new EventEmitter<any>();
  @Output() deletesEmit = new EventEmitter();
  @Output() deleteEmit = new EventEmitter();
  IsUploadFile: boolean = false;

  allChecked = false;
  checked = new Array();
  type: string[][] = new Array();               //控制数据的隐藏,TRUE表示不可编辑，FALSE表示可编辑
  totalPages: number = Math.ceil(this.total / this.pageSize);     //总页数

  //依赖注入，提供http服务
  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {

  }
  //改变fileUrl，即可刷新页面数据
  ngOnChanges() {
    this.totalPages = Math.ceil(this.total / this.pageSize);

  }


  //销毁表格的中的数据内容，
  destoryData() {
    this.data.length = 0;//数据置空
    this.arr.length = 0;//字段置空
    this.type.length = 0; //是否可编辑也置空
  }

  /********************** */



  //***文件的导入导出块**** */

  //上传文件对象的基本设置
  public uploader: FileUploader = new FileUploader({
    url: this.fileUrl,
    method: "POST",
    itemAlias: "uploadedfile",

  });

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;

  }



  //模拟点击选择文件方法
  importFile(el: HTMLElement) {
    el.click();
  }

  //选择文件后上传
  fileChange() {
    let item = this.uploader.queue[0];
    if (item != null) {
      let content = document.getElementById("file");
      if (content != null) {
        content.style.display = "block";
        let options = {
          left: '',
          top: ''
        }
        options.left = (window.outerWidth - content.clientWidth) / 2 + 'px';
        options.top = (window.outerHeight - content.clientHeight) / 2 + 'px';
        let src = document.getElementById("screen");
        this.modalService.open(content, src, options);
      }

      item.upload();
    }
  }


  //动态监测是否上传成功
  ngDoCheck() {
    if (this.uploader.queue[0] != null) {
      if (this.uploader.queue[0].isError) {
        alert("失败");
        this.uploader.progress = 0;
        this.uploader.queue.length = 0;
        this.closeSrc();
        let content = document.getElementById("file").style.display = "none";
      }
      if (this.uploader.queue[0].isSuccess) {
        alert("成功");
        this.uploader.progress = 0;
        this.uploader.queue.length = 0;
        this.closeSrc();
        let content = document.getElementById("file").style.display = "none";
      }
    }
  }

  //todo: 导出文件  
  exportFile() {

  }
  //********************** */



  /*****************改变页大小或者改变页号********** */
  //改变页大小时，返回数据
  //TODO:
  showData(): void {
    this.disposeChecked();
    if (this.paging) {
      let data = {
        page: this.page,
        pageSize: this.pageSize,
        totalPages: this.totalPages,
        total: this.total
      }
      this.changepage.emit(data);
    }
  }
  disposeChecked() {
    this.allChecked = false;
    this.checked.length = this.data.length;
    for (let i = 0; i < this.data.length; i++) {
      this.checked[i] = false;
    }
  }

  //改变页号，更新表格的数据
  changePage(page: number): void {
    if (page > 0 && page < this.totalPages) {
      this.page = page;
      this.totalPages = Math.ceil(this.total / this.pageSize);
    } else if (page < 0) {
      page = 1;
      this.page = 1;
    } else {
      page = this.totalPages;
      this.page = this.totalPages;
    }

  }

  //改变页大小，更新表格显示
  changePageSize(): void {
    this.page = 1;
    this.totalPages = Math.ceil(this.total / this.pageSize);

    this.showData();
  }
  //上一页
  previousPage() {
    this.page--;
    this.showData();

  }
  //下一页
  nextPage() {
    this.page++;
    this.showData();

  }
  //首页
  topPage() {
    this.page = 1;
    this.showData();

  }
  //尾页
  endPage() {
    this.page = this.totalPages
    this.showData();

  }


  /*****************改变页大小或者改变页号********** */



  // //显示模态窗体  ID为 ： ng-modal
  open(el: HTMLElement) {

    this.addOpen.emit(el);

  }
  closeSrc() {

    this.modalService.close();
  }


  //点击按钮，编辑
  edit(i: number) {
    this.editData.emit(i);
  }


  //删除选中的数据
  deleteDatas(tbody: HTMLElement) {

    let isDelete = false;
    let ids = new Array<string>();
    let dataCount = new Array();

    for (let j = 0; j < this.checked.length; j++) {
      if (this.checked[j]) {
        dataCount.push(j);
        isDelete = true;
      }
    }
    if (!isDelete) {
      alert("请至少选中一条记录！");
      return;
    }
    this.disposeChecked();

    this.deletesEmit.emit(dataCount);
  }

  deleteData(i: number) {
    this.deleteEmit.emit(i);
  }

  //操作列触发事件
  operatData(e: HTMLElement, i: number) {
    let index: number;
    if (this.paging) {
      index = i;
    } else {
      index = (this.page - 1) * this.pageSize + i;
    }
    let data = {
      "data": index,
      "element": e
    }
    this.checked[index] = false;
    this.operat.emit(data);
  }

  //链接列触发事件
  linkClick(i: number) {
    let index: number;
    if (this.paging) {
      index = i;
    } else {
      index = (this.page - 1) * this.pageSize + i;

    }
    this.linkClickEmitData.emit(i);
  }

  select(i: number) {

  }
  //全选checkbox
  selectedAll(e: HTMLInputElement) {
    let start: number;
    let end: number;
    if (this.paging) {
      start = 0;
      end = this.data.length;
    } else {
      start = (this.page-1) * this.pageSize;
      //enditem 当前页的最后一条记录
      let enditem: number = (this.page) * this.pageSize
      end = enditem >= this.data.length ? this.data.length : enditem;
    }
    for (let i = start; i < end; i++) {
      this.checked[i] = e.checked;
    }

  }



  //弹出模态窗体
  getInner() {

    let body = document.getElementById('right');
    if (typeof window.innerWidth != 'undefined') {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    error.message = "没有找到地址，或者网络不通！";
    alert(error.message);
    return Promise.reject(error.message || error);
  }

}








