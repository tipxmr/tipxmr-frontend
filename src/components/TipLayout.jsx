import { Layout } from 'antd';
import { TipHeader, TipFooter } from '/src/components'
import './styles/TipLayout.css'

const { Content } = Layout;

const TipLayout = ({ props }) => {
    return (
        <Layout class="Layout-bg">
            <TipHeader userName="Tester" />
            <Content>{props.children}</Content>
            <TipFooter />
        </Layout >
    )
}

export default TipLayout
