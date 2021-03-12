import { faqs } from "../data/faqdata";
import { Row, Col, Collapse, Typography } from "antd"

const { Title } = Typography
const { Panel } = Collapse


const FAQ = () => {
  return (
    <Row justify="center" align="middle">
      <Col span={24}>

        {/* Heading */}
        <Row justify="center" align="middle">
          <Col>
            <Title level={1}>Frequently Asked Questions</Title>
          </Col>
        </Row>

        {/* Q&A Blocks */}
        <Row justify="center" align="middle">
          <Col span={12}>
            <Collapse accordion={true}>
              {faqs.map((faq, i) => (
                <Panel header={<Title level={3}>{faq.question}</Title>} key={i}>
                  <Title level={5}> {faq.answer}</Title>
                </Panel>
              ))}
            </Collapse>
          </Col>
        </Row>

      </Col>
    </Row >
  );
}

export default FAQ;
