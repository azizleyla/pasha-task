import { Button, Dropdown, Menu, Space } from 'antd';



const StatusDropdown = ({ text, setIsOpenStatusModal, isOpenStatusModal }) => {
  const items = [
    {
      key: '1',
      label: (
        <p className='status-btn submit'>
          təsdiqlənib
        </p>
      ),
    },
    {
      key: '2',
      label: (
        <p className='status-btn waited'>
          gözləyir
        </p>
      ),
    },
    {
      key: '3',
      label: (
        <p onClick={() => setIsOpenStatusModal(true)} className='status-btn cancelled'>
          xitam olunub
        </p>
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

          <button className={`status-btn ${text === "təsdiqlənib" ? 'submit' : text === "xitam olunub" ? "cancelled" : "waited"}`} onClick={() => setIsOpenStatusModal(!isOpenStatusModal)}>{text}</button>
        </Dropdown>

      </Space>
    </Space>
  )


};
export default StatusDropdown;