import { useState, PropsWithChildren } from 'react';
import { Link, router, useForm } from '@inertiajs/react';

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

  const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {

    background: "#084c7f",

};

export default function AdminAuthLayout(
    
    { user, children }: PropsWithChildren<{ user: any}>) {

    const { post } = useForm();

    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        post(route('logout'));
    }

    type MenuItem = Required<MenuProps>['items'][number];

    const navigationItems = () => {

		const items:MenuItem[] = [];

		items.push({
			key: 'panel.dashboard',
            icon: <UserOutlined />,
            label: 'Dashboard',
            onClick: () => router.visit('/admin/dashboard')
		},
        {
            key: 'sections.index',
            icon: <ProfileOutlined />,
            label: 'Sections',
            onClick: () => router.visit('/admin/sections')

        },
        {
            key: 'categories.index',
            icon: <BarsOutlined />,
            label: 'Categories',
            onClick: () => router.visit('/admin/categories')
        },
        {
            type: 'divider',
        },
        {
            key: 'pages.index',
            icon: <FilePptOutlined />,
            label: 'Pages',
            // onClick: () => router.visit('/admin/pages')
            children: [
                {
                    key: 'pages.banner.index',
                    label: 'Banners' ,
                    onClick: ()=> router.visit('/admin/pages/banners'),
                },
                {
                    key: 'pages.magazine.index',
                    label: 'Magazines' ,
                    onClick: ()=> router.visit('/admin/pages/magazines'),
                },
                {
                    key: 'pages.dostv.index',
                    label: 'DOSTv' ,
                    onClick: ()=> router.visit('/admin/pages/dostvs'),
                },
                {
                    key: 'pages.featured-videos.index',
                    label: 'Featured Videos' ,
                    onClick: ()=> router.visit('/admin/pages/featured-videos'),
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            type: 'divider',
        },
        {
            key: 'posts',
            icon: <FormOutlined />,
            label: 'Posts',

            children: [
                {
                    key: 'posts.index',
                    label: 'Article' ,
                    onClick: ()=> router.visit('/admin/posts'),
                },
                {
                    key: 'posts.featured',
                    label: 'Featured Post' ,
                    onClick: ()=> router.visit('/admin/post-featured'),
                },
                {
                    key: 'posts.archives',
                    label: 'Archive' ,
                    onClick: ()=> router.visit('/admin/post-archives'),
                },
                
            ],
        },
        {
            type: 'divider'
        },

        {
            key: 'users.index',
            icon: <FileJpgOutlined />,
            label: 'Users',
            onClick: ()=> router.visit('/admin/users')
        });

		return items;
	}


    return (

        <>
            <Layout>
                <Sider className='z-10' trigger={null} style={siderStyle} collapsible
                    collapsed={collapsed} width={300}>
                    <PanelSideBarLogo />
                    <ConfigProvider theme={{
                        token: {
                            colorText: 'white'
                        }
                    }}>
                        <Menu
                            mode="inline"
                            style={{ background: "#084c7f",
                                color: 'white',
                            }}
                            defaultSelectedKeys={[`${route().current()}`]}
                            defaultOpenKeys={['posts']}
                            items={
                                navigationItems()
                            }
                        />

                    </ConfigProvider>
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
                                <Link href=''>{user.lname}, {user.fname[0]}</Link>
                                <Button className='' onClick={handleLogout}>Logout</Button>
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
                        <main className='mb-10'>{children}</main>
                    </Content>
                </Layout>
            </Layout>
        </>


    );
}
