import { GetStaticProps } from "next";
import { getAllExecutiveMembers } from "@/lib/sanity/queries";
import { SanityMember } from "@/lib/types";
import { About } from "@/components/About";
import { MemberCard } from "@/components/About/MemberCard";
import { Card, CardContent, CardDescription, CardTitle, CardBar } from "@/components/ui/card";

interface AboutPageProps {
  executiveMembers: SanityMember[];
}

export default function AboutPage({ executiveMembers }: AboutPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <CardTitle 
              colorScheme="default"
              size="lg" 
              className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-gray-50 mb-6"
            >
              About UdemAI
            </CardTitle>
            <CardBar colorScheme="primary" size="md" className="mb-8" />
            <CardDescription 
              colorScheme="muted"
              size="md"
              className="text-lg text-center max-w-3xl"
            >
              Building a community of AI enthusiasts at the University of Montreal
            </CardDescription>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <CardTitle 
              colorScheme="default"
              size="lg"
              className="text-4xl md:text-5xl font-bold text-center mb-6"
            >
              Mission & Vision
            </CardTitle>
            <CardBar colorScheme="primary" size="md" className="mb-8" />
            <CardDescription 
              colorScheme="muted"
              size="md"
              className="text-lg text-center max-w-3xl"
            >
              Our purpose and future direction as an organization
            </CardDescription>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card variant="default" size="lg" className="shadow-lg">
              <CardContent className="p-8">
                <CardBar colorScheme="primary" size="sm" className="mb-4" />
                <CardTitle 
                  colorScheme="primary"
                  size="md"
                  className="text-2xl font-bold mb-4"
                >
                  Our Mission
                </CardTitle>
                <CardDescription 
                  colorScheme="muted"
                  size="md"
                >
                  UdemAI is dedicated to fostering a vibrant community of AI enthusiasts at the University of Montreal.
                  We aim to democratize artificial intelligence education, facilitate knowledge exchange, and
                  provide hands-on opportunities for students to explore and contribute to the field of AI.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card variant="default" size="lg" className="shadow-lg">
              <CardContent className="p-8">
                <CardBar colorScheme="accent" size="sm" className="mb-4" />
                <CardTitle 
                  colorScheme="primary"
                  size="md"
                  className="text-2xl font-bold mb-4"
                >
                  Our Vision
                </CardTitle>
                <CardDescription 
                  colorScheme="muted"
                  size="md"
                >
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
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <CardTitle 
              colorScheme="default"
              size="lg"
              className="text-4xl md:text-5xl font-bold text-center mb-6"
            >
              Our Values
            </CardTitle>
            <CardBar colorScheme="primary" size="md" className="mb-8" />
            <CardDescription 
              colorScheme="muted"
              size="md"
              className="text-lg text-center max-w-3xl"
            >
              These core principles guide everything we do at UdemAI.
            </CardDescription>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="default" size="md" className="shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">1</span>
                </div>
                <CardBar colorScheme="primary" size="sm" className="mb-4 mx-auto" />
                <CardTitle 
                  colorScheme="default"
                  size="md"
                  className="text-xl font-bold text-center mb-3"
                >
                  Inclusivity
                </CardTitle>
                <CardDescription 
                  colorScheme="muted"
                  size="sm"
                  className="text-center"
                >
                  We believe AI education should be accessible to everyone, regardless of background or prior experience.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card variant="default" size="md" className="shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">2</span>
                </div>
                <CardBar colorScheme="accent" size="sm" className="mb-4 mx-auto" />
                <CardTitle 
                  colorScheme="default"
                  size="md"
                  className="text-xl font-bold text-center mb-3"
                >
                  Collaboration
                </CardTitle>
                <CardDescription 
                  colorScheme="muted"
                  size="sm"
                  className="text-center"
                >
                  We foster an environment where sharing ideas and working together leads to greater innovation.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card variant="default" size="md" className="shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">3</span>
                </div>
                <CardBar colorScheme="success" size="sm" className="mb-4 mx-auto" />
                <CardTitle 
                  colorScheme="default"
                  size="md"
                  className="text-xl font-bold text-center mb-3"
                >
                  Practical Learning
                </CardTitle>
                <CardDescription 
                  colorScheme="muted"
                  size="sm"
                  className="text-center"
                >
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