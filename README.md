# Responsive search menu experiment

## Why
The idea is to create a menu that works at all screen sizes, browser support etc. Once the menu is open the user is able to use the sites search functionality to filter the navigation.

This was an idea I had after reading [Ethan Marcotte's Responsive Design: Patterns & Principles](abookapart.com/products/responsive-design-patterns-principles).

## What

*On mobile* the user should be presented with a hidden menu, on reveal of the menu the user should be focused on searching allowing instant typing and also the primary menu. When the user types it changes the menu items to match the result of the search.

*On desktop* the user should see both default menu and search results at the same time, no menu item needed.

# Demo

[See a demo here](http://jonathankingston.github.io/responsive-search-menu-experiment)

## Bugs

Feel free to raise any issues etc on [GitHub](https://github.com/jonathanKingston/responsive-search-menu-experiment/), this has not been tested at all really.

## Running etc

To build the site:
```
npm install
make build
```

To serve(localhost:8080):
```
make serve
```
