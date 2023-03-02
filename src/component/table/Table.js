import { Button, Input, Modal, Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';
import DeleteModal from '../modal/DeleteModal';
import { PlusOutlined } from "@ant-design/icons"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiQueryKeys } from '../../constants/api.constants';
import { CustomerApi } from '../../api/customers.api';
import StatusModal from '../modal/StatusModal';

const { Search } = Input

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const statusMap = {
  "təsdiqlənib": "submit",
  "xitam olunub": "cancelled",
  "gözləyir": "waited"
}


const TableList = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenStatusModal, setIsOpenStatusModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("")

  const [searchQuery, setSearchQuery] = useState("")
  const { data } = useQuery({
    queryKey: [ApiQueryKeys.customers],
    queryFn: () => CustomerApi.getAll(),
    keepPreviousData: true
  })

  const [customers, setCustomers] = useState(data || [])

  const queryClient = useQueryClient()
  const handleDeleteMutation = useMutation(CustomerApi.deleteCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries([ApiQueryKeys.customers])
      setIsModalOpen(false)
    }
  })
  const handleDelete = (value) => {

    setIsModalOpen(true)
    setSelectedItem(value)

  }

  const handleDeleteItem = () => {
    handleDeleteMutation.mutate(selectedItem.id)

  }
  const columns = [
    {
      title: 'Qaimə №',
      dataIndex: 'productId',
      sorter: (a, b) => a.productId - b.productId
    },
    {
      title: 'Müştəri',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName?.localeCompare(b.fullName),

    },
    {
      title: "Məhsul sayı",
      dataIndex: "productCount",
      sorter: (a, b) => a.productCount - b.productCount
    },
    {
      title: 'Toplam məbləğ',
      dataIndex: 'totalPrice',

      sorter: (a, b) => a.totalPrice - b.totalPrice
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) =>
        <p className={`status-btn ${statusMap[value]}`}>{value}</p>

    },
    {
      title: "action",
      render: (value) =>
        <DeleteModal onDelete={() => handleDelete(value)} value={value} setSelectedItem={setSelectedItem} setIsOpenStatusModal={setIsOpenStatusModal} isOpenDeleteModal={isOpenDeleteModal} setIsOpenDeleteModal={setIsOpenDeleteModal} />

    }
  ];



  useEffect(() => {
    if (searchQuery !== "") {

      setCustomers(data.filter(x => x.fullName.toLowerCase().includes(searchQuery.toLowerCase())))
    } else {
      setCustomers(data || [])
    }

  }, [data, searchQuery])

  const handleOk = () => {
    setIsModalOpen(false);
    //send delete request
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



  const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };
  return (
    <div className='table-container'>
      <Button type="primary" className='add-btn'>
        <PlusOutlined />  Yeni Qaime </Button>


      <Search onChange={(e) => setSearchQuery(e.target.value)}
        allowClear
        value={searchQuery}
        placeholder='Qaimə nömrəsi, müştəri adı üzrə axtar' />

      <Table pagination={{ defaultPageSize: 10, showQuickJumper: true, total: customers.length, locale: { jump_to: "Səhifəyə get" } }} locale={{ jump_to: "sehife" }} columns={columns} dataSource={customers} onChange={onChange} />
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[
        <Button key="1" onClick={() => setIsModalOpen(false)}>İmtina</Button>,
        <Button key="2" type='primary' onClick={handleDeleteItem}>Sil</Button>,
      ]} onOk={handleOk}>
        <p>Bu qaiməni silmək istədiyinizdən əminsiniz?</p>
      </Modal>
      <StatusModal setSelectedItem={setSelectedItem} selectedItem={selectedItem} isOpenStatusModal={isOpenStatusModal} setIsOpenStatusModal={setIsOpenStatusModal} />


    </div>
  )
}

export default TableList