"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BuildRecap } from "@/lib/types";

interface PublishOutputTabsProps {
  publishOutputs: BuildRecap["publishOutputs"];
}

const tabs = [
  {
    value: "linkedin",
    label: "LinkedIn Post",
    helper: "Ready to paste into LinkedIn. Edit the hashtags for your audience.",
  },
  {
    value: "readme",
    label: "README Recap",
    helper: "Drop into your project README or GitHub repository description.",
  },
  {
    value: "demo",
    label: "Demo Script",
    helper: "Your 2-minute walkthrough, ready to rehearse or present live.",
  },
  {
    value: "reflection",
    label: "Builder Reflection",
    helper: "What you built, what you learned, and what surprised you.",
  },
] as const;

export default function PublishOutputTabs({ publishOutputs }: PublishOutputTabsProps) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-foreground">
          Your build story is ready.
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Copy it. Share it. Document it. Own it. Four formats, ready to paste.
        </p>
      </div>

      <Tabs defaultValue="linkedin">
        <TabsList className="mb-4 flex-wrap h-auto gap-1">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="linkedin">
          <OutputPanel content={publishOutputs.linkedInPost} helper={tabs[0].helper} />
        </TabsContent>
        <TabsContent value="readme">
          <OutputPanel content={publishOutputs.readmeRecap} helper={tabs[1].helper} />
        </TabsContent>
        <TabsContent value="demo">
          <OutputPanel content={publishOutputs.demoScript} helper={tabs[2].helper} />
        </TabsContent>
        <TabsContent value="reflection">
          <OutputPanel content={publishOutputs.builderReflection} helper={tabs[3].helper} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function OutputPanel({ content, helper }: { content: string; helper: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      const el = document.createElement("textarea");
      el.value = content;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background/40">
        <span className="text-xs text-muted-foreground">{helper}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className={`h-7 px-3 text-xs transition-colors ${
            copied
              ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
              : ""
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <div className="px-4 py-4 max-h-96 overflow-y-auto">
        <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );
}
