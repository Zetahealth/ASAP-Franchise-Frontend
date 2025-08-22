import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import SavedFranchisesList from "../components/SavedFranchisesList";
import InquiryList from "../components/InquiryList";
import SettingsSection from "../components/SettingsSection";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {

    const navigate = useNavigate();

    const [user] = useState({

        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "john.doe@example.com",
        phone: "+1 555 123 4567",
        country: "United States",
        role: "admin",
        avatar: "https://via.placeholder.com/80?text=JD", // Avatar placeholder
        savedFranchises: [
            {
                name: "Urban Coffee Co.",
                location: "West Coast",
                investment: "$150K - $300K",
                roi: "15-20% ROI",
                roiColor: "bg-green-200 text-green-800",
                image: "https://source.unsplash.com/featured/?coffee",
                rating: 4,
            },
            {
                name: "TechWorld Franchise",
                location: "New Delhi",
                investment: "$200K - $400K",
                roi: "18-22% ROI",
                roiColor: "bg-green-100 text-green-700",
                image: "https://source.unsplash.com/featured/?technology",
                rating: 5,
            },
        ],
        // ✅ Dummy inquiries with full email-style conversations
        inquiries: [
            {
                id: 1,
                franchise: "Urban Coffee Co.",
                subject: "Application for Franchise Partnership – Bangalore",
                status: "Pending",
                messages: [
                    {
                        sender: "user",
                        text: `Dear Urban Coffee Team,

I am highly interested in bringing *Urban Coffee Co.* to Bangalore. I have experience running F&B businesses and believe Bangalore’s market is an excellent fit for your brand.

Could you please provide me with:
- Detailed investment requirements  
- Expected ROI in the first 2 years  
- Support provided by your team for new partners  

Looking forward to your response.

Best regards,  
Ravi Kiran`,
                        date: "Aug 15, 2025, 10:30 AM",
                    },
                    {
                        sender: "franchise",
                        text: `Dear Ravi,

Thank you for reaching out and for your interest in Urban Coffee Co. We are currently reviewing your inquiry. Our partnership team will share a detailed investment prospectus and market suitability analysis with you shortly.

We appreciate your patience and will get back to you soon.

Warm regards,  
Urban Coffee Co. – Franchise Team`,
                        date: "Aug 15, 2025, 11:00 AM",
                    },
                ],
            },
            {
                id: 2,
                franchise: "TechWorld Franchise",
                subject: "Franchise Inquiry – Investment & Support Model",
                status: "Replied",
                messages: [
                    {
                        sender: "user",
                        text: `Dear TechWorld Team,

I came across TechWorld Franchise opportunities and I am very interested in exploring the possibility of setting up a branch in Hyderabad.  

Could you kindly share more details about:
1. The investment model (upfront and ongoing costs)  
2. Training & onboarding support provided  
3. Marketing assistance for local promotions  

Thank you in advance for your guidance.  

Sincerely,  
Ravi Kiran`,
                        date: "Aug 12, 2025, 09:20 AM",
                    },
                    {
                        sender: "franchise",
                        text: `Dear Ravi,

Thank you for your interest in partnering with TechWorld. We are delighted to inform you that we provide:
- Full **technical training** for staff (2 weeks intensive program)  
- **Marketing materials & campaigns** tailored to your location  
- Ongoing **24/7 support** from our regional managers  

Please find attached the initial franchise brochure and financial model for your reference.  

We look forward to discussing this further with you.  

Best regards,  
TechWorld Franchise Development Team`,
                        date: "Aug 12, 2025, 10:05 AM",
                        attachments: [
                            {
                                name: "TechWorld_Financial_Model.pdf",
                                size: "245 KB",
                                url: "#", // can be replaced with real file link
                            },
                            {
                                name: "Franchise_Brochure.pdf",
                                size: "1.2 MB",
                                url: "#",
                            },
                        ],
                    },
                ],
            },
        ]


    });

    const handleNavigate = (franchise) => {
        navigate("/business-overview", { state: { franchise } });
    };

    const handleUpdateUser = (updatedData) => {
        setUser({ ...user, ...updatedData });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-3">
            <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow p-6">
                <ProfileCard user={user} onUpdateUser={handleUpdateUser} />
                <SavedFranchisesList
                    savedFranchises={user.savedFranchises}
                    onNavigate={handleNavigate}
                />
                {/* Franchise Inquiries */}
                <InquiryList inquiries={user.inquiries} />
                <SettingsSection />
            </div>
        </div>
    );
};

export default UserAccount;
