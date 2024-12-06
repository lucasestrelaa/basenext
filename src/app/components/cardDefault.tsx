import "./../styles/cardDefault.css";
import { connect } from "react-redux";

const CardDefault = (props: any) => {
  const fontPrimaryColor = props.whitelabel.fontPrimaryColor ? props.whitelabel.fontPrimaryColor : "#182b8f"
  return (
    <div className="col-md-4 animated animatedFadeInUp fadeInUp">
      <div className="CardDefault text-center p-20">
        <img
          loading="lazy"
          src={props.img}
          alt={props.title}
          width="86" 
          height="92"
        />
        <h2 className="titulo-card" style={{ color: `${fontPrimaryColor}` }}>{props.title}</h2>
        <p className="Card-Text-Default" style={{ color: `${fontPrimaryColor}` }}>{props.text}</p>
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    whitelabel: state.whiteLabel,
    token: state.session,
    categoryProducts: state.products.category,
  };
}

export default connect(mapStateToProps,)(CardDefault);
