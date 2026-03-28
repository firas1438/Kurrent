import { DribbbleIcon, GithubIcon, LinkedinIcon, MailIcon, } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Logo from "../logo";

const footerLinks = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
  {
    title: "Testimonials",
    href: "#testimonials",
  },
  {
    title: "CTA",
    href: "#cta",
  },
];

const Footer = () => {
  return (
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-0.5 sm:px-10 md:px-0 lg:px-4 ">
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-10 px-6 py-12 sm:flex-row xl:px-0">
            <div>
              {/* Logo */}
              <Logo/>

              <ul className="mt-6 grid grid-cols-1 md:flex md:flex-wrap items-center gap-2 md:gap-4">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link className="text-muted-foreground text-sm hover:text-foreground" href={href}>
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div className="w-full max-w-xs">
              <h6 className="font-medium">Contact Info</h6>
              <Link href="mailto:benalifiras1438@gmail.com"
                className="mt-6 flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                <MailIcon className="w-5 h-5"/> 
                benalifiras1438@gmail.com
              </Link>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} {" "}
              Kurrent. All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <Link href="https://firasbenali.vercel.app/" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/firasbenali/" target="_blank">
                <LinkedinIcon className="h-5 w-5" />
              </Link>
              <Link href="https://github.com/firas1438/" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
