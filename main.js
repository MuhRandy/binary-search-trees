const Tree = require("./models/Tree");
const util = require("util");
const { generateRandomArray } = require("./services/DataGenerator");

const array = generateRandomArray(7);

const tree = new Tree(array);

tree.prettyPrint();
console.log(tree.isBalanced());
console.log("\n");
tree.levelOrder((v) => console.log(v));
console.log("\n");
tree.inOrder((v) => console.log(v));
console.log("\n");
tree.preOrder((v) => console.log(v));
console.log("\n");
tree.postOrder((v) => console.log(v));

tree.insert(300);
tree.insert(286);
tree.insert(296);
tree.insert(786);
tree.insert(906);
tree.insert(560);
tree.prettyPrint();

tree.rebalance();
console.log(tree.isBalanced());

tree.prettyPrint();
