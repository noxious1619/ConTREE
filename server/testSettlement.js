import { calculateSimpleSettlement } from "./utils/settlementLogic.js";

const users = [
  { name: "A", upiId: "a@upi", amount: 100 },
  { name: "B", upiId: "b@upi", amount: 50 },
  { name: "C", upiId: "c@upi", amount: 0 }
];

console.log("INPUT USERS:");
console.table(users);

const result = calculateSimpleSettlement(users);

console.log("\nOUTPUT:");
console.dir(result, { depth: null });
