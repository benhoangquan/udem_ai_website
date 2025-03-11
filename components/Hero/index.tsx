import Link from "next/link";

export const Hero = () => {
  return (
    <section className="border-b">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-2xl md:text-4xl">
            <strong>Welcome to UdemAI</strong>. <br />
            Let's learn, build and transform AI together. <br />
            Proudly @ University of Montreal
          </h1>
        </div>
      </div>
    </section>
  );
};
