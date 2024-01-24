import { Page } from "@playwright/test"
import { LoginPage } from "../../pages/loginPage";

export const pageFixture = {
    //@ts-ignore
    page:undefined as Page,
    loginPage: undefined as LoginPage,

}