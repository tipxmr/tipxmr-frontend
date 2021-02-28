import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function Layout() {
    return (
        <Layout>
            <Header>This is a header</Header>
            <Content>This is some awesome Content</Content>
            <Footer>This is a footer</Footer>
        </Layout >
    )
}

export default Layout
