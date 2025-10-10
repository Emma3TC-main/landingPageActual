import React from 'react';

// --- Iconos SVG ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
);
const CsvIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path><path d="M11.25 12H10v6h1.25a1.25 1.25 0 1 0 0-2.5H10"></path><path d="M17 12h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H14"></path></svg>
);

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      {/* El div problemático ahora está limpio */}
      <div className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
            <button className="text-foreground p-2 rounded-md hover:bg-secondary lg:hidden mr-4">
              <MenuIcon />
            </button>
            <div className="text-2xl font-bold tracking-wider text-primary">
              CONATE
            </div>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors">
            <SearchIcon />
            <span>Buscar</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors">
            <PdfIcon />
            <span>Exportar PDF</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors">
            <CsvIcon />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

