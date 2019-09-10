export class Product {
  constructor(
    public id: number,
    public cost: number,
    public weight: number,
    public inBucket: boolean,
    public description: string,
  ){}
}