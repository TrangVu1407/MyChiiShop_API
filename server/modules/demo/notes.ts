type AAA = {
    nameAAA: string;
  }
  interface BBB {
    name: string;
  }
  
  interface BBB {
    age: number;
  }
  
  type ACong =  AAA & {
    isACong: boolean;
  }
  
  interface BCong extends BBB {
    isBCong: boolean;
  }
  
  
  const _a: ACong = {}
  const _b: BCong = {}