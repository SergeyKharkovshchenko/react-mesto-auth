function Footer() {
  const date = new Date();

  return (
    <footer className="footer">
      <p className="footer__title">© {date.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
