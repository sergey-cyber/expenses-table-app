export enum Langs {
    RU = "RU",
    EN = "EN",
    header = "header"
}

export enum Themes {
    DARK = "dark",
    LIGHT = "light"
}

enum Actions {
    SET_LANG_LOCALIZATION = "expenses-app/loalizationData/SET_LANG_LOCALIZATION",
    SET_GLOBAL_THEME = "expenses-app/loalizationData/SET_GLOBAL_THEME"
}

type Action = {
    type: Actions.SET_LANG_LOCALIZATION,
    currentLang: Langs.RU | Langs.EN
} | {
    type: Actions.SET_GLOBAL_THEME,
    globalTheme: Themes.DARK | Themes.LIGHT
}

export type State = {
    currentLang: Langs.RU | Langs.EN,
    globalTheme: Themes.DARK | Themes.LIGHT
}

const initialState: State = {
    currentLang: Langs.RU,
    globalTheme: Themes.LIGHT
};

const localizationReduser = (state: State = initialState, action: Action): State => {
    switch(action.type) {
        case Actions.SET_LANG_LOCALIZATION: {
            return {
                ...state,
                currentLang: action.currentLang
            }
        }
        case Actions.SET_GLOBAL_THEME: {
            return {
                ...state,
                globalTheme: action.globalTheme
            }
        }
        default: 
            return state;
    }
}

export const setLangLocalization = (currentLang: Langs.RU | Langs.EN): Action => {
    return { type: Actions.SET_LANG_LOCALIZATION, currentLang }
};

export const setGlobalTheme = (globalTheme: Themes.DARK | Themes.LIGHT): Action => {
    return { type: Actions.SET_GLOBAL_THEME, globalTheme }
};

export default localizationReduser;