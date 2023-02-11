export default function () {
  return (
    <>
      <footer className="footer mt-auto">
        <div className="container-fluid text-center py-3 o40">
          <hr style={{ width: "80%" }} className="ms-auto me-auto" />@ 2023 Live
          Tennis ELO Ratings | Contact us:{" "}
          <a
            href="mailto:tennis.elos@gmail.com?subject=Mail from our Website"
            className="text-blue-600 visited:text-purple-600 "
            style={{ textDecoration: "underline", fontWeight: "bold" }}
          >
            tennis.elos@gmail.com 
          </a>
        </div>
      </footer>
    </>
  );
}
