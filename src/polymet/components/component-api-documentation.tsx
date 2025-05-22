import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

interface StateItem {
  name: string;
  type: string;
  initialValue: string;
  description: string;
}

interface ThemeOption {
  name: string;
  description: string;
  properties: string[];
}

interface AccessibilityItem {
  type: string;
  description: string;
  importance: "critical" | "important" | "recommended";
}

interface EventHandler {
  name: string;
  type: string;
  description: string;
  example?: string;
}

interface ComponentAPIDocumentationProps {
  componentName: string;
  description: string;
  props: PropDefinition[];
  state?: StateItem[];
  themeOptions?: ThemeOption[];
  accessibility?: AccessibilityItem[];
  eventHandlers?: EventHandler[];
  codeExample?: string;
  importStatement?: string;
}

export default function ComponentAPIDocumentation({
  componentName,
  description,
  props,
  state = [],
  themeOptions = [],
  accessibility = [],
  eventHandlers = [],
  codeExample,
  importStatement,
}: ComponentAPIDocumentationProps) {
  const [openSections, setOpenSections] = useState<string[]>(["props"]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{componentName}</h2>
          <Badge variant="outline" className="font-mono text-xs">
            Component
          </Badge>
        </div>
        <p className="text-muted-foreground">{description}</p>
        {importStatement && (
          <div className="mt-2 rounded-md bg-muted p-2 font-mono text-sm">
            {importStatement}
          </div>
        )}
      </div>

      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={setOpenSections}
        className="w-full"
      >
        <AccordionItem value="props">
          <AccordionTrigger className="text-base font-medium">
            Props
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Name</TableHead>
                  <TableHead className="w-[150px]">Type</TableHead>
                  <TableHead className="w-[100px]">Required</TableHead>
                  <TableHead className="w-[150px]">Default</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.map((prop) => (
                  <TableRow key={prop.name}>
                    <TableCell className="font-mono text-sm">
                      {prop.name}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {prop.type}
                    </TableCell>
                    <TableCell>{prop.required ? "Yes" : "No"}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {prop.defaultValue || "-"}
                    </TableCell>
                    <TableCell>{prop.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {eventHandlers.length > 0 && (
          <AccordionItem value="events">
            <AccordionTrigger className="text-base font-medium">
              Event Handlers
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Name</TableHead>
                    <TableHead className="w-[200px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventHandlers.map((event) => (
                    <TableRow key={event.name}>
                      <TableCell className="font-mono text-sm">
                        {event.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {event.type}
                      </TableCell>
                      <TableCell>
                        <div>
                          {event.description}
                          {event.example && (
                            <div className="mt-1 rounded bg-muted p-1 font-mono text-xs">
                              {event.example}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        )}

        {state.length > 0 && (
          <AccordionItem value="state">
            <AccordionTrigger className="text-base font-medium">
              State Management
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Name</TableHead>
                    <TableHead className="w-[150px]">Type</TableHead>
                    <TableHead className="w-[150px]">Initial Value</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-mono text-sm">
                        {item.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {item.type}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {item.initialValue}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        )}

        {themeOptions.length > 0 && (
          <AccordionItem value="theme">
            <AccordionTrigger className="text-base font-medium">
              Theme Customization
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6">
                {themeOptions.map((option, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium">{option.name}</h3>
                    <p className="text-muted-foreground">
                      {option.description}
                    </p>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Customizable Properties:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {option.properties.map((property) => (
                          <span
                            key={property}
                            className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium"
                          >
                            {property}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {accessibility.length > 0 && (
          <AccordionItem value="accessibility">
            <AccordionTrigger className="text-base font-medium">
              Accessibility
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {accessibility.map((item, index) => {
                  const alertVariant =
                    item.importance === "critical"
                      ? "destructive"
                      : item.importance === "important"
                        ? "default"
                        : "secondary";

                  return (
                    <Alert
                      key={index}
                      variant={
                        alertVariant as "default" | "destructive" | "secondary"
                      }
                    >
                      <div className="flex items-start gap-2">
                        <InfoIcon className="h-4 w-4 mt-0.5" />

                        <div>
                          <div className="font-medium capitalize mb-1">
                            {item.type}
                          </div>
                          <AlertDescription>
                            {item.description}
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {codeExample && (
          <AccordionItem value="example">
            <AccordionTrigger className="text-base font-medium">
              Usage Example
            </AccordionTrigger>
            <AccordionContent>
              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                  {codeExample}
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
