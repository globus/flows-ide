export type FlowDefinition = {
  States: {
    [key: string]: {
      Type:
        | "Action"
        | "Choice"
        | "Fail"
        | "Pass"
        | "ExpressionEval"
        | "Wait"
        | "AwaitWebInput"
        | "CreateWebInput"
        | string;
      Next?: string;
      End?: boolean;
      Comment?: string;
      Default?: string;
      Catch?: {
        ErrorEquals?: string[];
        Next?: string;
        ResultPath?: string;
      }[];
      Choices?: {
        Next?: string;
      }[];
      [key: string]: any;
    };
  };
  StartAt: string;
  Comment?: string;
};
