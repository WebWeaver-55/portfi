export const SectionHeader = (
    {
       title,
       eyebrow,
       description,

    }: {
        title: string;
        eyebrow: string;
        description:string;
    }
) => {
return(
    <>
    <div className="text-center mb-16 transform transition-all duration-1000">
    <h1 className="font-semibold lg:text-3xl tracking-widest bg-gradient-to-r from-emerald-300 to-sky-500 text-transparent bg-clip-text">
      {eyebrow}
    </h1>
    <h1 className="font-serif text-3xl md:text-5xl mt-6 text-white relative inline-block">
      {title}
    </h1>
    <p className="text-white/60 mt-4 max-w-md mx-auto lg:text-xl">
     {description}
    </p>
  </div>
  </>

)
}