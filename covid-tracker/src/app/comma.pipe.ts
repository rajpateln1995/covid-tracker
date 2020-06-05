import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'addComma'
})

export class CommaPipe implements PipeTransform {
    transform(value:any){
        let str = value.toString();
        let i=0;
        for (i=0;i<=str.length;i++)
        {
            if(str[i]===".")
            {
                break;
            }
        }
        str = str.slice(0,i);
        for(i=3;i<str.length;i=i+3)
        {
            str = str.slice(0,-i)+ "," +str.slice(-i,str.length);
        }
        return str;
    }
}