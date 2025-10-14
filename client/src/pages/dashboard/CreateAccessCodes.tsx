import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const createAccessCodesSchema = z.object({
  classId: z.string().min(1, "Please select a class"),
  codePrefix: z.string().min(1, "Code prefix is required").max(10, "Prefix must be 10 characters or less"),
  numberOfCodes: z.string().min(1, "Number of codes is required"),
  expiryDate: z.string().optional(),
});

type CreateAccessCodesFormData = z.infer<typeof createAccessCodesSchema>;

export default function CreateAccessCodes() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const form = useForm<CreateAccessCodesFormData>({
    resolver: zodResolver(createAccessCodesSchema),
    defaultValues: {
      classId: "",
      codePrefix: "",
      numberOfCodes: "",
      expiryDate: "",
    },
  });

  const generateRandomCode = (prefix: string) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${code}`;
  };

  const handleSubmit = (data: CreateAccessCodesFormData) => {
    const numCodes = parseInt(data.numberOfCodes);
    const codes = Array.from({ length: numCodes }, () => generateRandomCode(data.codePrefix.toUpperCase()));
    
    setGeneratedCodes(codes);
    
    toast({
      title: "Access Codes Generated!",
      description: `${numCodes} codes have been created successfully.`,
    });
  };

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast({
      title: "Copied!",
      description: "Access code copied to clipboard",
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllCodes = () => {
    const allCodes = generatedCodes.join('\n');
    navigator.clipboard.writeText(allCodes);
    toast({
      title: "All Codes Copied!",
      description: `${generatedCodes.length} codes copied to clipboard`,
    });
  };

  return (
    <div className="panel">
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => setLocation("/universities/dashboard/access-codes")}
          className="btn-link"
          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}
          data-testid="button-back-to-codes"
        >
          <ArrowLeft size={16} />
          Back to Access Codes
        </button>
        <h2 style={{ margin: "0 0 8px" }}>Create Access Codes</h2>
        <p style={{ color: "#64748B", margin: 0 }}>
          Generate unique access codes for your students
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="classId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Class</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-class">
                      <SelectValue placeholder="Choose a class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="class-1">Business Analytics 101 - Fall 2024</SelectItem>
                    <SelectItem value="class-2">Marketing Strategy - Spring 2025</SelectItem>
                    <SelectItem value="class-3">Operations Management - Fall 2024</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Students will use these codes to access ConnectPlay
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="codePrefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Prefix</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="e.g., OSU or BUS101" 
                      maxLength={10}
                      data-testid="input-code-prefix"
                      style={{ textTransform: 'uppercase' }}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                    />
                  </FormControl>
                  <FormDescription>
                    Short identifier for your institution or class
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfCodes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Codes</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-number-codes">
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10">10 codes</SelectItem>
                      <SelectItem value="25">25 codes</SelectItem>
                      <SelectItem value="50">50 codes</SelectItem>
                      <SelectItem value="100">100 codes</SelectItem>
                      <SelectItem value="200">200 codes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="date" 
                    data-testid="input-expiry-date"
                  />
                </FormControl>
                <FormDescription>
                  Leave blank for no expiration
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/universities/dashboard/access-codes")}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              style={{ background: '#BB0000', borderColor: '#BB0000' }}
              data-testid="button-generate-codes"
            >
              Generate Codes
            </Button>
          </div>
        </form>
      </Form>

      {generatedCodes.length > 0 && (
        <div style={{ marginTop: 32, padding: 24, background: '#F8FAFC', borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0 }}>Generated Access Codes</h3>
            <Button
              onClick={copyAllCodes}
              variant="outline"
              size="sm"
              data-testid="button-copy-all-codes"
            >
              <Copy size={16} style={{ marginRight: 8 }} />
              Copy All
            </Button>
          </div>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {generatedCodes.map((code, index) => (
              <div 
                key={index}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: 6,
                  marginBottom: 8,
                  fontFamily: 'monospace',
                  fontSize: 14
                }}
                data-testid={`code-item-${index}`}
              >
                <span>{code}</span>
                <button
                  onClick={() => copyCode(code, index)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#64748B'
                  }}
                  data-testid={`button-copy-code-${index}`}
                >
                  {copiedIndex === index ? (
                    <Check size={16} style={{ color: '#22C55E' }} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, color: '#64748B', fontSize: 14 }}>
            Distribute these codes to your students for ConnectPlay access
          </p>
        </div>
      )}
    </div>
  );
}
