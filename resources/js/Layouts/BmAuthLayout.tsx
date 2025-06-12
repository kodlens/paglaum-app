import { useState, PropsWithChildren } from 'react';
import { Link, router, useForm } from '@inertiajs/react';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    BarsOutlined,
  } from '@ant-design/icons';

import { Button, ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import PanelSideBarLogo from '@/Components/PanelSideBarLogo';
import { User } from '@/types';
import { ClipboardMinus, Loader, LogOut } from 'lucide-react';

  const { Header, Sider, Content } = Layout;

const siderStyle: React.CSSProperties = {

    background: "#084c7f",

};

export default function BmLAuthLayout(

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
			key: 'bm.dashboard.index',
            icon: <UserOutlined />,
            label: 'Dashboard'
        },
        // {
        //     key: 'bm.areas.index',
        //     icon: <ProfileOutlined />,
        //     label: 'Areas'
        // },
        {
            key: 'bm.loans',
            icon: <BarsOutlined />,
            label: 'Loans', 
            children: [
                {
                    key: 'bm.loans.index',
                    label: 'List of Loans',
                    icon: <BarsOutlined />,
                },
                {
                    key: 'bm.pending-loans.index',
                    label: 'Pending Loans',
                    icon: <Loader size={16} />,
                },
            ]
        },
        {
            key: 'bm.savings-accounts',
            icon: <BarsOutlined />,
            label: 'Savings Account',
            children: [
                {
                    key: 'bm.savings-accounts.index',
                    label: 'List of Savings',
                    icon: <BarsOutlined />,
                },
                {
                    key: 'bm.pending-savings-account.index',
                    label: 'Pending Savings',
                    icon: <Loader size={16} />,
                },
            ]
        },
        {
            key: 'bm.members',
            icon: <UserOutlined />,
            label: 'Members/Borrower',
            children: [
                {
                    key: 'bm.members.index',
                    label: 'List of Members/Borrowers',
                    icon: <BarsOutlined />,
                },
                {
                    key: 'bm.pending-members.index',
                    label: 'Pending Members/Borrowers',
                    icon: <Loader size={16} />,
                },
            ]
        },
        {
            key: 'reports',
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
                                <div className='flex flex-col'>
                                    <div>
                                       {user.lname}, {user.fname ? user.fname[0] : ''} <span className='font-bold'>({user.role})</span>
                                    </div>
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
