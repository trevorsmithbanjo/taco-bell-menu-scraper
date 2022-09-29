import axios from 'axios';
import cheerio from 'cheerio';

interface MenuData {
  title?: string;
  price?: number;
}

interface MenuItems {
  [key: string]: MenuData[];
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

const getMenuData = async (url: string): Promise<MenuData[]> => {
  const menuData: MenuData[] = [];

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

const buildMenuItems = async (): Promise<MenuItems[]> => {
  const menuItems: MenuItems[] = [];

  for (let i = 0; i < urlEndpoints.length; i++) {
    const menuItem: MenuData[] = await getMenuData(
      `${rootUrl}${urlEndpoints[i]}`
    );
    menuItems.push({ [urlEndpoints[i]]: menuItem });
  }

  return menuItems;
};

(async () => {
  console.log(await buildMenuItems());
})();
