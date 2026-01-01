function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* TMDB Logo and Attribution */}
        <div className="footer-attribution">
          <p className="footer-text">
            Data provided by{" "}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              TMDB
            </a>
          </p>
        </div>

        <div className="footer-credit">
          <p>© {new Date().getFullYear()} CineVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;