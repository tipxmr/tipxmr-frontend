import "../src/styles/index.less";
// import { addDecorator } from "@storybook/react";
// import { BrowserRouter as Router } from "react-router-dom";
// import '!style-loader!css-loader!less-loader!../src/styles/index.less'

// addDecorator((story) => <Router initialEntires={["/"]}>{story()}</Router>);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
