import { Community } from "@/app/components/icons/community";
import { DevIcon } from "@/app/components/icons/sidebar/dev-icon";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-8 md:grid-cols-9 gap-8">
          <div className="col-span-8 sm:col-span-4 md:col-span-3">
            <div className="flex justify-center sm:justify-start">
              <p className="text-3xl font-bold">PZ Logo</p>
            </div>
            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 transition hover:text-teal-700/75"
                >
                  <span className="sr-only">Facebook</span>
                  <DevIcon />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 transition hover:text-teal-700/75"
                >
                  <span className="sr-only">Instagram</span>
                  <DevIcon />
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left col-span-8 sm:col-span-4 md:col-span-2">
            <p className="text-lg font-medium text-gray-900">About Us</p>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Company History
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Meet the Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Employee Handbook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left col-span-8 sm:col-span-4 md:col-span-2">
            <p className="text-lg font-medium text-gray-900">Our Services</p>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Web Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Marketing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Google Ads
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left col-span-8 sm:col-span-4 md:col-span-2">
            <p className="text-lg font-medium text-gray-900">Helpful Links</p>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 transition hover:text-gray-700/75"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">All rights reserved.</span>
              <a
                href="#"
                className="inline-block underline transition"
              >
                Terms & Conditions
              </a>
              <span>·</span>
              <a
                href="#"
                className="inline-block underline transition"
              >
                Privacy Policy
              </a>
            </p>
            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              © 2023 Project Zero
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
