export type TimelineEventType =
  | "prompt"
  | "decision"
  | "code_change"
  | "blocker"
  | "fix"
  | "commit"
  | "outcome";

export type TimelineEvent = {
  id: string;
  order: number;
  type: TimelineEventType;
  title: string;
  description: string;
  source?: string;
};

export type BuildRecap = {
  sessionTitle: string;
  summary: string;
  timeline: TimelineEvent[];
  decisions: string[];
  blockers: string[];
  nextSteps: string[];
  builderTakeaways?: string[];
  publishOutputs: {
    linkedInPost: string;
    readmeRecap: string;
    demoScript: string;
    builderReflection: string;
  };
};
