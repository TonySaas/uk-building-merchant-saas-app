import ComponentAPIDocumentation from "@/polymet/components/component-api-documentation";

interface ComponentAPIData {
  componentName: string;
  description: string;
  props: {
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description: string;
  }[];
  state?: {
    name: string;
    type: string;
    initialValue: string;
    description: string;
  }[];
  themeOptions?: {
    name: string;
    description: string;
    properties: string[];
  }[];
  accessibility?: {
    type: string;
    description: string;
    importance: "critical" | "important" | "recommended";
  }[];
  eventHandlers?: {
    name: string;
    type: string;
    description: string;
    example?: string;
  }[];
  codeExample?: string;
  importStatement?: string;
}

interface ComponentAPISection {
  componentData: ComponentAPIData;
}

export default function ComponentAPISection({
  componentData,
}: ComponentAPISection) {
  return (
    <div className="py-6 border-t border-border">
      <h2 className="text-xl font-semibold mb-4">Component API</h2>
      <ComponentAPIDocumentation
        componentName={componentData.componentName}
        description={componentData.description}
        props={componentData.props}
        state={componentData.state}
        themeOptions={componentData.themeOptions}
        accessibility={componentData.accessibility}
        eventHandlers={componentData.eventHandlers}
        codeExample={componentData.codeExample}
        importStatement={componentData.importStatement}
      />
    </div>
  );
}
