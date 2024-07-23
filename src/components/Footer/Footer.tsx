import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";


const Footer = () => {
  return (

    <footer className="flex flex-col mt-5 font-sans tracking-wide bg-gray-50 px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        <div>
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />

          <ul className="mt-10 flex space-x-5">
            <p className="text-base text-black font-semibold">
              Carhub {new Date().getFullYear()} <br />
              All rights reserved &copy;
            </p>
          </ul>
        </div>

        {footerLinks?.map((link) => (
            <div key={link.title} className="flex flex-col gap-4 items-centers">
              <h3 className="text-gray-800 font-semibold text-lg relative">{link.title}</h3>
              <ul className="mt-6 space-y-5">
                <li className="flex flex-col gap-4">

                  {link?.links?.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-gray-500"
                    >
                      {item.title}
                    </Link>
                  ))}
                </li>
              </ul>
            </div>
        ))}

      </div>

      <hr className="my-4 border-gray-400" />

      <div className="flex flex-wrap max-md:flex-col gap-4">
        <ul className="md:flex md:space-x-6 max-md:space-y-2">
          <li>
            <Link
              href="/"
              className="text-gray-500"
            >
              Privacy & Policy
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="text-gray-500"
            >
              Terms & Condition
            </Link>
          </li>

        </ul>

        <p>&copy; {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>

 
  )
}

export default Footer
