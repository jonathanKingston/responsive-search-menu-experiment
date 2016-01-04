import { removeClass } from './helpers';
import Menu from './menu';


function mustard() {
  if (!('querySelector' in document && 'addEventListener' in window)) {
    return false;
  }
  return true;
}

window.scope = JSON.parse(document.querySelector('script#scope').textContent);

function load() {
  if (mustard()) {
    removeClass(document.querySelector('html'), 'legacy');
    const menu = new Menu();

    menu.load();
  }
}

document.addEventListener('DOMContentLoaded', load);
