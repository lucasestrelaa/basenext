import "./../styles/footer.css";
import logoFooterConnect from "./../assets/logo_connectserasa_branco.png";
import logoFooterSafeweb from "./../assets/logo_safeweb_branco.png";
import logoFooterOnline from "./../assets/logo_online_branco.png";


function Footer(props: any) {
  const labels = [
    "Consultas de Crédito e Cadastro",
    "Recuperação de Dívidas",
    "Consultas Veículo",
    "Me Proteja",
    "Maquininha de Cartão",
    "Negocie Legal",
    "Controle Legal",
    "Cartão Private Label",
    "2ª Via de Boleto",
    "Seja Connect",
    "Atendimento ao Cliente",
    "Acesso ao Sistema Connect",
  ];
  const columns = ["a", "b", "c"];
  let linkBeConnect: any = [];

  const labelsSanitized = labels.map((res: any, index: number) => {
    let category;
    if (index >= 0 && index <= 3) {
      category = "a";
    } else if (index >= 4 && index <= 7) {
      category = "b";
    } else {
      category = "c";
    }
    if (props.whitelabel.linkBeConnect && index === 10) {
      linkBeConnect = {
        ...linkBeConnect,
        nome: `${res}`,
        link: "" + props.whitelabel.linkBeConnect.linkBeConnect,
        category: category,
      };
    } else {
      linkBeConnect = {
        ...linkBeConnect,
        label: `${res}`,
        link: "https://www.connectsa.com.br/solucoes-connect/",
        category: category,
      };
    }
    return linkBeConnect;
  });
  const facebook = props.whitelabel.facebook
    ? props.whitelabel.facebook
    : "https://www.facebook.com/connectsaoficial/";
  const instagram = props.whitelabel.instagram
    ? props.whitelabel.instagram
    : "https://www.instagram.com/connectsaoficial/";
  const linkedin = props.whitelabel.linkedin
    ? props.whitelabel.linkedin
    : "https://www.linkedin.com/company/connectsaoficial";
  const year = new Date().getFullYear();

  const secondaryColor = props.whitelabel.secondaryColor ? props.whitelabel.secondaryColor : "#009881"
  const fontSecondaryColor = props.whitelabel.fontSecondaryColor ? props.whitelabel.fontSecondaryColor : "#fff"
  const footerColor = props.whitelabel.footerColor ? props.whitelabel.footerColor : "#000000e6"

  return (
    <div className="footer" style={{ background: `${footerColor}` }}>
      <div className="container">
        <div className="row desktop-footer">
        </div>
        <div className="row desktop-footer">
          <div className="col-md-4">
            <div className="col-md-12 text-footer">
              <div className="img-footer">
                <img
                  loading="lazy"
                  src={logoFooterConnect}
                  alt="rodape-img"
                />
              </div>
              <p style={{ color: `${fontSecondaryColor}` }}>
                A Connect é Distribuidor Autorizado Serasa Experian, oferece
                soluções nas áreas de informações de crédito e cadastro e
                monitoramento de documentos de pessoas jurídicas para prevenção
                de fraudes.
              </p>
            </div>
            <div className="btn-saibamais" style={{ background: `${secondaryColor}` }}>
              <a href="http://www.connectsa.com.br/" rel="noreferrer" target="_blank" style={{ color: `${fontSecondaryColor}` }}>
                Saiba mais
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="col-md-12 text-footer">
              <div className="img-footer">
                <img
                  loading="lazy"
                  src={logoFooterSafeweb}
                  alt="rodape-img"
                />
              </div>
              <p style={{ color: `${fontSecondaryColor}` }}>
              Informações digitais seguras e confiáveis. 
              Somos a SafeWeb a 2ª Maior emissora de Certificados Digitais do Brasil.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="col-md-12 text-footer">
              <div className="img-footer">
                <img
                  loading="lazy"
                  src={logoFooterOnline}
                  alt="rodape-img"
                />
              </div>
              <p style={{ color: `${fontSecondaryColor}` }}>
              Certificados Digitais e soluções comerciais para cada etapa do seu negócio. 
              Fique Online e conte com a gente para levar sua empresa cada vez mais longe.
              </p>
            </div>
          </div>
          
        </div>
        <div className="row text-center copyright">
          <p>® {year} Connect - Todos os direitos reservados </p>
          <p>
            Desenvolvido por <span className="label-connect" style={{ color: `${secondaryColor}` }}>Connect SA</span>
            <br />
            {process.env.REACT_APP_VERSION}
          </p>
          <h4 className="font-icons">
            <a className="icon-footer" href={`${facebook}`} rel="noreferrer" target="_blank">
              <i className="bi bi-facebook" style={{ color: `${fontSecondaryColor}` }}></i>
            </a>
            <a className="icon-footer" href={`${instagram}`} rel="noreferrer" target="_blank">
              <i className="bi bi-instagram" style={{ color: `${fontSecondaryColor}` }}></i>
            </a>
            <a className="icon-footer" href={`${linkedin}`} rel="noreferrer" target="_blank">
              <i className="bi bi-linkedin" style={{ color: `${fontSecondaryColor}` }}></i>
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch: any) {
  return {
    alterarProducts(novoProduto: any) {
      const action = alterarProduct(novoProduto);
      dispatch(action);
    },
    adicionarECPFProducts(novoProduto: any) {
      const action = adicionarECPFProduct(novoProduto);
      dispatch(action);
    },
    adicionarECNPJProducts(novoProduto: any) {
      const action = adicionarECNPJProduct(novoProduto);
      dispatch(action);
    },
    adicionarNFEProducts(novoProduto: any) {
      const action = adicionarNFEProduct(novoProduto);
      dispatch(action);
    },
  };
}
function mapStateToProps(state: any) {
  return {
    whitelabel: state.whiteLabel,
    token: state.session,
    categoryProducts: state.products.category,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
