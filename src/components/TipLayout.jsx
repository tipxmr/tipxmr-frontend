import { Layout } from 'antd';
import { TipHeader, TipFooter } from './'
import '../styles/index.less'

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
