const Tree = require("./models/Tree");
const util = require("util");

const tree = new Tree([1, 2, 3, 5, 4, 3, 6, 7, 9]);
// const tree = new Tree();

// console.log(util.inspect(tree, { depth: null }));

// tree.insert(2);
// tree.insert(-7);
// tree.insert(7);
// console.log(tree.find(10));
// console.log(tree.levelOrder());
// console.log(typeof logValue);
// tree.levelOrder((value) => console.log(value));
// console.log(tree.inOrder());
// tree.inOrder((value) => console.log(value));
// tree.preOrder((v) => console.log(v));
// tree.postOrder((v) => console.log(v));

// console.log(util.inspect(tree, { depth: null }));
tree.prettyPrint();
// console.log(tree.height(3));
// console.log(tree.height(2));
// console.log(tree.height(1));
console.log(tree.depth(tree.find(3)));
