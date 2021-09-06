import { Langs } from "../../redux/localization-reduser";
import { localization_en } from "./localization_en";
import { localization_ru } from "./localization_ru";

export const getLangLocalization = (lang: Langs.RU | Langs.EN) => {
    return lang === Langs.RU ? localization_ru : localization_en;
} 