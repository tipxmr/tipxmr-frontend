import { Row, Col, Typography, Divider, List } from "antd"

const { Title, Link, Text } = Typography
const tips = [{
  title: "Tip 1: Keep your seedphrase save",
  description: <div> Never EVER lose your seed phrase and keep it secret.These are the keys to your wallet, whoever has access can spend your money.Write the 25 words down on a <Link href='https://www.monero.how/monero-paper-wallet-offline-cold-storage' target='_blank'> piece of paper</Link> and store it securely.</div>,
},
{
  title: "Tip 2: Keep your computer free of malware",
  description: <div>It should go without saying, but just to be clear: If you use a compromised computer to log into the browser wallet, your funds are at risk of being stolen. Therefore, best take steps to ensure your computer is virus-free.</div>,
},
{
  title: "Tip 3: For your other wallets, only use software endorsed by the Monero Project",
  description: <div>There are many wallets out there and not all of them are honest. Before entering a seed into foreign software, check with the <Link href="https://getmonero.org/downloads">Monero website</Link> or <Link href="https://www.reddit.com/r/Monero/">Subreddit</Link> to see other people experience. We recommend using <Link href="https://cakewallet.com/">CakeWallet</Link> or <Link href="https://www.monerujo.io/">Monerujo</Link>.</div>
},
{
  title: "Tip 4: Ensure SSL certificates when logging in",
  description: <div>Before entering your seed into the browser on <Link href="https://tipxmr.live/">https://tipxmr.live/</Link> make sure that the address is indeed correct and that the website is served correctly by clicking the 🔒 lock icon.</div>
}
]

const Disclaimer = () => {
  return (
    <Row justify="center" align="center">
      <Col span={24}>

        {/* Heading */}
        <Row justify="center" align="center">
          <Col>
            <Title level={1}>Introduction & Disclaimer</Title>
          </Col>
        </Row>

        {/* About Monero */}
        <Row justify="center" align="center" style={{ "text-align": "center" }}>
          <Col span={8}>
            <p>Monero (XMR) is a cryptocurrency, in many ways similiar to Bitcoin.
          However, the main difference to Bitcoin is that{" "}<em>every transaction in Monero is private</em>.</p>

            <Divider />

            <p>This means that the sender, reciever and the amount of ever
            transaction are hidden with cryptographic techniques. While it is
            fascinating to some to learn about how Monero works, it is not
            required to be able to use it. Just like most drivers don't understand
            the internals of the combustion engine.</p>
          </Col>
        </Row>

        {/* Important Box */}
        <Row justify="center" align="center">
          <Col span={10}>
            <Divider />
            <Title level={2}>
              <Text underline>Important:</Text>
            </Title>
            <p>At no point in time tipxmr.live has access to your Monero. We cannot spend it and we cannot guarantee it's safety. While the Monero protocol is very secure itself, your safety is your responsiblity.</p>
          </Col>
        </Row>

        {/* Safety Tipx */}
        <Row justify="center" align="center">
          <Col span={12}>
            <Divider />
            <Title level={2}>Tips for your safety:</Title>
            <List
              itemLayout="horizontal"
              dataSource={tips}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<Title level={4}>{item.title}</Title>}
                    description={<p>{item.description}</p>}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>

      </Col>
    </Row>
  );
}

export default Disclaimer;
