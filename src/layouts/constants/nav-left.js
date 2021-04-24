import {
  TagsOutlined,
  ProfileOutlined,
  TeamOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  DashboardFilled,
  FormOutlined,
  CommentOutlined,
} from '@ant-design/icons';

export const NAV_LEFT = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: DashboardFilled,
    path: '/',
  },
  {
    key: 'blog-post',
    label: 'Blog Post',
    icon: FormOutlined,
    path: '/posts',
    children: [
      {
        key: '2.0',
        label: 'Nav 2.0',
        icon: FormOutlined,
        path: '/',
      },
      {
        key: '2.1',
        label: 'Nav 2.1',
        icon: FormOutlined,
        path: '/children',
      },
    ],
  },
  {
    key: 'social',
    label: 'Social',
    icon: CommentOutlined,
    path: '/socials',
  },
  {
    key: 'tag',
    label: 'Tag',
    icon: TagsOutlined,
    path: '/tags',
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: ProfileOutlined,
    path: '/profile',
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

export const MENU_KEYS = NAV_LEFT.map(nav => nav.key);

const findMenuByPath = (path, menuItem = []) =>
  menuItem.find(item => item.path === path);

const findSubMenuByPath = (path, subItemArray = []) =>
  subItemArray.find(item => item.path === path);

export const getOpenKeys = () => {
  const path = window.location.pathname;
  let openKeysSelected;
  const subMenu = findMenuByPath(path, NAV_LEFT);
  if (subMenu !== undefined) {
    openKeysSelected = subMenu.key;
  } else {
    for (const item of NAV_LEFT) {
      const subItem = findSubMenuByPath(path, item.children);
      if (subItem !== undefined) {
        openKeysSelected = item.key;
      }
    }
  }
  return [openKeysSelected];
};

export const getDefaultKeys = () => {
  let openDefaultKeys;
  const path = window.location.pathname;

  const subMenu = findMenuByPath(path, NAV_LEFT);
  if (subMenu !== undefined) {
    openDefaultKeys = subMenu.key;
  }
  if (subMenu === undefined) {
    for (const item of NAV_LEFT) {
      const subItem = findSubMenuByPath(path, item.children);
      if (subItem !== undefined) {
        openDefaultKeys = subItem.subKey;
      }
    }
  }
  return [openDefaultKeys];
};
