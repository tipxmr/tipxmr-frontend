import { Layout, Row, Col } from 'antd';
import { TipHeader, TipFooter } from './'
import '../styles/index.less'

const { Content } = Layout;

const TipLayout = ({ children }) => {
    return (
        <Layout>
            <TipHeader userName="Tester" />
            <div className="content-container">
                <Content>{children}</Content>
            </div>
            <TipFooter />
        </Layout >
    )
}

export default TipLayout
