import { DevIcon } from "@/app/components/icons/sidebar/dev-icon";
import { footerData } from "./mockData";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-8 md:grid-cols-9 gap-8">
          <div className="col-span-8 sm:col-span-4 md:col-span-3">
            <div className="flex justify-center sm:justify-start">
              <Image
                src={footerData?.logo}
                alt="Logo"
                width={120}
                height={40}
              />
            </div>
            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              {footerData?.description}
            </p>
          </div>

          {footerData?.categories &&
            footerData?.categories.map((category, index) => (
              <div
                key={index}
                className="text-center sm:text-left col-span-8 sm:col-span-4 md:col-span-2"
              >
                <p className="text-lg font-medium text-gray-900">
                  {category?.title}
                </p>

                {category?.content && category?.content?.length && (
                  <ul className="mt-4 space-y-4 text-sm">
                    {category?.content?.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item?.url}
                          className="text-gray-700 transition hover:text-gray-700/75"
                        >
                          {item?.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">All rights reserved.</span>
              <a
                href={
                  footerData?.footerText?.rightsReserved?.termsAndConditions
                    ?.url
                }
                className="inline-block underline transition"
              >
                {
                  footerData?.footerText?.rightsReserved?.termsAndConditions
                    ?.label
                }
              </a>
              <span>·</span>
              <a
                href={
                  footerData?.footerText?.rightsReserved?.privacyPolicy?.url
                }
                className="inline-block underline transition"
              >
                {footerData?.footerText?.rightsReserved?.privacyPolicy?.label}
              </a>
            </p>
            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              {footerData?.footerText?.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
