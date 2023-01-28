# Taco-bell-menu-scraper

This is a simple program to scrape menu inforamtion from the taco bell website.

## Usage

1. Download the repo locally using `git clone https://github.com/trevorsmithbanjo/taco-bell-menu-scraper.git`
2. CD into the directory with the project and install all the dependencies with `npm install'
3. Run `npm run start` and you should see the output from the scraper loged in the command line

### Functions

The `buildMenuItems` function is exported from the `src/index.ts` file. This function returns a Promise of `MenuItems`. The `MenuItems` obejct will contain all of the menu items that have been scraped from the website.

If you only need specific menu items you could desctruture the object returned from `buildMenuItems` e.g.

```
const {
    tacos,
    new: newItems,
    burritos,
    'sides-sweets': sidesSweets,
    quesadillas,
    drinks,
    nachos,
    'power-menu': powerMenu,
    breakfast,
  } = menuItems;
```

## Issues

If you run into any issues please open an issue or if you find a way to fix a bug fork the repo and open a pull request.
