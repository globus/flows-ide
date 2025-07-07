/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "flows-ide",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.StaticSite("FlowsIDE", {
      environment: {
        NEXT_PUBLIC_BASE_PATH: "",
      },
      build: {
        command: "npm run build",
        output: "out",
      },
    });
  },
});
