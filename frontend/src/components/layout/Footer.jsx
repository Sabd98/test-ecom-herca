//Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-200 shadow p-4">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Cusboard. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
