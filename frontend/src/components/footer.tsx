import { IconMail, IconWorldShare } from "@tabler/icons-react";
// import { Label } from "./label";

export const Footer = () => {
  return (
    <footer className="flex justify-center px-8 w-full [clip-path:inset(0_-100vmax)] shadow-[0_0_0_100vmax_var(--tw-shadow-color)] shadow-primary-950 bg-primary-950 text-primary-50 py-8">
      <div className="flex gap-32 max-sm:gap-16 flex-wrap py-4 w-[1200px] max-w-full">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-primary text-lg">
            DAO
          </h3>
          <span>
            A product of{" "}
            <a
              className="hover:underline text-primary-200 font-bold"
              target="_blank"
              href="https://www.dao.com"
            >
              Company name
            </a>
          </span>
          <span>Copyright © 2024, All rights reserved</span>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-primary text-lg">Get in touch</h3>
          <a target="_blank" href="mai">
            <label className="gap-3">
              <IconMail />
              dao@dao.com
            </label>
          </a>
          <a target="_blank" href="https://www.dao.com">
            <label className="gap-3">
              <IconWorldShare />
              www.dao.com
            </label>
          </a>
        </div>
      </div>
    </footer>
  );
};
