import { useState } from 'react';
import './App.css';
import { CrateExpenseForm } from './components/createExpForm/create-exp-form';
import EditableTable from './components/table';
import 'semantic-ui-css/semantic.min.css';
import { Footer } from './components/footer/footer';
import { ChoosePeriod } from './components/choosePeriod/choosePeriod';
import { ChangeDataForm } from './components/changeDataForm/change-data-form';

function App() {

  const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false); 

  return (
    <div className="App">
      <h1 style={{paddingTop: '25px'}}>Expenses Table App</h1>
      <ChoosePeriod />
      <EditableTable setShowCreateExpenseForm={setShowCreateExpenseForm} /> 
      <CrateExpenseForm setShowCreateExpenseForm={setShowCreateExpenseForm} showCreateExpenseForm={showCreateExpenseForm} />
      <ChangeDataForm />
      <Footer />
    </div>
  );
}

export default App;
