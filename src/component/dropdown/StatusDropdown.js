import { Button, Dropdown, Space } from 'antd';

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        tesdiqlenib
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        legv edilib
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        gozlemededir
      </a>
    ),
  }
];
const StatusDropdown = ({text,setIsOpenStatusModal,isOpenStatusModal}) => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown
      trigger={['click']}
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Button onClick={() => setIsOpenStatusModal(!isOpenStatusModal)}>{text}</Button>
      </Dropdown>

    </Space>
  </Space>
);
export default StatusDropdown;