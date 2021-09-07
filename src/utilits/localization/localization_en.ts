import { localization_ru } from "./localization_ru";

export const localization_en: typeof localization_ru = {
    header: {
        mainTitle: "Expenses Table",
        menu: {
            language: "Language",
            russian: "Russia",
            english: "English"
        }
    },
    months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    addRowButton: "Add a row",
    table: {
        expenses: "Expenses",
        cost: "Cost",
        date: "Date",
        operations: "Operations"
    },
    footer: "Total expenses:"
}