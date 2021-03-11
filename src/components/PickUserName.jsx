import { Row, Col, Typography, Input } from "antd";
import './styles/PickUserName.css';

const { Title } = Typography

const PickUserName = ({ onChange, isLoading, userNameError }) => {
    return (
        <div>
            <Row justify="center" align="middle">
                <Col span={20} style={{ "text-align": "center" }}>
                    <Title level={2}>Pick your username</Title>
                    <Input onChange={onChange} disabled={isLoading} />
                    <p className="error-style-1">{userNameError}</p>
                    <p className="error-style-2">
                        This name cannot be changed once chosen
                        </p>

                </Col>
            </Row>
        </div>

    );
}

export default PickUserName
