import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
// import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  url: any =
    'https://api.github.com/repos/yugabyte/yugabyte-db/issues?state=closed&per_page=100&page=1';
    dataTickets:any =[];
    showData:any =[];
    label:any =[];
    today:any;
    pipe = new DatePipe('en-US');
  constructor(private http: HttpClient) {
    this.today= Date.now();
    this.today = this.pipe.transform(this.today, 'short');
  }
  page:any =1;
  getData() {
    this.http.get(this.url).subscribe(data => {
      console.log(data)
      this.dataTickets = data;
      this.dataTickets.forEach(element => {
        element.labels.forEach(element1 => {
        this.label.push(element1);
        })
        console.log(element.overdue)
      })
      this.getpagination();
    });
  }
  getpagination() {
    var d = this.page*10;
    for(let i = 0; i<10; i++) {
      if(this.dataTickets[d]) {
        this.showData.push(this.dataTickets[d]);
        d++;
      }
    }
  }
  previous() {
    if(this.page>1) {
      this.page = this.page -1;
    }
    this.getpagination();
  }
  next() {
    var total = this.dataTickets.length/10;
    if(this.dataTickets.length%10 > 0) {
      total = total +1;
    }
    if(this.page<total) {
      this.page = this.page +1;
    }
    this.getpagination();

  }
  ngOnInit() {
    this.getData();
  }
}
