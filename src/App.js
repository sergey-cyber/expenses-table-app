import { useState } from 'react';
import './App.css';
import { CrateExpenseForm } from './components/createExpForm/create-exp-form';
import EditableTable from './components/table';
import 'semantic-ui-css/semantic.min.css';

function App() {

  const [showCreateExpenseForm, setShowCreateExpenseForm] = useState(false); 

  return (
    <div className="App">
<<<<<<< HEAD
<<<<<<< HEAD
      <h1 style={{marginTop: '25px'}}>Expenses Table App</h1>
      <EditableTable setShowCreateExpenseForm={setShowCreateExpenseForm} /> 
      { <CrateExpenseForm setShowCreateExpenseForm={setShowCreateExpenseForm} showCreateExpenseForm={showCreateExpenseForm} /> }
=======
      <h1>Expenses Table!!!</h1>
      <h2>Для теста пушим в ветку update</h2>
=======
      <h1>Expenses Table</h1>
=======
      <h1 style={{marginTop: '25px'}}>Expenses Table App</h1>
>>>>>>> feature/updates
>>>>>>> master
      <EditableTable /> 
>>>>>>> c00d150bcf3f4e69ec92ea0a72df8a5d697949c0
    </div>
  );
}

export default App;
