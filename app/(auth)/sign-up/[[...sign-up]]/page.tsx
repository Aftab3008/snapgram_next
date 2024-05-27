import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
export default function Page() {
  return (
    <div className="sm:w-420 flex-center flex-col">
      <SignUp
        appearance={{
          baseTheme: dark,
          elements: {
            formButtonPrimary: "shad-button_primary b-0",
          },
        }}
      />
    </div>
  );
}
