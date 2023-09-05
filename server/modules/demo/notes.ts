type AAA = {
  nameAAA: string;
};
interface BBB {
  name: string;
}

interface BBB {
  age: number;
}

type ACong = AAA & {
  isACong: boolean;
};

interface BCong extends BBB {
  isBCong: boolean;
}

const _a: ACong = {};
const _b: BCong = {};

// class types
class Car {
  name: string;
  year: number;
  constructor(name: string, year: number) {
    this.name = name;
    this.year = year;
  }
}

let car1 = new Car("Honda", 2022);

car1.year = 12;
