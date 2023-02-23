import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import StatusDropdown from '../dropdown/StatusDropdown';
import Sidebar from '../sidebar/Sidebar';





const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    status:'testiqlenib'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    status:'legv edilib'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    status:'gozlemededir'
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};


const TableList = () => {
    const [isOpenStatusModal,setIsOpenStatusModal] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          filters: [
            {
              text: 'Joe',
              value: 'Joe',
            },
            {
              text: 'Category 1',
              value: 'Category 1',
            },
            {
              text: 'Category 2',
              value: 'Category 2',
            },
          ],
          filterMode: 'tree',
          filterSearch: true,
          onFilter: (value, record) => record.name.startsWith(value),
          width: '30%',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title:"Status",
          dataIndex:"status",
          render:(value) =>{
            return (
                <StatusDropdown text={value} isOpenStatusModal={isOpenStatusModal} setIsOpenStatusModal={setIsOpenStatusModal}/>
            )
      
          }
        },
        {
          title: 'Address',
          dataIndex: 'address',
          filters: [
            {
              text: 'London',
              value: 'London',
            },
            {
              text: 'New York',
              value: 'New York',
            },
          ],
          onFilter: (value, record) => record.address.startsWith(value),
          filterSearch: true,
          width: '40%',
        },
        {
          title:"action",
          render: () => 
              <div className='action-btns'>
              <Button danger onClick={() => handleDelete()} >Delete</Button>
              <Button success>Edit</Button>
              </div>
          
        }
      ];
 

    const handleDelete = () =>{
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false);
        //send delete request
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
   
      const handleOkStatusModal = () =>{
        setIsOpenStatusModal(false)
      }

  return (
    <div style={{width:"100%"}}>
        <Button type="primary" style={{display:"flex",justifyContent:'flexEnd',marginLeft:'auto',marginBottom:'20px'}}>Yeni Qaime +</Button>
         <Table columns={columns} dataSource={data} onChange={onChange} />
         <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
         <p>Bu qaiməni silmək istədiyinizdən əminsiniz?</p>
         </Modal>
        
     
    </div>
  )
}

export default TableList