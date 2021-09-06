export enum Langs {
    RU = "RU",
    EN = "EN",
    header = "header"
}

enum Actions {
    SET_LANG_LOCALIZATION = "expenses-app/loalizationData/SET_LANG_LOCALIZATION",
}

type Action = {
    type: Actions.SET_LANG_LOCALIZATION,
    currentLang: Langs.RU | Langs.EN
}

export type State = {
    currentLang: Langs.RU | Langs.EN
}

const initialState: State = {
    currentLang: Langs.RU
};

const localizationReduser = (state: State = initialState, action: Action): State => {
    switch(action.type) {
        case Actions.SET_LANG_LOCALIZATION: {
            return {
                ...state,
                currentLang: action.currentLang
            }
        }
        default: 
            return state;
    }
}

export const setLangLocalization = (currentLang: Langs.RU | Langs.EN): Action => {
    return { type: Actions.SET_LANG_LOCALIZATION, currentLang }
};

export default localizationReduser;