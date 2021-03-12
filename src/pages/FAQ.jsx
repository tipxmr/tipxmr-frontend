import { faqs } from "../data/faqdata";
import { Row, Col, Collapse, Typography } from "antd"

const { Title } = Typography
const { Panel } = Collapse

const handleChange = (key) => {
  console.log(key)
}

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

        {/* Q&A Block */}
        <Row justify="center" align="middle">
          <Col>
            <Collapse onChange={handleChange}>
              {faqs.map((faq, i) => (
                <Panel header={faq.question} key={i}><p>{faq.answer}</p></Panel>
              ))}
            </Collapse>
          </Col>
        </Row>

      </Col>
    </Row>
  );
}

export default FAQ;
