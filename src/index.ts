import axios from 'axios';
import cheerio, { root } from 'cheerio';

interface MenuItems {
  title: string;
  price: number;
}

const rootUrl = 'https://www.tacobell.com/food/';
const urlEndpoints: string[] = [
  'tacos',
  'new',
  'burritos',
  'sides-sweets',
  'quesadillas',
  'drinks',
  'nachos',
  'power-menu',
  'breakfast',
];

const AxiosInstance = axios.create();

const getMenuData = async (url: string): Promise<MenuItems[]> => {
  const menuData: MenuItems[] = [];

  try {
    const responseData = await AxiosInstance.get(url);

    const html = responseData.data;
    const $ = cheerio.load(html);
    const items = $('.styles_product-card__1-cAT');

    items.each((i, element) => {
      const title: string = $(element)
        .find('.styles_product-title__6KCyw > h4')
        .text();
      const price: number = parseFloat(
        $(element)
          .find('.styles_product-details__2VdYf > span:first-child')
          .text()
          .replace('$', '')
      );

      menuData.push({ title, price });
    });
  } catch (error) {
    console.error(error);
  }

  return menuData;
};

// const buildMenuItems = async () => {
//   const menuItems: MenuItems[] = [];

//   urlEndpoints.forEach((endpoint) => {
//     menuItems.push(await getMenuData(`${rootUrl}${endpoint}`));
//   });
// };

(async () => {
  console.log(await getMenuData(`${rootUrl}tacos`));
})();

// urlEndpoints.forEach((endpoint) => {
//   const menuItems: MenuItems[] = [];

//   AxiosInstance.get(`${rootUrl}${endpoint}`)
//     .then((response) => {
//       const html = response.data;
//       const $ = cheerio.load(html);
//       const items = $('.styles_product-card__1-cAT');

// items.each((i, element) => {
//   const title: string = $(element)
//     .find('.styles_product-title__6KCyw > h4')
//     .text();
//   const price: number = parseFloat(
//     $(element)
//       .find('.styles_product-details__2VdYf > span:first-child')
//       .text()
//       .replace('$', '')
//   );

//   return menuItems.push({ title, price });
// });

//       console.log(menuItems);
//       return menuItems;
//     })
//     .catch((error) => console.error(error));
// });
