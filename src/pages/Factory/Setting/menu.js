const systemMenu = [
    {
        type: 'department',
        name: '部门设置',
        router: '/factory/setting/system/department'
    },
    {
        type: 'role',
        name: '角色设置',
        router: '/factory/setting/system/role'
    },
    {
        type: 'user',
        name: '用户管理',
        router: '/factory/setting/system/user'
    },
    {
        type: 'unit',
        name: '单位设置',
        router: '/factory/setting/system/unit'
    },
    {
        type: 'internet',
        name: '联网密码',
        router: '/factory/setting/system/internet'
    },
];
const userMenu = [
    {
        type: 'info',
        name: '个人信息设置',
        router: '/factory/setting/user/info'
    },
    {
        type: 'safe',
        name: '安全设置',
        router: '/factory/setting/user/safe'
    }
]
export {systemMenu, userMenu}