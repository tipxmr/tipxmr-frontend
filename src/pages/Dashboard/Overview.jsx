import { useState } from "react";
import { SyncBanner, StatBox } from "../../components";

const Overview = () => {
  const [isSynced, setIsSynced] = useState(false);

  const [data, setData] = useState([
    {
      id: 1,
      donor: "Fluffypony",
      message:
        "Hey Guys, I really like this project. I wish I would have thought of that!",
      amount: "501",
    },
    {
      id: 2121,
      donor: "Nicolas van Saberhagen",
      message: "I am not the creator of Monero, but I wish I was!",
      amount: "420",
    },
    {
      id: 10231,
      donor: "AlexAnarcho",
      message: "Just awesome",
      amount: "0,000501",
    },
    {
      id: 91234,
      donor: "N00b_Styler",
      message:
        "Ich hab, ich hab, ich hab STYLE UND DAS GELD. ICH HAB ALL DAS - na ihr wisst schon",
      amount: "0,1231",
    },
  ]);
  return (
    <div className="h-full text-gray-200 ">
      <div className="w-1/2 mx-auto mb-4 text-center">
        <SyncBanner synced={isSynced} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* TODO Make the info in the boxes dynamic */}
        <StatBox boxTitle="Your Balance" boxStat="1337 XMR" />
        <StatBox boxTitle="Total Donations" boxStat="1337 XMR" />
        <StatBox boxTitle="Last Month" boxStat="&#8773;1337 XMR" />
      </div>
      <div className="mt-12 mx-auto w-3/4">
        <h2 className="text-3xl text-center my-3">Most recent Donations</h2>
        {/* Dynamische Tabelle nach dieser Anleitung */}
        <table className="table-auto border-4 overflow-hidden mx-auto">
          <thead>
            <tr className="text-xl">
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2 truncate">Message</th>
              <th className="px-4 py-2 border-r-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-2">
                <td className="px-4 py-2">{item.donor}</td>
                <td className="px-4 py-2">{item.message}</td>
                <td className="px-4 py-2 md:w-16">{item.amount} XMR</td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
