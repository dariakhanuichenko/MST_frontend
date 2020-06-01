import {Edge} from './Edge';
import {Data} from './Data';

export class Result {
  delta: number;
  targetFunction: number;
  edges: Edge[];
  additional: boolean;


  transform(): Data {
    const data: Data = new Data();
     this.edges.forEach( edge => {
       data.x.push(edge.source);
       data.y.push(edge.destination);
     });
     return data;
  }

  getLinks(): number[] {
    const data: number[] = [];
     this.edges.forEach( edge => {
       data.push(edge.source);
     });
     return data;
  }
}
