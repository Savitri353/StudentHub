import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} StudentHub. All rights reserved.
        </p>

        <div className="footer-extra">
          <span>Built by Savitri</span>
        </div>
      </div>
    </footer>
  );
}
