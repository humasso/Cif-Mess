import { Injectable } from '@angular/core';
@Injectable()
export class cesarService {
  decode(encoded:string, offset:number) : string
  {
      let charArray = Array.from(encoded);
      let decodedArray = [];
      for (const char of charArray) {
        let charCode = char.charCodeAt(0);
        let newChar = String.fromCharCode(charCode - offset)
        decodedArray.push(newChar);
      }
      return decodedArray.join('');
  }

  encode(toEncode:string, offset:number) : string
  {
      let charArray = Array.from(toEncode);
      let encodedArray = [];
      for (const char of charArray) {
        let charCode = char.charCodeAt(0);
        let newChar = String.fromCharCode(charCode + offset)
        encodedArray.push(newChar);
      }
      return encodedArray.join('');
  }
}
