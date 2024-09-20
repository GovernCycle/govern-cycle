import { ReactNode } from "react";

export const CenteredPageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    
    <main className="flex flex-1 flex-col max-sm:gap-16 gap-32 mb-10 2xl:pt-32 w-auto mx-20 px-10 max-md:px-6 max-w-full m-auto pt-32 relative">
      {children}
    </main>
  );
};