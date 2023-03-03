import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { AutoComplete, Button, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { CustomerApi } from '../api/customers.api';
import { ApiQueryKeys } from '../constants/api.constants';


  

const CustomerForm = () => {
    const columns = [
        {
          title: "Məhsul adı",
          dataIndex: 'productName',
          sorter: (a, b) => a.productName.localeCompare(b.productName)
        },
        {
          title: 'Miqdar',
          dataIndex: 'productCount',
         
    
        },
        {
          title: "Qiymət",
          dataIndex: "price",
          sorter: (a, b) => a.price - b.price
        },
        {
          title: 'Toplam məbləğ',
          dataIndex: 'totalPrice',
    
          sorter: (a, b) => a.totalPrice - b.totalPrice,
          render:(value) =>
            console.log(value)
          
        },
      
        {
          title: "action",
        
        }
      ];
const location = useLocation();
console.log(location)
const{data} = useQuery({
    queryKey:[ApiQueryKeys.customers],
    queryFn:() => CustomerApi.getAll()
})

const {id} = useParams()
const customers = [location.state]

const selectedCustomer = customers?.find(item => item.id === Number(id))
const optionsData = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];
  const[options,setOptions] = useState([])


//   useEffect(() =>{
//        if(id){
//         setOptions([...options,{value:selectedCustomer?.fullName}])
//        }else{
//         setOptions(optionsData)
//        }
//   },[id])


//   console.log(customers?.products)
 
  return (
    <div className='container'>
     <h1 className='title'>Qaimə</h1>
        {/* <AutoComplete   style={{
      width: 400,
      marginRight:"80px"
    }} filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    } options={options}/>
        <AutoComplete   style={{
      width: 400,
    }} filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    } options={options}/> */}
    <Button type='primary'>
        <PlusOutlined/>
    </Button>
    <div style={{marginTop:"150px"}}>
    <Table pagination={false} dataSource={customers.products} columns={columns}/>
    <Button type='outlined'>Imtina</Button>
    <Button type="primary">Təsdiqlə</Button>
    </div>

    </div>
  )
}

export default CustomerForm