/*
 * @Author: xinchi
 * @Date: 2021-05-29 18:02:42
 * @LastEditTime: 2021-05-31 14:09:35
 * @LastEditors: xinchi
 * @Description: 动态规划
 * @FilePath: \utils_Func\2021\动态规划.js
 * Dream Castle Inc.
 */
/* 
  1: 穷举，求最值问题
  2： 优化有 备忘录，dp-table
  3: 核心要点： 重叠子问题、最优子结构、状态转移方程
*/

// 简单的斐波那契函数递归,尝试发出递归树
/* 
  1: n = 1,2
  n: fib(n-1) + fib(n-2)

*/
const fib = (n) => {
  // 递归结束条件
  if(n == 1 || n == 2) {
    return 1;
  }
  return fib(n-1) + fib(n-2);
}
console.log(fib(10))
/* 
  递归树分析
  f(10) = f(9)   +  f(8)
        = f(8)+f(7) + f(7)+f(6)
        =...
  时间复杂度： 子问题个数(二叉树指数级别) * 解决一个子问题的时间
            = O(2^n) *O(1) 
            = O(2^n)
            
*/