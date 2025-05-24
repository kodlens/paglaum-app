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
import { ClipboardMinus, LogOut } from 'lucide-react';

  const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {

    background: "#084c7f",

};

export default function DoAuthLayout(

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
			key: 'do.dashboard.index',
            icon: <UserOutlined />,
            label: 'Dashboard'
        },
        // {
        //     key: 'bm.areas.index',
        //     icon: <ProfileOutlined />,
        //     label: 'Areas'
        // },
        {
            key: 'do.loans.index',
            icon: <BarsOutlined />,
            label: 'Loans'
        },
        {
          key: 'do.member-savings-accounts.index',
          icon: <BarsOutlined />,
          label: 'Savings Accounts'
        },

        {
            key: 'do.members.index',
            icon: <UserOutlined />,
            label: 'Members/Borrower'
        },
        {
            type: 'divider'
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
                    key: 'reports.loan-transaction.index',
                    label: 'Loan Transaction'
                },
                {
                    key: 'reports.savings-transaction.index',
                    label: 'Savings Transaction'
                
                },
               
               
            ]
        });

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
