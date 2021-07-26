import { useState } from 'react';
import './App.css';
import { CrateExpenseForm } from './components/createExpForm/create-exp-form';
import EditableTable from './components/table';
import 'semantic-ui-css/semantic.min.css';

function App() {

  const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false); 

  return (
    <div className="App">
      <h1 style={{marginTop: '25px'}}>Expenses Table App</h1>
      <EditableTable setShowCreateExpenseForm={setShowCreateExpenseForm} /> 
      { <CrateExpenseForm setShowCreateExpenseForm={setShowCreateExpenseForm} showCreateExpenseForm={showCreateExpenseForm} /> }
    </div>
  );
}

export default App;
