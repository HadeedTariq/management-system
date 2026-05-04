export default function Footer() {
  return (
    <footer className="bg-white darks:bg-[#1E1C19] border-t border-[#1A1814]/10 darks:border-[#F2EFE8]/10 transition-colors">
      <div className="max-w-[1100px] mx-auto py-10 px-6 md:px-10 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="font-['Playfair_Display',_serif] text-lg font-bold text-[#1A1814] darks:text-[#F2EFE8] mb-2 tracking-tight">
            Civi
            <span className="text-[#C8873A] darks:text-[#E09A4A]">Connect</span>
          </div>
          <p className="text-[13px] text-[#9C9488] darks:text-[#6B6560] leading-relaxed font-light max-w-sm">
            The official society management platform for Civiline College. Built
            for students, by students.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-[#9C9488] darks:text-[#6B6560] mb-3">
            Platform
          </h4>
          <ul className="flex flex-col gap-2">
            {["Features", "Events", "Directory", "Analytics"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[13px] text-[#5C5748] darks:text-[#A8A298] hover:text-indigo-600 darks:hover:text-indigo-600 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-[#9C9488] darks:text-[#6B6560] mb-3">
            Societies
          </h4>
          <ul className="flex flex-col gap-2">
            {["Browse All", "Create New", "Guidelines", "Recognition"].map(
              (link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-[#5C5748] darks:text-[#A8A298] hover:text-indigo-600 darks:hover:text-indigo-600 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase text-[#9C9488] darks:text-[#6B6560] mb-3">
            Support
          </h4>
          <ul className="flex flex-col gap-2">
            {[
              "Help Centre",
              "Contact Us",
              "Privacy Policy",
              "Terms of Use",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[13px] text-[#5C5748] darks:text-[#A8A298] hover:text-indigo-600 darks:hover:text-indigo-600 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto py-4 px-6 md:px-10 border-t border-[#1A1814]/10 darks:border-[#F2EFE8]/10 flex flex-col md:flex-row items-center justify-between text-xs text-[#9C9488] darks:text-[#6B6560] gap-2">
        <span>© 2026 Civi Connect · Civiline College</span>
        <span>Crafted with care for student life</span>
      </div>
    </footer>
  );
}
