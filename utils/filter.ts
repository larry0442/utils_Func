/**
 * 格式化数字
 * @param {Number|String} num 数值
 * @param {Number} precision 精确度
 * @param {String} unit 单位
 */
function formatNumber(
  num: number | string,
  precision?: number,
  unit = ''
): string {
  const numNumber = Number(num);
  if (
    typeof num === 'boolean' ||
    num === '' ||
    num === undefined ||
    num === null ||
    Number.isNaN(numNumber)
  ) {
    return '';
  }
  const decimalPattern = /\d(?=(\d{3})+\.)/g;
  const integerpattern = /\d(?=(\d{3})+$)/g;
  if (precision) {
    return `${unit}${numNumber.toFixed(precision).replace(decimalPattern, '$&,')}`;
  }
  if (Number.isInteger(numNumber)) {
    return `${unit}${numNumber.toString().replace(integerpattern, '$&,')}`;
  }
  return `${unit}${numNumber.toString().replace(decimalPattern, '$&,')}`;
}

// 数字格式化
export function numberFormat(
  num: number | string,
  precision?: number,
  unit: string = '',
): string {
  return formatNumber(num, precision, unit);
}

// 金额格式化
export function moneyFormat(
  money: number | string,
  precision: number = 2,
  unit: string = '￥',
): string {
  return formatNumber(money, precision, unit);
}
