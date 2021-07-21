const CracoLessPlugin = require("craco-less");
const { getThemeVariables } = require("antd/dist/theme");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // If you are using less-loader@5 please spread the lessOptions to options directly
            modifyVars: {
              ...getThemeVariables({
                dark: true, // Enable dark mode
                compact: true, // Enable compact mode
              }),
              "@primary-color": "#FF8000",
              "@body-background": "#4d4d4d",
              "@menu-background": "#1f1f1f",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
