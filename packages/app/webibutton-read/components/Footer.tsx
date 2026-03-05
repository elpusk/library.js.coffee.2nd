import React from 'react';

const Footer: React.FC = () => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  return (
    <footer className="bg-slate-800 text-slate-400 px-6 py-2 text-xs flex justify-between items-center border-t border-slate-700">
      <span className="opacity-60 italic">Elpusk i-Button Reader WebApp. Coding with Claude.</span>
      <span>date : {formattedDate}</span>
    </footer>
  );
};

export default Footer;
