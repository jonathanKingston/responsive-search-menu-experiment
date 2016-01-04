export function hasClass(element, className) {
  const check = new RegExp(`\\b${className}\\b`);

  return check.test(element.className);
}

export function addClass(element, className) {
  const current = element.className;

  if (!hasClass(element, className)) {
    if (current[current.length - 1] !== ' ') {
      element.className += ' ';
    }
    element.className += className;
  }
}

export function removeClass(element, className) {
  const replace = new RegExp(`\s*${className}\s*`, 'g');

  element.className = element.className.replace(replace, ' ').trim();
}

export function toggleClass(element, className) {
  if (hasClass(element, className)) {
    removeClass(element, className);
  } else {
    addClass(element, className);
  }
}
