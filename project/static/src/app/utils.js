import $ from 'jquery';


export const getIdByAttr = (target, attrName) => {
  const strValue = $(target).attr(attrName);
  return parseInt(strValue, 10);
}

export function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
