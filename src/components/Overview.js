import React, { useState } from "react";

function Overview() {
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
    <div className="">
      <div className="grid grid-cols-3 gap-12">
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Your Balance</p>
            <div className="text-4xl my-2">1337 XMR</div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Total Donations</p>
            <div className="text-4xl my-2">420</div>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg text-center bg-xmrgray-darker text-xmrorange-lighter">
          <div className="px-4 py-6">
            <p>Last Month</p>
            <div className="text-4xl my-2">123,1115710237 XMR</div>
          </div>
        </div>
      </div>
      <div className="mt-12 mx-auto w-3/4">
        <h2 className="text-3xl text-center my-3">Most recent Donations</h2>
        {/* Dynamische Tabelle nach dieser Anleitung */}
        <table className="table-auto border border-4 mx-auto">
          <thead>
            <tr className="text-xl">
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {console.log(item.id)}
                <td className="border px-4 py-2">{item.donor}</td>
                <td className="border px-4 py-2">{item.message}</td>
                <td className="border px-4 py-2">{item.amount} XMR</td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Overview;
