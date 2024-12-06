import { formatPhone } from "../helpers/helpers";
import { connect } from "react-redux";
import "./../styles/header.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Header(props: any) {
  const href = window.location.href;
  const menuProducts = href.includes("agendamento") ? "display-none" : ""
  const categoryProducts = props.categoryProducts;
  const phoneFormatted =
    props.whitelabel.phone !== "" && props.whitelabel.phone.length > 7
      ? formatPhone("" + props.whitelabel.phone)
      : formatPhone("6130383595");
  const phoneUnformatted =
    props.whitelabel.phone !== "" && props.whitelabel.phone.length > 7
      ? props.whitelabel.phone
      : "6130383595";
  const PhoneType =
    props.whitelabel.isWhatsapp === "S"
      ? `https://api.whatsapp.com/send?phone=${phoneUnformatted}`
      : `tel:${phoneUnformatted}`;
  const facebook = props.whitelabel.facebook
    ? props.whitelabel.facebook
    : "https://www.facebook.com/connectsaoficial/s";
  const instagram = props.whitelabel.instagram
    ? props.whitelabel.instagram
    : "https://www.instagram.com/connectsaoficial/";
  const linkedin = props.whitelabel.linkedin
    ? props.whitelabel.linkedin
    : "https://www.linkedin.com/company/connectsaoficial";
  const primaryColor = props.whitelabel.primaryColor ? "" + props.whitelabel.primaryColor : "#182b8f"
  const secondaryColor = props.whitelabel.secondaryColor ? props.whitelabel.secondaryColor : "#009881"
  const lightSecondaryColor = props.whitelabel.lightSecondaryColor ? props.whitelabel.lightSecondaryColor : "#76d093"
  const fontSecondaryColor = props.whitelabel.fontSecondaryColor ? props.whitelabel.fontSecondaryColor : "#fff"
  return (
    <div className="Header " id="header">
      <div className="sobMenu" style={{ background: `linear-gradient(90deg, ${primaryColor} 0, ${lightSecondaryColor})` }} >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h6 className="sobMenu-title d-none d-sm-block" style={{ color: `${fontSecondaryColor}` }}>
                Agora os clientes da {props.whitelabel.name} podem adquirir seu
                certificado digital com desconto.
              </h6>
            </div>
            <div className="col-md-6 contact">
              <h6 className="sobMenu-title" style={{ color: `${fontSecondaryColor}` }}>
                Atendimento:{" "}
                <a className="font-tel" target="blank_" href={`${PhoneType}`} style={{ color: `${fontSecondaryColor}` }}>
                  {phoneFormatted}
                </a>{" "}
                |
                <a
                  className="icon-header"
                  href={`${facebook}`}
                  target="_blank"
                  rel="noreferrer"

                >
                  <i className="bi bi-facebook" style={{ color: `${fontSecondaryColor}` }}></i>
                </a>
                <a
                  className="icon-header"
                  href={`${instagram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-instagram" style={{ color: `${fontSecondaryColor}` }}></i>
                </a>
                <a
                  className="icon-header"
                  href={`${linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-linkedin" style={{ color: `${fontSecondaryColor}` }}></i>
                </a>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="menu">
        <div className="container">
          <div className="row">
            <div className="col-md-6 img-sm-center">
              <img
                loading="lazy"
                src={`https://cdn-saturno.s3.amazonaws.com/saturno/connect/logo_connect_certificado.png`}
                alt=""
                title="Logo-principal"
              />
            </div>
            <div className={`col-md-6 menu-itens-position d-none d-sm-block ${menuProducts}`}>
              <ul className="menu-itens">
                {categoryProducts.map((res: any, index: number) => (
                  <li key={`${index}`}>
                    <a href={`#${res.name}`} style={{ background: `${secondaryColor}`, color: `${fontSecondaryColor}` }} >{res.nameFull}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function mapStateToProps(state: any) {
  return {
    whitelabel: state.whiteLabel,
    token: state.session,
    categoryProducts: state.products.category,
  };
}

export default connect(mapStateToProps)(Header);
