import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { expensesDataAPI } from '../api/api';
import { Preloader } from './common/preloader';
import { connect } from 'react-redux';
import { getAllExpensesData, setChangeDataFormOpen } from '../redux/table-reduser';
import styles from './table.module.scss';
import { LocalizationContext } from '../utilits/hooks/useLangLoocalization';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  static contextType = LocalizationContext;
  constructor(props, context) {
    super(props);
    this.columns = [
      {
        title: 'Expenses',
        dataIndex: 'discription',
        editable: true,
      },
      {
        title: 'Cost',
        dataIndex: 'cost',
        width: '12%',
        render: (text, expData) => {
          return this.renderNonEditableCell(text, expData)  
        },
      },
      {
        title: 'Date',
        dataIndex: 'date',
        width: '12%',
        editable: false
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          this.props.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
          width: '15%',
      },
    ];
    this.state = {
      count: null
    };
  }

  renderNonEditableCell = (text, rowData) => {
    const fieldNames = Object.keys(rowData);
    const currFieldName = fieldNames.filter(name => rowData[name] === text)[0]
    return (
      <div onClick = {() => this.props.setChangeDataFormOpen(currFieldName, true, rowData)}>
        {rowData[currFieldName]}
      </div>
    );
  }

  handleDelete = (key) => {
    expensesDataAPI.deleteExpense(this.props.currentYear, this.props.currentMonth, key)
      .then((response) => {
        if(response.resultCode === 'successfull') {
          this.props.getAllExpensesData(this.props.currentYear, this.props.currentMonth);
        }
      }); 
  }
  handleAdd = () => {    
    this.props.setShowCreateExpenseForm(true);
  };
  
  handleSave = (row) => {
    const newMonthData = [...this.props.dataSource];
    const index = newMonthData.findIndex((item) => row.key === item.key);
    const item = newMonthData[index];
    newMonthData.splice(index, 1, { ...item, ...row });
    expensesDataAPI.editExpense(this.props.currentYear, this.props.currentMonth, newMonthData)
      .then((response) => {
        if(response.resultCode === 'successfull') {
          this.props.getAllExpensesData(this.props.currentYear, this.props.currentMonth);
        }
      }); 
  };

  componentDidMount = () => {
    this.props.getAllExpensesData(this.props.currentYear, this.props.currentMonth) //???????????????? ?????????????????? ???????????? ?? ?????????????? ?? ?????????????????? ?? ??????????
  }

  render() {
    const dataSource = this.props.dataSource;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        }),
      };
    });
    return (      
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          className={styles.addRowButton}
          disabled={this.props.dataSourceIsLoading}
        >
          { this.context.addRowButton }
        </Button>
        {
        this.props.dataSourceIsLoading 
        ? 
        <Preloader fontSize = {54} />
        :
        <Table className={styles.table}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataSource: state.tableData.dataSource,
    dataSourceIsLoading: state.tableData.dataSourceIsLoading,
    currentYear: state.tableData.currentYear,
    currentMonth: state.tableData.currentMonth
  }
}

export default connect(mapStateToProps, {getAllExpensesData, setChangeDataFormOpen })(EditableTable);

