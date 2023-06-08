// js 实现单链表数据结构
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
// 实现从数组生成单链表
function createList(arr) {
  let head = new Node(arr[0]);
  let p = head;
  for (let i = 1; i < arr.length; i++) {
    p.next = new Node(arr[i]);
    p = p.next;
  }
  return head;
}

const p = createList([1, 2, 3, 4, 5]);


// 链表反转 迭代
function reverse1List(head) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  let p = head;
  let pre = null;
  while (p) {
    let next = p.next; 
    p.next = pre;
    pre = p;
    p = next;
  }
  return pre;
}
console.log(reverse1List(p));
// 列表反转 递归
function reverse2List(head) {
  if (!head || !head.next) return head;
  let p = reverse2List(head.next);
  head.next.next = head;
  head.next = null;
  return p;
}

// 虚拟头插入
// 是指在原有链表的基础上，依次将位于链表头部的节点摘下，然后采用从头部插入的方式生成一个新链表，则此链表即为原链表的反转版
function reverse3List(head) {
  let dummyHead = new Node();
  let p = head;
  while (p) {
    let next = p.next;
    p.next = dummyHead.next;
    dummyHead.next = p;
    p = next;
  }
  return dummyHead.next;
}

// 就地逆置法
function reverse4List(head) {
  let p = head;
  while (p && p.next) {
    let next = p.next;
    p.next = next.next;
    next.next = head;
    head = next;
  }
  return head;
}