import { Injectable } from '@nestjs/common';
import { XlsxInterface } from './xlsx.interface';
import * as xlsxFile from 'read-excel-file/node';

@Injectable()
export class AppService {
  folder: string;
  constructor() {
    this.folder = 'file/';
  }
  excelReader(filename: string): any {
    return xlsxFile(this.folder + filename).then((rows) => {
      let listInterfaces = [];

      for (let i = 1; i < rows.length; i++) {
        let interfaceObj: XlsxInterface = {
          column0: rows[i][0],
          column1: rows[i][1],
          column2: rows[i][2],
          column3: rows[i][3],
          column4: rows[i][4],
          column5: rows[i][5],
          column6: rows[i][6],
          column7: rows[i][7],
          column8: rows[i][8],
          column9: rows[i][9],
        };
        listInterfaces.push(interfaceObj);
      }

      var fs = require('fs');
      var filePath = this.folder + filename;
      fs.unlinkSync(filePath);
      return listInterfaces;
    });
  }
}
