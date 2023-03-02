import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { CustomerApi } from '../../api/customers.api'
import { ApiQueryKeys } from '../../constants/api.constants'

const StatusModal = ({isOpenStatusModal,setIsOpenStatusModal,selectedItem,setSelectedItem}) => {
    const[selectedStatus,setSelectedStatus] = useState()
const handleCancel = () =>{
    setIsOpenStatusModal(false)
}
const queryClient = useQueryClient()

const updateStatusMutation = useMutation(CustomerApi.updateStatus,{
    onSuccess:async()=>{
      queryClient.invalidateQueries([ApiQueryKeys.customers])
    setIsOpenStatusModal(false)
    }
})

const handleChangeStatus = ()=>{

    const data = {
        ...selectedItem,
        status:selectedStatus
    }
    const id = selectedItem.id;
    updateStatusMutation.mutate({id,data})
    setIsOpenStatusModal(false)
    setSelectedStatus('')
}

  return (

    <Modal open={isOpenStatusModal} onCancel={handleCancel} footer={[
        <Button key="1" onClick={() => setIsOpenStatusModal(false)}>İmtina</Button>,
        <Button key="2"  onClick={handleChangeStatus} type='primary'>Təsdiqlə</Button>
      ]}>
        <button style={{border:`${selectedStatus === 'təsdiqlənib' ? "1px solid #488C6E" : ""}`}} onClick={() => {
          
            setSelectedStatus("təsdiqlənib")
            }} className={`status-btn submit`}>Təsdiqlənib</button>
        <button style={{border:`${selectedStatus === 'gözləyir' ? "1px solid #e0b300" : ""}`}} onClick={() =>{
           
            setSelectedStatus('gözləyir')
            }
          }  className={`status-btn waited`}>Gözləyir</button>
        <button style={{border:`${selectedStatus === 'xitam olunub' ? "1px solid #ff4634" : ""}`}} onClick={() => {
            setSelectedStatus('xitam olunub')
        }
        }  className={`status-btn cancelled`}>Xitam olunub</button>
      </Modal>
    
  )
}

export default StatusModal