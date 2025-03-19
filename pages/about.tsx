import { GetStaticProps } from "next";
import { getAllExecutiveMembers } from "@/lib/sanity/queries";
import { SanityMember } from "@/lib/types";
import { About } from "@/components/About";
import { MemberCard } from "@/components/About/MemberCard";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

interface AboutPageProps {
  executiveMembers: SanityMember[];
}

export default function AboutPage({ executiveMembers }: AboutPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">About UdemAI</h1>
            <p className="text-xl text-blue-700 mb-8">
              Building a community of AI enthusiasts at the University of Montreal
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <CardTitle className="text-2xl font-bold text-blue-900 mb-4">Our Mission</CardTitle>
                <CardDescription className="text-gray-700">
                  UdemAI is dedicated to fostering a vibrant community of AI enthusiasts at the University of Montreal.
                  We aim to democratize artificial intelligence education, facilitate knowledge exchange, and
                  provide hands-on opportunities for students to explore and contribute to the field of AI.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <CardTitle className="text-2xl font-bold text-blue-900 mb-4">Our Vision</CardTitle>
                <CardDescription className="text-gray-700">
                  We envision a university environment where every student, regardless of their background,
                  has access to quality AI education, mentorship, and collaborative opportunities.
                  Our goal is to become a hub for AI innovation, where ideas flourish and students develop
                  the skills needed to shape the future of technology.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <About 
        members={executiveMembers} 
        title="Meet the Team" 
        description="Get to know the passionate individuals driving our mission forward." 
      />
      
      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Values</h2>
            <p className="text-gray-700">
              These core principles guide everything we do at UdemAI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <CardTitle className="text-xl font-bold text-center mb-3">Inclusivity</CardTitle>
                <CardDescription className="text-gray-700 text-center">
                  We believe AI education should be accessible to everyone, regardless of background or prior experience.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <CardTitle className="text-xl font-bold text-center mb-3">Collaboration</CardTitle>
                <CardDescription className="text-gray-700 text-center">
                  We foster an environment where sharing ideas and working together leads to greater innovation.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <CardTitle className="text-xl font-bold text-center mb-3">Practical Learning</CardTitle>
                <CardDescription className="text-gray-700 text-center">
                  We emphasize hands-on experience and real-world applications of AI concepts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const executiveMembers = await getAllExecutiveMembers();

  return {
    props: {
      executiveMembers,
    },
    revalidate: 3600, // Revalidate every hour
  };
}; 