import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import * as xml2js from 'xml2js';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Interview';
  displayedColumns: string[] = ['id', 'firstName', 'lastName'];
  dataSource: any;

  constructor(private service: ServicesService) { }

  ngOnInit() {

    let jsonData=this.service.getUsersJson();
    let xmlData=this.service.getUsersXML();

    forkJoin([jsonData, xmlData]).subscribe(data => {
      this.dataSource = data[0];
      this.parseXML(data[1])
      .then((data) => {  
        this.dataSource = this.dataSource.concat(data);
        this.dataSource.sort((a: { id: number; }, b: { id: number; }) => (a.id > b.id) ? 1 : -1);        
      });
    });
  }

  parseXML(data: Object) {  
    return new Promise(resolve => {  
      var k: string | number,  
        arr: any = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err: any, result: { dataset: any; }) {  
        
        var obj = result.dataset;  
        for (k in obj.record) {  
          var item = obj.record[k];  
          arr.push({  
            id: parseInt(item.id[0]),  
            firstName: item.firstName[0],  
            lastName: item.lastName[0],  
          });
        }  
        resolve(arr);  
      });  
    });  
  }  

}
