import { useState } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function EmptySpeakers() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h3>Guest Speaker History</h3>
      <p style={{ color: "#64748B", margin: "8px 0 14px" }}>
        No speakers yet. Book a speaker to get started.
      </p>
      <button 
        className="btn-red" 
        onClick={() => setLocation("/universities/dashboard/speakers/new")}
        data-testid="button-book-speaker"
      >
        + Book New Speaker
      </button>
    </div>
  );
}

export function EmptyStudents() {
  const [, setLocation] = useLocation();
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [manualEmails, setManualEmails] = useState("");
  const { toast } = useToast();

  const handleCSVImport = () => {
    if (!csvFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Import Started",
      description: `Processing ${csvFile.name}...`,
    });

    // TODO: Handle CSV parsing and import
    setTimeout(() => {
      toast({
        title: "Import Complete",
        description: "Student roster has been imported successfully",
      });
      setIsImportOpen(false);
      setCsvFile(null);
    }, 1500);
  };

  const handleManualImport = () => {
    const emails = manualEmails.split('\n').filter(e => e.trim());
    if (emails.length === 0) {
      toast({
        title: "No emails entered",
        description: "Please enter at least one email address",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Import Complete",
      description: `${emails.length} students have been added`,
    });

    setIsImportOpen(false);
    setManualEmails("");
  };
  
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h3>Student Cohort Management</h3>
      <p style={{ color: "#64748B", margin: "8px 0 14px" }}>
        No cohorts yet. Create your first class.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button 
          className="btn-red" 
          onClick={() => setLocation("/universities/dashboard/students/new")}
          data-testid="button-create-class"
        >
          + Create Class
        </button>
        
        <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
          <DialogTrigger asChild>
            <button 
              className="btn-red" 
              data-testid="button-import-roster"
            >
              Import Roster
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]" data-testid="dialog-import-roster">
            <DialogHeader>
              <DialogTitle>Import Student Roster</DialogTitle>
              <DialogDescription>
                Upload a CSV file or manually enter student emails
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="csv" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="csv" data-testid="tab-csv-import">
                  <Upload size={16} style={{ marginRight: 8 }} />
                  CSV Upload
                </TabsTrigger>
                <TabsTrigger value="manual" data-testid="tab-manual-import">
                  <UserPlus size={16} style={{ marginRight: 8 }} />
                  Manual Entry
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="csv" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="csv-file">Select CSV File</Label>
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                    data-testid="input-csv-file"
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    CSV should include: Name, Email, Student ID
                  </p>
                </div>
                <Button
                  onClick={handleCSVImport}
                  style={{ background: '#BB0000', borderColor: '#BB0000' }}
                  className="w-full"
                  data-testid="button-upload-csv"
                >
                  Import CSV
                </Button>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="manual-emails">Student Emails</Label>
                  <Textarea
                    id="manual-emails"
                    value={manualEmails}
                    onChange={(e) => setManualEmails(e.target.value)}
                    placeholder="student1@university.edu&#10;student2@university.edu&#10;student3@university.edu"
                    rows={8}
                    data-testid="textarea-manual-emails"
                    className="mt-2 font-mono"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter one email per line
                  </p>
                </div>
                <Button
                  onClick={handleManualImport}
                  style={{ background: '#BB0000', borderColor: '#BB0000' }}
                  className="w-full"
                  data-testid="button-import-manual"
                >
                  Add Students
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export function EmptyAccessCodes() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h3>Access Code Management</h3>
      <p style={{ color: "#64748B", margin: "8px 0 14px" }}>
        No codes yet. Create access codes for your classes.
      </p>
      <button 
        className="btn-red" 
        onClick={() => setLocation("/universities/dashboard/access-codes/new")}
        data-testid="button-create-codes"
      >
        + Create New Codes
      </button>
    </div>
  );
}
