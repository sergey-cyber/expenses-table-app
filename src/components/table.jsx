import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { expensesDataAPI } from '../api/api';
import { generateHexString } from '../utilits/randomKeyGenerator';
import { Preloader } from './common/preloader';
import { connect } from 'react-redux';
import { getAllExpensesData } from '../redux/table-reduser';

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
  constructor(props) {
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
        editable: true,
        width: '12%',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        editable: true,
        width: '12%',
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
      count: null,
    };
  }

  handleDelete = (key) => {
    expensesDataAPI.deleteExpense(key)
      .then(() => this.props.getAllExpensesData());
    }
  handleAdd = () => {    
    /* const { count, dataSource } = this.state;
    const newData = {
      key: generateHexString(26),
      discription: 'Expenses Discription',
      cost: 0,
      date: 'Date',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    }); */
    this.props.setShowCreateExpenseForm(true);
  };
  handleSave = (row) => {
    const newData = [...this.props.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    expensesDataAPI.editExpense(newData)
      .then(() => this.props.getAllExpensesData()) 
  };

  componentDidMount = () => {
    this.props.getAllExpensesData() //Получаем стартовый данные с сервака и диспатчим в стэйт
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
          handleSave: this.handleSave,
        }),
      };
    });
    return (      
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
          disabled={this.state.startDataLoading}
        >
          Add a row
        </Button>
        {
        this.props.dataSourceIsLoading 
        ? 
        <Preloader fontSize = {54} />
        :
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataSource: state.tableData.dataSource,
    dataSourceIsLoading: state.tableData.dataSourceIsLoading
  }
}

export default connect(mapStateToProps, {getAllExpensesData})(EditableTable);

