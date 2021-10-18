import  fs from 'fs';
const formidable = require('formidable');

/* export const Save_File = (save_route, file_name, img) => {
    alert(save_route + file_name);
    /* var fs = require('fs');
     fs.writeFile(save_route + file_name, img, function (err) {
        console.log('Archivo guardado como ' + save_route + file_name);
    })
}; */

export function Save_File(save_route, file_name, img) {
    fs.writeFile(save_route + file_name, img, function (err) {
      if (err) throw err;
      console.log('Done!');
    });
  }
  
export default Save_File;