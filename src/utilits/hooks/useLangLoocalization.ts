import React, { useContext } from 'react';
import { localization_ru } from '../localization/localization_ru';

export const LocalizationContext = React.createContext(localization_ru);

export const useLocalization = () => {
    const langLocalization = useContext(LocalizationContext);
    return langLocalization;
}