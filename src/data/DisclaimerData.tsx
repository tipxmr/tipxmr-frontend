import { Typography } from "antd";

const { Link } = Typography;

export const tips = [
  {
    title: "Tip 1: Keep your seedphrase save",
    description: (
      <div>
        {" "}
        Never EVER lose your seed phrase and keep it secret.These are the keys
        to your wallet, whoever has access can spend your money.Write the 25
        words down on a{" "}
        <Link
          href="https://www.monero.how/monero-paper-wallet-offline-cold-storage"
          target="_blank"
        >
          {" "}
          piece of paper
        </Link>{" "}
        and store it securely.
      </div>
    ),
  },
  {
    title: "Tip 2: Keep your computer free of malware",
    description: (
      <div>
        It should go without saying, but just to be clear: If you use a
        compromised computer to log into the browser wallet, your funds are at
        risk of being stolen. Therefore, best take steps to ensure your computer
        is virus-free.
      </div>
    ),
  },
  {
    title:
      "Tip 3: For your other wallets, only use software endorsed by the Monero Project",
    description: (
      <div>
        There are many wallets out there and not all of them are honest. Before
        entering a seed into foreign software, check with the{" "}
        <Link href="https://getmonero.org/downloads">Monero website</Link> or{" "}
        <Link href="https://www.reddit.com/r/Monero/">Subreddit</Link> to see
        other people experience. We recommend using{" "}
        <Link href="https://cakewallet.com/">CakeWallet</Link> or{" "}
        <Link href="https://www.monerujo.io/">Monerujo</Link>.
      </div>
    ),
  },
  {
    title: "Tip 4: Ensure SSL certificates when logging in",
    description: (
      <div>
        Before entering your seed into the browser on{" "}
        <Link href="https://tipxmr.live/">https://tipxmr.live/</Link> make sure
        that the address is indeed correct and that the website is served
        correctly by clicking the 🔒 lock icon.
      </div>
    ),
  },
];
