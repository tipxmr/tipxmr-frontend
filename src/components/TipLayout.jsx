import { Layout } from 'antd';
import { TipHeader, TipFooter } from './'
import '../styles/index.less'
import { gray } from "@ant-design/colors"

const { Content } = Layout;

const TipLayout = ({ children }) => {
    return (
        <Layout>
            <TipHeader userName="Tester" />
            <Content>{children}</Content>
            <TipFooter />
        </Layout >
    )
}

export default TipLayout
