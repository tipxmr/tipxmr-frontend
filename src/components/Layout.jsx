import { Layout, Menu, Row, Col } from 'antd';
import TipHeader from './Header'

// const { Header, Footer, Content } = Layout;
const { Footer, Content } = Layout;

function TipLayout() {
    return (
        <Layout>
            <TipHeader userName="Tester">Something</TipHeader>
            <Content>This is some awesome Content</Content>
            <Footer>This is a footer</Footer>
        </Layout >
    )
}

export default TipLayout
