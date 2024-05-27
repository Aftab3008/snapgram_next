export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-wrap">
      <section className="w-full md:w-1/2 flex items-center justify-center overflow-auto h-screen">
        {children}
      </section>
      <div className="w-full md:w-1/2">
        <img
          src="/assets/images/side-img.svg"
          alt="logo"
          className="hidden xl:block h-screen w-full object-cover bg-no-repeat"
        />
      </div>
    </div>
  );
}
