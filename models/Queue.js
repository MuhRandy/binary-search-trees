module.exports = class Queue {
  constructor(value) {
    this.data = [value];
  }

  enqueue(value) {
    this.data.push(value);
  }

  dequeue() {
    return this.data.shift();
  }
};
