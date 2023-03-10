import { Button, Input, Modal, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import DeleteModal from '../modal/DeleteModal';
import { PlusOutlined } from "@ant-design/icons"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiQueryKeys } from '../../constants/api.constants';
import { CustomerApi } from '../../api/customers.api';
import StatusModal from '../modal/StatusModal';
import { Link } from 'react-router-dom';

const { Search } = Input

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
  const [statusQuery, setStatusQuery] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const { data } = useQuery({
    queryKey: [ApiQueryKeys.customers],
    queryFn: () => CustomerApi.getAll(),

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
      dataIndex: "products",
      render: (value) =>
        <p>{value.reduce((a, c) => a + c.productCount, 0)}</p>

    },
    {
      title: 'Toplam məbləğ',
      dataIndex: "products",
      render: (value) =>
        <p>{value.reduce((a, c) => a + c.total, 0)}</p>

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
        <DeleteModal onDelete={() => handleDelete(value)} value={value} setSelectedItem={setSelectedItem} selectedItem={selectedItem} setIsOpenStatusModal={setIsOpenStatusModal} isOpenDeleteModal={isOpenDeleteModal} setIsOpenDeleteModal={setIsOpenDeleteModal} />

    }
  ];
  const { data: filteredData } = useQuery({
    queryKey: [ApiQueryKeys.customers, { statusQuery, searchQuery }],
    queryFn: ({ queryKey }) => CustomerApi.getFilterer(queryKey[1])
  })

  // useEffect(() => {
  //   if (searchQuery !== "" || statusQuery !== "") {
  //     setCustomers(filteredData || [])

  //   } else {
  //     setCustomers(data || [])
  //   }

  // }, [data, searchQuery])

  const handleOk = () => {
    setIsModalOpen(false);
    //send delete request
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const productOptions = customers?.map(x => x?.products?.reduce((a, c) => a + c.productCount, 0))
  const diff = [...new Set(productOptions)]
  const options = diff?.map(x => {
    const obj = {
      value: x,
      label: x
    }
    return obj
  })
  const statusOptions = [
    {
      value: "təsdiqlənib", label: "təsdiqlənib"
    },
    {
      value: "xitam olunub", label: "xitam olunub"
    },
    {
      value: "gözləyir", label: "gözləyir"
    }
  ]



  const onChange = (pageNumber) => {
  };

  const handleFilter = (value) => {
    setStatusQuery(value)
  }

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredCustomers = data.filter(x => x.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
      setCustomers(filteredCustomers)
    } else {
      setCustomers(data)
    }
  }, [searchQuery, data])


  return (
    <div className='table-container'>
      <Link to="/create" type="primary" className='add-btn'>
        <PlusOutlined />  Yeni Qaime </Link>
      <Search onChange={(e) => setSearchQuery(e.target.value)}
        allowClear
        value={searchQuery}
        placeholder='Qaimə nömrəsi, müştəri adı üzrə axtar' />
      <div style={{ marginBottom: "20px" }}>
        <Select options={options} defaultValue="Seç"
          style={{ width: 120 }} />
        <Select onChange={handleFilter} options={statusOptions} defaultValue="Status"
          style={{ width: 120, marginLeft: "50px" }} />
      </div>
      <Table pagination={{ defaultPageSize: 10, showQuickJumper: true, total: customers?.length, locale: { jump_to: "Səhifəyə get" } }} locale={{ jump_to: "sehife" }} columns={columns} dataSource={customers} onChange={onChange} />
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