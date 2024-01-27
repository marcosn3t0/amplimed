import { Page } from "@playwright/test"
import { LoginPage } from "../../pages/loginPage";
import { HeaderPage, HeaderTopMenu } from "../../pages/headerPage";
import { ItemBox } from "../../pages/itemBox";
import { ShoppingCart } from "../../pages/shoppingCartPage";

export const pageFixture = {
    //@ts-ignore
    page:undefined as Page,
    loginPage: undefined as LoginPage,
    headerPage: undefined as HeaderPage,
    itemBoxes:undefined as ItemBox,
    headerTopMenu: undefined as HeaderTopMenu,
    shoppingCart:undefined as ShoppingCart
}