
/**
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
 
 **/
const isMatch = (s, p) => {
  if (s === null || p === null) {
    return false;
  }
  let stringArr = [], patternArr = [];
  for (let i = 0; i < s.length; i++) {
    stringArr[i] = s[i];
  }
  for (let i = 0; i < p.length; i++) {
    patternArr[i] = p[i];
  }

  return dp(stringArr, patternArr, 0, 0);
}

const dp = (s, p, i, j) => {
  let s_len = s.length;
  let p_len = p.length;
  if (j >= p_len) {
    return i === s_len;
  }
  let j_match = i < s_len && (s[i] == p[j] || p[j] == '.');
  if (j + 1 < p_len && p[j + 1] == '*') {
    return dp(s, p, i, j + 2) || (j_match && dp(s, p, i + 1, j));
  }
  return j_match && dp(s, p, s_len + 1, p_len + 1);
}

console.log(isMatch('aa', 'a.'));
