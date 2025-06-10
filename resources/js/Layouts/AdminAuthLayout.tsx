import { useState, PropsWithChildren } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FilePptOutlined,
    UserOutlined,ProfileOutlined,
    FormOutlined,
    BarsOutlined, FileJpgOutlined
  } from '@ant-design/icons';

import { Button, ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import PanelSideBarLogo from '@/Components/PanelSideBarLogo';
import { User } from '@/types';
import { ClipboardMinus, Loader, LogOut } from 'lucide-react';

  const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {

    background: "#084c7f",

};

export default function AdminAuthLayout(
    
    { user, children }: PropsWithChildren<{ user:User }>) {

    const { post } = useForm();

    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        post(route('logout'));
    }

    type MenuItem = Required<MenuProps>['items'][number];

    const navigationItems = () => {

		const items:MenuItem[] = [];

		items.push({
			key: 'admin.dashboard.index',
            icon: <UserOutlined />,
            label: 'Dashboard',
            //onClick: () => router.visit('/admin/dashboard')
		},
        {
            key: 'admin.loans',
            icon: <BarsOutlined />,
            label: 'Loans', 
            children: [
                {
                    key: 'admin.pending-loans.index',
                    label: 'Pending Loans',
                    icon: <Loader size={16} />,
                },
            ]
        },
        {
            key: 'do.settngs.index',
            icon: <ClipboardMinus size={16}/>,
            label: 'Settings',
            children: [
                {
                    key: 'admin.areas.index',
                    icon: <ProfileOutlined />,
                    label: 'Areas',
                    //onClick: () => router.visit('/admin/sections')

                },
                {
                    key: 'admin.id-types.index',
                    icon: <ProfileOutlined />,
                    label: 'Id Type',
                    //onClick: () => router.visit('/admin/sections')

                },
                {
                    key: 'admin.education-levels.index',
                    icon: <BarsOutlined />,
                    label: 'Education Levels',
                    //onClick: () => router.visit('/admin/categories')
                },
            ]
        },

        
        {
            type: 'divider'
        },

        {
            key: 'admin.users',
            icon: <FileJpgOutlined />,
            label: 'Users',
            children: [
                {
                    key: 'admin.users.index',
                    label: 'List of Users',
                    icon: <BarsOutlined />,
                },
                {
                    key: 'admin.pending-users.index',
                    label: 'Pending Users',
                    icon: <Loader size={16} />,
                },
            ]
        },

        {
            key: 'do.reports.index',
            icon: <ClipboardMinus size={16}/>,
            label: 'Report',
            children: [
                {
                    key: 'reports.loan.index',
                    label: 'Loan Report'
                },
                {
                    key: 'reports.savings-account.index',
                    label: 'Savings Account'
                },
                {
                    key: 'reports.insurance.index',
                    label: 'Insurance Report'
                },
                {
                    key: 'reports.monthly-savings.index',
                    label: 'Monthly Savings Report'
                },
                {
                    key: 'reports.loan-portfolio.index',
                    label: 'Loan Portfolio'
                },
                {
                    key: 'reports.income-interest.index',
                    label: 'Income Interest'
                },
                {
                    key: 'reports.deliquency-report.index',
                    label: 'Deliquency Report'
                },
               
                
                { 
                    key: 'reports.loan-transaction.index',
                    label: 'Loan Transaction'
                },
                {
                    key: 'reports.savings-transaction.index',
                    label: 'Savings Transaction'
                
                },
               
               
            ]
        },
        // {
        //     type: 'divider',
        // },
        // {
        //     key: 'pages.index',
        //     icon: <FilePptOutlined />,
        //     label: 'Pages',
        //     // onClick: () => router.visit('/admin/pages')
        //     children: [
        //         {
        //             key: 'pages.banner.index',
        //             label: 'Banners' ,
        //             onClick: ()=> router.visit('/admin/pages/banners'),
        //         },
        //         {
        //             key: 'pages.magazine.index',
        //             label: 'Magazines' ,
        //             onClick: ()=> router.visit('/admin/pages/magazines'),
        //         },
        //         {
        //             key: 'pages.dostv.index',
        //             label: 'DOSTv' ,
        //             onClick: ()=> router.visit('/admin/pages/dostvs'),
        //         },
        //         {
        //             key: 'pages.featured-videos.index',
        //             label: 'Featured Videos' ,
        //             onClick: ()=> router.visit('/admin/pages/featured-videos'),
        //         },
        //     ],
        // },
  
  
        // {
        //     key: 'posts',
        //     icon: <FormOutlined />,
        //     label: 'Posts',

        //     children: [
        //         {
        //             key: 'posts.index',
        //             label: 'Article' ,
        //             onClick: ()=> router.visit('/admin/posts'),
        //         },
        //         {
        //             key: 'posts.featured',
        //             label: 'Featured Post' ,
        //             onClick: ()=> router.visit('/admin/post-featured'),
        //         },
        //         {
        //             key: 'posts.archives',
        //             label: 'Archive' ,
        //             onClick: ()=> router.visit('/admin/post-archives'),
        //         },
                
        //     ],
        // },
       );

		return items;
	}


    const onClick: MenuProps['onClick'] = (e) => {
        router.visit(route(e.key));
    };


    return (

        <>
            <Layout>
                <Sider className='z-10' 
                    trigger={null}
                    collapsible
                    breakpoint='md'
                    onBreakpoint={(broken) => {
                        setCollapsed(broken);
                    }}
                    collapsed={collapsed} width={300}>

                    <div className='md:h-[220px] h-[60px]'>
                        <PanelSideBarLogo />
                    </div>
                
                    <Menu
                        onClick={onClick}
                        mode="inline"
                        defaultSelectedKeys={[`${route().current()}`]}
                        defaultOpenKeys={['posts']}
                        items={
                            navigationItems()
                        }
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{ padding: 0, background: 'white' }}
                    >
                        <div className='flex items-center'>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />

                            <div className='ml-auto mr-4 flex items-center gap-4'>
                                <div>
                                    {user.lname}, {user.fname ? user.fname[0] : ''} <span className='font-bold'>({user.role})</span>
                                </div>
                                <Button className='' 
                                    danger
                                    onClick={handleLogout}>
                                    <LogOut size={16} />
                                </Button>
                            </div>

                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: 0,
                            padding: 0,
                            minHeight: '100vh',
                            background: "#dce6ec",
                            borderRadius: 0,
                        }}
                    >
                        <main className='my-4 md:mx-2'>{children}</main>
                    </Content>
                </Layout>
            </Layout>
        </>


    );
}
