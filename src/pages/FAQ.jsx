import { Faqblock } from "../components";
import { faqs } from "../data/faqdata";
import { Row, Col, Collapse, Typography } from "antd"

const { Panel } = Collapse
const { Title } = Typography

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

          </Col>
        </Row>

      </Col>
    </Row>

    // <div className="flex flex-grow justify-center text-gray-200">
    //   <div className="my-auto w-5/6 lg:w-1/2">
    //     <div>
    //       <h2 className="text-3xl text-center underline mb-4">
    //         Frequently Asked Questions
    //       </h2>
    //     </div>
    //     <div>
    //       {faqs.map((faq, i) => (
    //         <Faqblock question={faq.question} key={i}>
    //           {faq.answer}
    //         </Faqblock>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}

export default FAQ;
