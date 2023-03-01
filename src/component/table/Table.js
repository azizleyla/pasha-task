import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import StatusDropdown from '../dropdown/StatusDropdown';
import Sidebar from '../sidebar/Sidebar';
import { PlusOutlined } from "@ant-design/icons"



const data = [
  {
    key: '1',
    qaime_no: 32,
    customer: 'John Brown',
    product_count: 3,
    total: 150,
    status: 'təsdiqlənib'
  },
  {
    key: '2',
    qaime_no: 30,
    customer: 'Ali Alies',
    product_count: 4,
    total: 250,
    status: 'gözləyir'
  },
  {
    key: 3,
    qaime_no: 1234,
    customer: "Bob Brown",
    product_count: 5,
    total: 300,
    status: "xitam olunub"
  }

];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const statusMap = {
  "təsdiqlənib": "submit",
  "xitam olunub": "cancelled",
  "gözləyir": "waited"
}


const TableList = () => {
  const [isOpenStatusModal, setIsOpenStatusModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: 'Qaimə №',
      dataIndex: 'qaime_no',
      sorter: (a, b) => a.qaime_no - b.qaime_no
    },
    {
      title: 'Müştəri',
      dataIndex: 'customer',
      sorter: (a, b) => a.customer?.localeCompare(b.customer),

    },
    {
      title: "Məhsul sayı",
      dataIndex: "product_count",
      sorter: (a, b) => a.product_count - b.product_count
    },
    {
      title: 'Toplam məbləğ',
      dataIndex: 'total',

      sorter: (a, b) => a.total - b.total
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) =>
        <p className={`status-btn ${statusMap[value]}`}>{value}</p>

    },
    {
      title: "action",
      render: () =>
        <StatusDropdown isOpenStatusModal={isOpenStatusModal} setIsOpenStatusModal={setIsOpenStatusModal} />

    }
  ];


  const handleDelete = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false);
    //send delete request
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  return (
    <div className='table-container'>
      <Button type="primary" className='add-btn'>
        <PlusOutlined />  Yeni Qaime </Button>
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[
        <Button key="1">İmtina</Button>,
        <Button key="2" type='primary'>Sil</Button>,
      ]} onOk={handleOk}>
        <p>Bu qaiməni silmək istədiyinizdən əminsiniz?</p>
      </Modal>


    </div>
  )
}

export default TableList