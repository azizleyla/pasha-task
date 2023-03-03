import { DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';


import { BsThreeDotsVertical } from "react-icons/bs"
import { Link, useNavigate } from 'react-router-dom';

const DeleteModal = ({ value, setIsOpenDeleteModal,selectedItem, isOpenDeleteModal,onDelete,setIsOpenStatusModal,setSelectedItem }) => {
  const navigate = useNavigate()
const handleNavigate = () =>{
   navigate(`/edit/${value.id}`,{
    state:value
   })
}
  const items = [
    {
      key: '1',
      label: (
        <button onClick={handleNavigate} to={`/edit/${value.id}`} className='action-btn'>
          <EditOutlined /> Düzəliş et
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button onClick={onDelete} className='action-btn'>
          <DeleteOutlined />  Sil
        </button>
      ),
    },
    {
      key: '3',
      label: (
        <button className='action-btn' onClick={() => {
          setIsOpenStatusModal(true)
          setSelectedItem(value)
        
        }}>
          <PrinterOutlined /> Statusu dəyiş
        </button>
      ),
    }
  
  ];
  const handleClick = () => {
    setIsOpenDeleteModal(false)
  }
  return (


    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          trigger={['click']}
          menu={{
            items,
          }}

          placement="bottomLeft"
        >

          <button style={{ background: "transparent", border: "none", cursor: "pointer" }} onClick={() => setIsOpenDeleteModal(!isOpenDeleteModal)}>
            <BsThreeDotsVertical />
          </button>
        </Dropdown>

      </Space>
    </Space>
  )


};
export default DeleteModal;