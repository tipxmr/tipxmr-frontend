import { Layout } from 'antd';
import TipHeader from './Header'
import TipFooter from "./Footer"

const { Content } = Layout;

function TipLayout(props) {
    return (
        <Layout>
            <TipHeader userName="Tester" />
            <Content>{props.children}</Content>
            <TipFooter />
        </Layout >
    )
}

export default TipLayout
