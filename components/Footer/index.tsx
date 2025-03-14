import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="container mx-auto bg-blue-50 mt-8">
      <div className="text-center border-t border-blue-100 py-8">
        <h3 className="text-xl text-blue-800">Important Links</h3>
        <div className="flex items-center justify-center my-4">
          <Link href="https://dev.to/jeffsalive" className="px-4 text-blue-600 hover:text-blue-800">
            Dev.to (Jeffrey)
          </Link>
          <Link href="https://twitter.com/JeffreySunny1" className="px-4 text-blue-600 hover:text-blue-800">
            Twitter
          </Link>
          <Link href="https://linkedin.com/in/jeffsalive" className="px-4 text-blue-600 hover:text-blue-800">
            LinkedIn
          </Link>
          <Link href="https://jeffreynwankwo.com" className="px-4 text-blue-600 hover:text-blue-800">
            Website
          </Link>
        </div>
        <small className="text-blue-700">Jeffrey &copy; {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
};
