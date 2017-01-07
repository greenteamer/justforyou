import $ from 'jquery';


export const getIdByAttr = (target, attrName) => {
  console.log('getIdByAttr target:', target);
  console.log('getIdByAttr attrName:', attrName);
  const strValue = $(target).attr(attrName);
  return parseInt(strValue, 10);
}
