import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

export const NAV_LEFT = [
  {
    key: '1',
    label: 'Nav 1',
    icon: UserOutlined,
    path: '/',
    children: [
      {
        key: '1.0',
        label: 'Nav 1.1',
        icon: UserOutlined,
        path: '/children',
      },
    ],
  },
  {
    key: '2',
    label: 'Nav 2',
    icon: AppstoreOutlined,
    path: '/todo',
  },
  {
    key: '3',
    label: 'Nav 3',
    icon: BarChartOutlined,
    path: '/3',
  },
  {
    key: '4',
    label: 'Nav 4',
    icon: CloudOutlined,
    path: '/user',
  },
  {
    key: '5',
    label: 'Nav 5',
    icon: ShopOutlined,
    path: '/',
  },
  {
    key: '6',
    label: 'Nav 6',
    icon: TeamOutlined,
    path: '/',
  },
  {
    key: '7',
    label: 'Nav 7',
    icon: UploadOutlined,
    path: '/',
  },
  {
    key: '8',
    label: 'Nav 8',
    icon: VideoCameraOutlined,
    path: '/',
  },
];
