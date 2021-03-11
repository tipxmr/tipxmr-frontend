import { Row, Col, Typography, Input, Tooltip } from "antd";

const { Title } = Typography

const PickUserName = ({ onChange, isLoading, userNameError }) => {
    return (
        <div>
            <Row justify="center" align="middle">
                <Col span={20} style={{ "text-align": "center" }}>
                    <Title level={2}>Pick your username</Title>
                    <Tooltip title="This name cannot be changed later - choose wisely">
                        <Input onChange={onChange} disabled={isLoading} />
                    </Tooltip>
                    <p>{userNameError}</p>
                </Col>
            </Row>
        </div>

    );
}

export default PickUserName
