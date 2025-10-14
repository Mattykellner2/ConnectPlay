import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Users, Calendar, TrendingUp, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Mock professors data
const mockProfessors = [
  {
    id: "1",
    name: "Dr. Jennifer Martinez",
    email: "jmartinez@osu.edu",
    department: "College of Business",
    classes: 3,
    speakers: 5,
    engagementScore: 87,
  },
  {
    id: "2",
    name: "Dr. Michael Thompson",
    email: "mthompson@osu.edu",
    department: "Engineering",
    classes: 2,
    speakers: 3,
    engagementScore: 92,
  },
  {
    id: "3",
    name: "Prof. Sarah Williams",
    email: "swilliams@osu.edu",
    department: "College of Business",
    classes: 4,
    speakers: 7,
    engagementScore: 78,
  },
  {
    id: "4",
    name: "Dr. Robert Chen",
    email: "rchen@osu.edu",
    department: "Computer Science",
    classes: 3,
    speakers: 4,
    engagementScore: 85,
  },
];

const addProfessorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
});

type AddProfessorFormData = z.infer<typeof addProfessorSchema>;

export default function Professors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<AddProfessorFormData>({
    resolver: zodResolver(addProfessorSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
    },
  });

  const handleAddProfessor = (data: AddProfessorFormData) => {
    console.log('Adding professor:', data);
    toast({
      title: "Professor Added",
      description: `${data.name} has been added to your university.`,
    });
    setIsAddOpen(false);
    form.reset();
  };

  const filteredProfessors = mockProfessors.filter(prof => 
    prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ margin: "0 0 8px" }}>Professors</h2>
        <p style={{ color: "#64748B", margin: 0 }}>
          Manage professor accounts and view their analytics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card data-testid="card-total-professors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Professors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProfessors.length}</div>
            <p className="text-xs text-muted-foreground">
              Active faculty members
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-classes">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProfessors.reduce((sum, p) => sum + p.classes, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all professors
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-avg-engagement">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockProfessors.reduce((sum, p) => sum + p.engagementScore, 0) / mockProfessors.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Student participation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search professors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-professors"
          />
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button
              style={{ background: '#BB0000', borderColor: '#BB0000' }}
              data-testid="button-add-professor"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Professor
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-add-professor">
            <DialogHeader>
              <DialogTitle>Add New Professor</DialogTitle>
              <DialogDescription>
                Invite a faculty member to join ConnectPlay
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddProfessor)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Dr. Jane Smith" data-testid="input-professor-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="jsmith@university.edu" data-testid="input-professor-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-professor-department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="College of Business">College of Business</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Liberal Arts">Liberal Arts</SelectItem>
                          <SelectItem value="Sciences">Sciences</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddOpen(false)}
                    className="flex-1"
                    data-testid="button-cancel-add-professor"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    style={{ background: '#BB0000', borderColor: '#BB0000' }}
                    className="flex-1"
                    data-testid="button-submit-add-professor"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Professors Table */}
      <Card data-testid="card-professors-list">
        <CardHeader>
          <CardTitle>All Professors</CardTitle>
          <CardDescription>
            {filteredProfessors.length} faculty member{filteredProfessors.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b font-medium text-sm text-muted-foreground">
              <div className="col-span-3">Professor</div>
              <div className="col-span-3">Department</div>
              <div className="col-span-2 text-center">Classes</div>
              <div className="col-span-2 text-center">Speakers</div>
              <div className="col-span-2 text-center">Engagement</div>
            </div>

            {/* Table Rows */}
            {filteredProfessors.map((professor) => (
              <div
                key={professor.id}
                className="grid grid-cols-12 gap-4 py-3 items-center hover-elevate rounded-lg cursor-pointer"
                data-testid={`professor-row-${professor.id}`}
              >
                <div className="col-span-3">
                  <p className="font-medium">{professor.name}</p>
                  <p className="text-sm text-muted-foreground">{professor.email}</p>
                </div>
                <div className="col-span-3">
                  <Badge variant="outline">{professor.department}</Badge>
                </div>
                <div className="col-span-2 text-center font-medium">
                  {professor.classes}
                </div>
                <div className="col-span-2 text-center font-medium">
                  {professor.speakers}
                </div>
                <div className="col-span-2 text-center">
                  <Badge 
                    className={`${
                      professor.engagementScore >= 85 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                        : professor.engagementScore >= 70
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
                        : 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100'
                    }`}
                  >
                    {professor.engagementScore}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
