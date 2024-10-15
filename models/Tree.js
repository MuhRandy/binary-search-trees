const Node = require("./Node");
const Queue = require("./Queue");

module.exports = class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!Array.isArray(array) || array.length === 0) return null;
    if (array.length === 1) return new Node(array[0]);

    const properArray = this.#sortAndNoDuplicate(array);
    const mid = Math.floor(properArray.length / 2);

    const left = properArray.slice(0, mid);
    const right = properArray.length === 2 ? null : properArray.slice(mid + 1);

    const root = new Node(properArray[mid]);

    root.left = this.buildTree(left);
    root.right = this.buildTree(right);

    return root;
  }

  insert(value, node = this.root) {
    const newNode = new Node(value);
    if (node === null) return (this.root = newNode);

    if (value === node.data) return;

    if (value > node.data) {
      if (node.right === null) node.right = newNode;
      else this.insert(value, node.right);
    }

    if (value < node.data) {
      if (node.left === null) node.left = newNode;
      else this.insert(value, node.left);
    }
  }

  deleteItem(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) node.left = this.deleteItem(value, node.left);
    else if (value > node.data) node.right = this.deleteItem(value, node.right);
    else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let succ = this.#getSuccessor(node.right);
      node.data = succ;
      node.right = this.deleteItem(succ, node.right);
    }

    return node;
  }

  find(value, node = this.root) {
    if (node === null) return;

    if (value < node.data) return this.find(value, node.left);
    else if (value > node.data) return this.find(value, node.right);
    else return node;
  }

  levelOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback is not function");

    const breadthFirstArray = this.breadthFirst();

    breadthFirstArray.forEach(callback);
  }

  inOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback must be function!");

    const data = this.depthFirst("inorder");

    data.forEach(callback);
  }

  preOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback must be function!");

    const data = this.depthFirst("preorder");

    data.forEach(callback);
  }

  postOrder(callback) {
    if (typeof callback !== "function")
      throw new Error("Callback must be function!");

    const data = this.depthFirst("postorder");

    data.forEach(callback);
  }

  breadthFirst(queue = new Queue(this.root)) {
    if (queue.data.length === 0) return queue.data;
    const result = [];

    const left = queue.data[0].left;
    const right = queue.data[0].right;

    if (left !== null) {
      queue.enqueue(left);
    }

    if (right !== null) {
      queue.enqueue(right);
    }

    result.push(queue.dequeue().data);

    return result.concat(this.breadthFirst(queue));
  }

  depthFirst(traversalType, node = this.root) {
    const result = [];
    switch (traversalType) {
      case "inorder":
        if (node === null) return node;

        if (node.left !== null)
          result.push(...this.depthFirst("inorder", node.left));

        result.push(node.data);

        if (node.right !== null)
          result.push(...this.depthFirst("inorder", node.right));

        return result;

      case "preorder":
        if (node === null) return node;

        result.push(node.data);

        if (node.left !== null)
          result.push(...this.depthFirst("preorder", node.left));

        if (node.right !== null)
          result.push(...this.depthFirst("preorder", node.right));

        return result;

      case "postorder":
        if (node === null) return node;

        if (node.left !== null)
          result.push(...this.depthFirst("postorder", node.left));

        if (node.right !== null)
          result.push(...this.depthFirst("postorder", node.right));

        result.push(node.data);

        return result;

      default:
        throw new Error(`${traversalType} is invalid traversal type!`);
    }
  }

  height(node) {
    const data = this.find(node);

    return Math.max(this.#leftHeight(data), this.#rightHeight(data));
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) return;

    if (node.right !== null)
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null)
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  #sortAndNoDuplicate(array) {
    const set = new Set(array);
    return [...set].sort((a, b) => a - b);
  }

  #getSuccessor(curr) {
    if (curr.left === null) return curr.data;

    return this.#getSuccessor(curr.left);
  }

  #leftHeight(node) {
    let height = 0;

    if (node === null) return height;

    if (node.left !== null) height++;

    return height + this.#leftHeight(node.left);
  }

  #rightHeight(node) {
    let height = 0;

    if (node === null) return height;

    if (node.right !== null) height++;

    return height + this.#rightHeight(node.right);
  }
};
