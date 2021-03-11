import { Layout } from 'antd';
import TipHeader from './Header'
import TipFooter from "./Footer"

const { Content } = Layout;

function TipLayout(props) {
    return (
        <Layout style={{ "background-color": "#4d4d4d" }}>
            <TipHeader userName="Tester" />
            <Content>{props.children}</Content>
            <TipFooter />
        </Layout >
    )
}

export default TipLayout
