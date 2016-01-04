import { hasClass, addClass, removeClass, toggleClass } from './helpers';

export default class Menu {
  constructor() {
    this.elements = {
      menu: document.querySelector('.main-menu'),
      search: document.querySelector('.main-menu input[type="search"]'),
      menuButton: document.querySelector('.menu-button'),
      defaultItems: document.querySelector('.main-menu .default-items'),
      noResults: document.querySelector('.main-menu .no-results'),
      searchResults: document.querySelector('.search-results')
    };
  }

  createNavigationItem(item) {
    const itemElement = document.createElement('li');
    const aElement = document.createElement('a');

    aElement.href = item.href;
    aElement.textContent = item.text;
    itemElement.appendChild(aElement);
    return itemElement;
  }

  showDefaults() {
    removeClass(this.elements.defaultItems, 'hide');
    addClass(this.elements.noResults, 'hide');
    addClass(this.elements.searchResults, 'hide');
  }

  showSearchResults() {
    removeClass(this.elements.searchResults, 'hide');
    addClass(this.elements.noResults, 'hide');
    addClass(this.elements.defaultItems, 'hide');
  }

  appendSearchResults(filter) {
    const search = this.elements.searchResults;
    const filterCheck = new RegExp(filter, 'i');
    let matches = false;

    search.innerHTML = '';
    if (filter === '') {
      this.showDefaults();
    } else {
      for (const page of window.scope.pages) {
        if (filterCheck.test(page.text)) {
          matches = true;
          search.appendChild(this.createNavigationItem(page));
        }
      }
      if (matches) {
        this.showSearchResults();
      } else {
        this.showDefaults();
        removeClass(this.elements.noResults, 'hide');
      }
    }
  }

  closeMenu() {
    removeClass(this.elements.menu, 'open');
  }

  toggleMenu() {
    this.appendSearchResults('');
    toggleClass(this.elements.menu, 'open');
    if (hasClass(this.elements.menu, 'open')) {
      this.elements.search.value = '';
      this.elements.search.focus();
    }
  }

  load() {
    this.elements.menuButton.addEventListener('mousedown', (e) => {
      this.toggleMenu();
      e.preventDefault();
    });
    this.elements.menuButton.addEventListener('focus', (e) => {
      this.toggleMenu();
      e.preventDefault();
    });
    this.elements.search.addEventListener('keyup', (e) => {
      const element = e.target;

      this.appendSearchResults(element.value);
    });
    this.elements.menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    document.documentElement.addEventListener('click', () => {
      this.closeMenu();
    });
  }
}
