import { DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';


import { BsThreeDotsVertical } from "react-icons/bs"

const StatusDropdown = ({ text, setIsOpenStatusModal, isOpenStatusModal }) => {
  const items = [
    {
      key: '1',
      label: (
        <button className='action-btn'>
          <EditOutlined /> Düzəliş et
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button className='action-btn'>
          <DeleteOutlined />  Sil
        </button>
      ),
    },
    {
      key: '3',
      label: (
        <button className='action-btn'>
          <PrinterOutlined /> Statusu dəyiş
        </button>
      ),
    },
    {
      key: '4',
      label: (
        <div style={{ marginTop: "20px" }}>
          <Button>İmtina</Button>
          <Button type='primary' style={{ marginLeft: "10px" }}>Təsdiqlə</Button>
        </div>
      )
    }
  ];
  const handleClick = () => {
    setIsOpenStatusModal(false)
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

          <button style={{ background: "transparent", border: "none", cursor: "pointer" }} onClick={() => setIsOpenStatusModal(!isOpenStatusModal)}>
            <BsThreeDotsVertical />
          </button>
        </Dropdown>

      </Space>
    </Space>
  )


};
export default StatusDropdown;