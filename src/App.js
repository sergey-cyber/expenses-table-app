import { useState } from "react";
import styles from "./App.module.scss";
import { CrateExpenseForm } from "./components/createExpForm/create-exp-form";
import EditableTable from "./components/table";
import "semantic-ui-css/semantic.min.css";
import { Footer } from "./components/footer/footer";
import { ChoosePeriod } from "./components/choosePeriod/choosePeriod";
import { ChangeDataForm } from "./components/changeDataForm/change-data-form";
import { Header } from "./components/header/header";
import { getLangLocalization } from "./utilits/localization/index";
import { useSelector } from "react-redux";
import { LocalizationContext } from "./utilits/hooks/useLangLoocalization";

function App() {
  const currentLang = useSelector(
    (state) => state.localizationData.currentLang
  );
  const globalThemeName = useSelector(
    (state) => state.localizationData.globalTheme
  );
  const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false);

  return (
    <LocalizationContext.Provider value={getLangLocalization(currentLang)}>
      <div className={`theme-${globalThemeName}`}>
        <div className={styles.App}>
          <Header />
          <ChoosePeriod />
          <EditableTable setShowCreateExpenseForm={setShowCreateExpenseForm} />
          <CrateExpenseForm
            setShowCreateExpenseForm={setShowCreateExpenseForm}
            showCreateExpenseForm={showCreateExpenseForm}
          />
          <ChangeDataForm />
          <Footer />
        </div>
      </div>
    </LocalizationContext.Provider>
  );
}

export default App;
