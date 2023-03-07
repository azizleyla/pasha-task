import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CustomerApi } from '../api/customers.api'
import { ApiQueryKeys } from '../constants/api.constants'

const products = [
  {
    id: 1,
    name: "duyu",
    price: 3,
    total: 0,
    productCount: 1
  },
  {
    id: 2,
    name: "alma",
    price: 2,
    total: 0,
    productCount: 1
  },
  {
    id: 3,
    name: "salmon baliq",
    price: 10,
    total: 0,
    productCount: 1
  }
]

const CustomerForm = () => {
  const [options, setOptions] = useState()
  const { id } = useParams()
  const location = useLocation()
  const [selectedProduct, setSelectedProduct] = useState()
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState(location?.state?.products)
  const [fullName, setFullName] = useState()
  const[numVal,setNumVal] =useState(1)
  const[total,setTotal] = useState()
  
  const columns = [
    {
      title: 'Mehsulun adi',
      dataIndex: 'name',
      sorter: (a, b) => a.name.toLowerCase(b.name)
    },
    {
      title: 'Miqdar',
      dataIndex: 'productCount',
       render:(text,record,index) =>
       <input  type="number" onChange={(e) =>{
            setDataSource(dataSource.map((item,i) => i === index ? {...record,total:record.productCount * record.price,productCount:Number(e.target.value)} : item)
            )
        
       }} value={record.productCount}/>
       
       ,
      sorter: (a, b) => a.productCount - b.productCount
    },
    {
      title: 'Qiymet',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Toplam mebleg',
      dataIndex: 'total',
      render:(text,record) =>
      <p>{record.productCount * record.price}</p>,

      sorter: (a, b) => a.total - b.total
    },
    {
      title:"Action",
      dataIndex:"action",
      render:() =>
      <button>Sil</button>
    }
  ]
  
  const { data: customers } = useQuery({
    queryKey: [ApiQueryKeys.customers],
    queryFn: () => CustomerApi.getAll(),

  })
  const handleChangeName = (value) => {
    setFullName(value)
  }


  const handleChange = (value) => {
 
    const selectedProduct = products.find(item => item.id === value);
    setSelectedProduct(selectedProduct)

  }
  useEffect(() => {
    if (!isNaN(id)) {
      setDataSource(location.state?.products)

    } else {
      setDataSource([])
    }

  }, [id])

  const { data } = useQuery({
    queryKey: [ApiQueryKeys.customers],
    queryFn: () => CustomerApi.getAll(),
    keepPreviousData: true
  })
  const selectedCustomer = data?.find(item => item.id === Number(id))
  const handleAdd = () => {
    console.log(dataSource)
    setSelectedProduct({selectedProduct,total:selectedProduct.productCount + selectedProduct.price})
    setDataSource([...dataSource, { ...selectedProduct,  total: selectedProduct.price  }])
  }
  const queryClient = useQueryClient()
  const updateCustomerMutation = useMutation(CustomerApi.updateCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries([ApiQueryKeys.customers])
      navigate('/')
    }
  })
  const addCustomerMutation = useMutation(CustomerApi.createCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries([ApiQueryKeys.customers])
      navigate('/')
    }
  })
  
  const handleSubmit = () => {
    const data = {
      ...location.state,
      products: dataSource
    }
    console.log(data)
    if (!isNaN(id)) {

      updateCustomerMutation.mutate({ id, data })
    } else {
      const newData = {
        id: Math.trunc(Number(Math.random() * 100)),
        fullName,
        status: "gözləyir",
        productId: 23455,
        products: dataSource,
        
      }
      addCustomerMutation.mutate(newData)
    }
  }
 


  return (
    <div className='container'>
      <Select showSearch
        defaultValue={selectedCustomer?.fullName}
        style={{ width: 450 }}
        disabled={selectedCustomer?.fullName}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        onChange={handleChangeName} options={[
          { value: 'azer aliyev', label: 'Azer Aliyev' },
          { value: 'leyla aziz', label: 'Leyla Aziz' },
          { value: 'ali mamedov', label: 'Ali Mamedov' }]} />
      <Select

        style={{ width: 450 ,marginLeft:"50px"}}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        onChange={handleChange} options={[
          { value: 1, label: 'Duyu' },
          { value: 2, label: 'alma' },
          { value: 3, label: 'salmon baliq' }]} />
      <Button onClick={handleAdd} type="primary">
        <PlusOutlined />
      </Button>
      <div style={{ marginTop: "100px" }}>
        <Table dataSource={dataSource} columns={columns} />
        <div className='edit-btns'>
          <span style={{color:"#0051ec",fontSize:"20px"}}>Toplam: <strong> ${dataSource.reduce((a,c) => a + c.total,0)}</strong></span>
          <div style={{margin:"30px 0"}}>
        <Button onClick={() => navigate("/")} className='cancel-btn' type="link">Imtina</Button>
        <Button  className="save-btn" onClick={handleSubmit} type="primary">Yadda saxla</Button>
        </div>
        </div>
      </div >
    </div >
  )
}

export default CustomerForm