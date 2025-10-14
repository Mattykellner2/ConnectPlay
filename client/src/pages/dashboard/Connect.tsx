import { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import { useToast } from "@/hooks/use-toast";
import "@/styles/dashboard.css";
import "@/styles/speaker-connect.css";

export default function Connect() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "Dr. Jennifer Martinez",
    title: "Dean of Business",
    universityName: "The Ohio State University",
    department: "Fisher College of Business",
    programBio: "We're seeking industry professionals to share real-world insights with our MBA students, particularly in areas of digital transformation, entrepreneurship, and sustainable business practices.",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBrowseDirectory = () => {
    toast({
      title: "Opening Speaker Directory",
      description: "Browse our curated list of industry professionals.",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your university profile has been updated successfully.",
    });
  };

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <main className="main">
        <div className="speaker-connect-container">
          {/* Find Industry Leaders Card */}
          <div className="speaker-connect-hero">
            <div className="speaker-connect-hero-content">
              <h2 className="speaker-connect-hero-title">Find Industry Leaders</h2>
              <p className="speaker-connect-hero-description">
                Connect with verified professionals and thought leaders to bring real-world
                expertise to your students. Browse our curated directory of speakers across
                various industries and specializations.
              </p>
            </div>
            <button
              onClick={handleBrowseDirectory}
              className="speaker-connect-browse-btn"
              data-testid="button-browse-directory"
            >
              <Search className="w-5 h-5" />
              Browse Speaker Directory
            </button>
          </div>

          {/* University Profile Card */}
          <div className="speaker-connect-profile">
            <h3 className="speaker-connect-profile-title">University Profile</h3>
            <p className="speaker-connect-profile-subtitle">
              Complete your profile to help speakers understand your program's needs and goals.
            </p>

            <div className="speaker-connect-form">
              <div className="speaker-connect-field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  data-testid="input-full-name"
                />
              </div>

              <div className="speaker-connect-field">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  data-testid="input-title"
                />
              </div>

              <div className="speaker-connect-field">
                <label htmlFor="universityName">University Name</label>
                <input
                  id="universityName"
                  type="text"
                  value={formData.universityName}
                  onChange={(e) => handleInputChange("universityName", e.target.value)}
                  data-testid="input-university-name"
                />
              </div>

              <div className="speaker-connect-field">
                <label htmlFor="department">Department / School</label>
                <input
                  id="department"
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  data-testid="input-department"
                />
              </div>

              <div className="speaker-connect-field">
                <label htmlFor="programBio">Program Bio & Needs</label>
                <textarea
                  id="programBio"
                  rows={4}
                  value={formData.programBio}
                  onChange={(e) => handleInputChange("programBio", e.target.value)}
                  data-testid="textarea-program-bio"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                className="speaker-connect-save-btn"
                data-testid="button-save-profile"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
