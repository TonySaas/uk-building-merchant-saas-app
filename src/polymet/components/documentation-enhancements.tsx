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

interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

interface StateDefinition {
  name: string;
  type: string;
  initialValue: string;
  description: string;
}

interface ThemeVariation {
  name: string;
  description: string;
  properties: string[];
}

interface AccessibilityNote {
  type: string;
  description: string;
  importance: "critical" | "important" | "recommended";
}

interface DocumentationEnhancementsProps {
  componentName: string;
  propDefinitions?: PropDefinition[];
  stateDefinitions?: StateDefinition[];
  themeVariations?: ThemeVariation[];
  accessibilityNotes?: AccessibilityNote[];
}

export default function DocumentationEnhancements({
  componentName,
  propDefinitions = [],
  stateDefinitions = [],
  themeVariations = [],
  accessibilityNotes = [],
}: DocumentationEnhancementsProps) {
  const [openSections, setOpenSections] = useState<string[]>(["props"]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{componentName}</h2>
      </div>

      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={setOpenSections}
        className="w-full"
      >
        {propDefinitions.length > 0 && (
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
                  {propDefinitions.map((prop) => (
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
        )}

        {stateDefinitions.length > 0 && (
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
                  {stateDefinitions.map((state) => (
                    <TableRow key={state.name}>
                      <TableCell className="font-mono text-sm">
                        {state.name}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {state.type}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {state.initialValue}
                      </TableCell>
                      <TableCell>{state.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        )}

        {themeVariations.length > 0 && (
          <AccordionItem value="theme">
            <AccordionTrigger className="text-base font-medium">
              Theme Variations
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6">
                {themeVariations.map((theme, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium">{theme.name}</h3>
                    <p className="text-muted-foreground">{theme.description}</p>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Customizable Properties:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {theme.properties.map((property) => (
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

        {accessibilityNotes.length > 0 && (
          <AccordionItem value="accessibility">
            <AccordionTrigger className="text-base font-medium">
              Accessibility
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {accessibilityNotes.map((note, index) => {
                  const alertVariant =
                    note.importance === "critical"
                      ? "destructive"
                      : note.importance === "important"
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
                            {note.type}
                          </div>
                          <AlertDescription>
                            {note.description}
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
      </Accordion>
    </div>
  );
}
