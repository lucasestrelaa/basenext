import CardDefault from "./cardDefault";
import { useEffect, useState } from "react";
import NFE from "./../assets/nfe.png";
import ECNPJ from "./../assets/ecnpj.png";
import ECPF from "./../assets/ecpf.png";
import item1 from "./../assets/ico_escolha1.png";
import item2 from "./../assets/ico_escolha2.png";
import item3 from "./../assets/ico_escolha3.png";
import item4 from "./../assets/ico_escolha4.png";
import item5 from "./../assets/ico_escolha4.png";
import { formatMoney } from "../helpers/helpers";
import Button from "./button";
import { getProducts } from "../api/services";

import "./../styles/section.css";

const Section = (props: any) => {
  const whitelabel = props.whitelabel;
  const [dataShow, setDataShow] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [idCertificate, setIdCertificate] = useState("");
  const [precoDe, setPrecoDe] = useState("");
  const [precoPor, setPrecoPor] = useState("");
  const [haveDiscount, setHaveDiscount] = useState(false);
  const [produtoFirst, setProdutoFirst] = useState([]);
  const [haveProductFirst, setHaveProductFirst] = useState(false)
  const featuredProduct = parseInt(whitelabel?.featuredProduct)
    ? whitelabel?.featuredProduct
    : 22;
  const primaryColor = props.whitelabel.primaryColor
    ? "" + props.whitelabel.primaryColor
    : "#182b8f";
  const lightSecondaryColor = props.whitelabel.lightSecondaryColor
    ? props.whitelabel.lightSecondaryColor
    : "#76d093";
  const fontPrimaryColor = props.whitelabel.fontPrimaryColor
    ? props.whitelabel.fontPrimaryColor
    : "#182b8f";
  const fontSecondaryColor = props.whitelabel.fontSecondaryColor
    ? props.whitelabel.fontSecondaryColor
    : "#fff";
  const backgroundColor = props.whitelabel.backgroundColor
    ? props.whitelabel.backgroundColor
    : "#ebf1ff";

  const [textProduct, setTextProduct] = useState([
    {
      type: "NFE",
      text: "O NF-e é o certificado digital para empresas que precisam emitir notas fiscais eletrônicas. Com ele a empresa pode de emitir notas fiscais eletrônicas para ser reconhecida pelos órgãos públicos, como a Secretaria da Fazenda do Estado (Sefaz) ou do município (prefeitura), além de fazer diversas outras ações relacionadas à contabilidade.",
    },
    {
      type: "ECPF",
      text: "O e-CPF é a identidade digital destinada a pessoas físicas, necessária para identificá-las no meio eletrônico e permitir a realização de diversos serviços. Com ele é possível assinar documentos digitalmente com validade jurídica e ter acesso aos sites da Receita Federal do Brasil (RFB), eSocial, Conectividade Social, entre outros.",
    },
    {
      type: "ECNPJ",
      text: "O e-CNPJ é a identidade digital destinada a pessoas jurídicas, necessária para identifica-las no meio eletrônico e permitir a realização de diversos serviços com integridade e segurança das informações. Com ele é possível assinar documentos digitalmente, transmitir dados, atender aos compromissos fiscais que toda empresa tem com o Governo e ter acesso aos sites da Receita Federal do Brasil (RFB), eSocial, Conectividade Social, entre outros.",
    }
  ]);
  const imagesMedia = [
    { type: "ARQ", img: item1 },
    { type: "CRT", img: item2 },
    { type: "CRL", img: item3 },
    { type: "TOK", img: item4 },
    { type: "SEM", img: item5 },
  ];
  const imagesCategory = [
    { type: "NFE", img: NFE },
    { type: "ECPF", img: ECPF },
    { type: "ECNPJ", img: ECNPJ },
  ];

  const produto = props.product ? props.product + "" : "ECNPJ";
  console.log("Chegou aqui")

  useEffect(() => {
    setPrecoDe("")
    setProdutoFirst([])
    const getProductsSection = async (sessionToken: string) => {
      let productsServer: any = [];
      let data: any = [];
      let labelCategory: any = [];
      if (
        (props.type === "cards" || props.type === "first") &&
        (sessionToken !== "" ||
          sessionToken !== undefined ||
          sessionToken !== null)
      ) {
        try {
          getProducts(whitelabel.urlApi, sessionToken, produto).then((res: any) => {
            if (typeof (res) === "string" && res.indexOf("Cannot GET") !== -1) {
              throw new Error("URL Inválida!")
            }
            if (res.status.codigo === 0) {
              productsServer = res.detalhe[1].produtos;
              console.log("linha 100 - productsServer: ", productsServer);
              if (whitelabel.products && (whitelabel.products !== "" || whitelabel.products.trim())) {
                //filter of products received from the server
                console.log("linha 103 - Tem produtos no whitelabel: ", productsServer);
                let idsProducts = whitelabel.products.split(",")
                let filterProducts: any = []
                idsProducts.map((resId: any) => {
                  console.log("linha 107 - resId: ", resId);
                  const item = productsServer.filter((res: any) => {
                    if (parseInt(featuredProduct) === parseInt(resId)) {
                      setHaveProductFirst(true)
                    }
                    return res.rubri_inid_rubricaproduto === parseInt(resId.trim())
                  })
                  filterProducts.push(...item)
                  return false
                })
                productsServer = filterProducts
              }else{
                setHaveProductFirst(true)
              }
              
              //search firstProduct in products
              const firstItem = res.detalhe[0].produtos.find(
                (element: any) =>
                  element.rubri_inid_rubricaproduto === featuredProduct
              );
              setTitulo(firstItem?.rubri_vcds_comercial);
              setIdCertificate(firstItem?.rubri_inid_rubricaproduto);
              if (firstItem?.produ_dmvl_precocomdesconto) {
                setPrecoPor(
                  formatMoney(firstItem?.produ_dmvl_precocomdesconto)
                );
                setHaveDiscount(true);
              }
              setPrecoPor(formatMoney(firstItem?.produ_dmvl_precovenda));
              console.log("productsServer:", productsServer);
              // Separate by category
              productsServer.map((resAllProducts: any) => {
                if (
                  !labelCategory.includes(
                    resAllProducts.produ_dmtp_certificadodigital
                  )
                ) {
                  labelCategory.push(
                    resAllProducts.produ_dmtp_certificadodigital
                  );
                }
                return true
              });

              labelCategory.map((resCategory: any) => {
                // Categories
                const produtosporCategoria = productsServer.filter(
                  (resProduto: any) => {
                    return (
                      resProduto.produ_dmtp_certificadodigital === resCategory
                    );
                  }
                );
                // Media
                let labelMedia: any = [];
                produtosporCategoria.map((resProductsByCategory: any) => {
                  if (
                    !labelMedia.includes(
                      resProductsByCategory.produ_dmtp_midia
                    ) &&
                    resProductsByCategory.produ_dmtp_certificadodigital.toString() ===
                    resCategory.toString()
                  ) {
                    labelMedia.push(resProductsByCategory.produ_dmtp_midia);
                  }
                  return true
                });
                let productsByMedia: any = [];
                labelMedia.map((resProductsByMedia: any) => {
                  const produto = productsServer.filter(
                    (resProdutoServer: any) => {
                      return (
                        resProdutoServer.produ_dmtp_midia ===
                        resProductsByMedia &&
                        resProdutoServer.produ_dmtp_certificadodigital ===
                        resCategory
                      );
                    }
                  );
                  const image = imagesMedia.find(
                    (resImageMedia: any) =>
                      resImageMedia.type.toUpperCase() ===
                      resProductsByMedia.toUpperCase()
                  );
                  productsByMedia.push({
                    midia: resProductsByMedia,
                    imagem: image?.img,
                    produtos: produto,
                  });
                  return true
                });
                const image = imagesCategory.find(
                  (resImageCategory: any) =>
                    resImageCategory.type.toUpperCase() ===
                    resCategory.toUpperCase()
                );
                const text = textProduct.find(
                  (resTextProduct: any) =>
                    resTextProduct.type.toUpperCase() === resCategory
                );

                data.push({
                  categorias: resCategory,
                  imagem: image?.img,
                  texto: text?.text,
                  midias: productsByMedia,
                });
                return true
              });
            }
            setDataShow(data);
          });
        } catch (error) { }
      } else {
        //   setTimeout(() => {
        //       getToken()
        //   }, 3000);
        // getToken()
        // console.log('morreu por conta da sessão')
      }
    };
    setTimeout(() => {
      if (props.token.access_token !== "") {
        getProductsSection(props.token.access_token);
      }
    }, 1000);
    // eslint-disable-next-line
  }, [props.token.access_token]);


  const tooglePopup = () => {
    setIsOpen(!isOpen);
  };

  const callCategory = () => {
    return (
      <>
        {dataShow.map((resData: any, indexData: any) => (
          <div className="row justify-content-center" key={indexData}>
            <img
              loading="lazy"
              className="img-products"
              id={resData.categorias}
              src={resData.imagem}
              alt=""
              width="343"
              height="123"
            />
            <p
              style={{ color: `${fontPrimaryColor}` }}
              className="text-product"
            >
              {resData.texto}
            </p>
            {resData.midias.map((resMidia: any, indexMidia: number) => {
              indexMidia++;
              const layoutStyle =
                resData.midias.length === 4 ? "col-md-3" : "col-md-2";
              return (
                <div>
                  Card
                </div>
                // <Card
                //   key={indexMidia}
                //   item={resMidia}
                //   card={"1"}
                //   layout={layoutStyle}
                // />
              );
            })}
          </div>
        ))}
      </>
    );
  };
  switch (props.type) {
    case "first":
      return (
        <>
          {isOpen && (
            <div>
              Form
            </div>
            // <Form
            //   HandleClose={tooglePopup}
            //   content={
            //     <div>
            //       <h2 style={{ color: `${fontPrimaryColor}` }}>Texto</h2>
            //       <p style={{ color: `${fontPrimaryColor}` }}>
            //         Formulário {idCertificate}
            //       </p>
            //     </div>
            //   }
            //   idCertificado={idCertificate}
            //   titulo={titulo}
            // />
          )}
          {!haveProductFirst ?
            <div
              className={`${props.type}`}
              style={{ background: `${backgroundColor}` }}
            >
              <div className="container pt-5">
                <div className="row">
                  <div className="col-md-6 desktop">
                    <div className="title-section">
                      <h1 style={{ color: `${fontPrimaryColor}` }}>{`${props.whitelabel?.title}`}</h1>
                    </div>
                    <div className="text-section">
                      <p style={{ color: `${fontPrimaryColor}` }}>
                        {props.textA}
                      </p>
                      <p style={{ color: `${fontPrimaryColor}` }}>
                        {props.textD}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center mobile img-section">
                    <img
                      loading="lazy"
                      src={`${props.whitelabel?.logo}`}
                      alt=""
                      title={`${props.whitelabel?.partnershipTitle}`}
                      width="450"
                      height="450"
                    />
                  </div>
                </div>
              </div>
            </div>
            : <>
              {produtoFirst ? (
                <div
                  className={`${props.type}`}
                  style={{ background: `${backgroundColor}` }}
                >
                  <div className="container pt-5">
                    <div className="row">
                      <div className="col-md-6 desktop">
                        <div className="title-section">
                          <h1 style={{ color: `${fontPrimaryColor}` }}>{titulo}</h1>
                        </div>
                        <div className="text-section">
                          <p style={{ color: `${fontPrimaryColor}` }}>
                            {props.textA}
                          </p>
                        </div>
                        {haveDiscount && props.whitelabel?.showFullPrice === "S" ? (
                          <div className="text-section">
                            <p style={{ color: `${fontPrimaryColor}` }}>
                              De {precoDe}{" "}
                              <span className="new-price-product">
                                Por apenas {precoPor}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div className="text-section">
                            <p
                              className="text-capitalize"
                              style={{ color: `${fontSecondaryColor}` }}
                            >
                              <span className="new-price-product">
                                Por apenas {precoPor}
                              </span>
                            </p>
                          </div>
                        )}
                        <div className="text-section">
                          <p style={{ color: `${fontPrimaryColor}` }}>
                            {props.textD}
                          </p>
                        </div>
                        {props.button ? (
                          <div className="button-section">
                            <Button
                              click={tooglePopup}
                              name={`Comprar`}
                              color={`${primaryColor}`}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-6 d-flex justify-content-center mobile img-section">
                        <img
                          loading="lazy"
                          src={`${props.whitelabel?.logo}`}
                          alt=""
                          title={`${props.whitelabel?.partnershipTitle}`}
                          width="450"
                          height="450"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          }
          <svg
            id="bigTriangleColor"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="100%"
            height="100"
            viewBox="0 0 100 102"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 L50 100 L100 0 Z"
              style={{
                fill: `${backgroundColor}`,
                stroke: `${backgroundColor}`,
              }}
            ></path>
          </svg>
          {/* <div className="row"> */}
          <div className="col-md-12 text-center img-ctplus">
            <img
              loading="lazy"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA/CAYAAAAWq21gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmVkYTJiM2ZhYywgMjAyMS8xMS8xNy0xNzoyMzoxOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjkxOUQxQjlBNDkyMTFFQzg3MzBCQTc5MEMzQkY0RDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjkxOUQxQjhBNDkyMTFFQzg3MzBCQTc5MEMzQkY0RDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjEgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Nzg4MTgwMDg5RUZFMTFFQzg3RjRCQTVCNTdEQzk4RjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg4MTgwMDk5RUZFMTFFQzg3RjRCQTVCNTdEQzk4RjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4MC1KRAAAF1UlEQVR42uxc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"
              alt="img-ctplus"
              width="100"
              height="63"
            />
          </div>
          {/* </div>  */}
        </>
      );
    case "second":
      return (
        <>
          <div
            className={`${props.type} pt-5`}
            style={{ background: `${backgroundColor}` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6 desktop">
                  <div className="title-section">
                    <h2 style={{ color: `${fontPrimaryColor}` }}>
                      {props.whitelabel?.partnershipTitle}
                    </h2>
                  </div>
                  <div className="text-section">
                    <p style={{ color: `${fontPrimaryColor}` }}>
                      {props.whitelabel?.partnershipDescription}
                    </p>
                  </div>
                  {props.button ? (
                    <div className="button-section">
                      <a
                        href={`${props.whitelabel?.btnHomeLink}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          name={`${props.whitelabel?.btnHomeTitle}`}
                          color={`${primaryColor}`}
                        />
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 d-flex justify-content-center mobile img-section">
                  <img
                    loading="lazy"
                    src={`${props.whitelabel?.logo}`}
                    alt=""
                    title={`${props.whitelabel?.partnershipTitle}`}
                    width="450"
                    height="450"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    case "third":
      return (
        <>
          <div className={`${props.type} pt-5`}>
            <div className="container">
              <div className="row">
                <div className="col-md-6 desktop">
                  <div className="title-section">
                    <h2 style={{ color: `${fontPrimaryColor}` }}>
                      Tenha um Certificado Digital!
                    </h2>
                  </div>
                  <div className="text-section">
                    <p style={{ color: `${fontPrimaryColor}` }}>
                      Assine digitalmente contratos com a mesma autenticidade e
                      validade jurídica da assinatura de próprio punho e
                      mantenha os compromissos fiscais da sua empresa em dia com
                      rapidez, segurança e sem burocracia.
                    </p>
                  </div>
                  <div className="text-section">
                    <p style={{ color: `${fontPrimaryColor}` }}>
                      O certificado digital é a carteira de identificação
                      eletrônica/virtual de empresas e pessoas físicas. Ele é
                      uma alternativa mais sustentável, moderna e segura aos
                      documentos em papel.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center mobile img-section">
                  <img
                    loading="lazy"
                    src={`https://sinpejus.ctplus.com.br/images/img_01.jpg`}
                    alt=""
                    title={`${props.whitelabel?.partnershipTitle}`}
                    width="371"
                    height="380"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      );
    case "fourth":
      return (
        <div className="Sections mtb-70 ">
          <div className="container">
            <div className="row">
              <CardDefault
                title={"Compre"}
                text={
                  'Escolha o tipo de Certificado Digital (e-CNPJ, e-CPF ou NF-e), selecione o tempo de utilização e clique no botão "Comprar Certificado".'
                }
                img={"https://sinpejus.ctplus.com.br/images/ico_comprar1.png"}
              />
              <CardDefault
                title={"Emita"}
                text={
                  "Após a confirmação do pagamento, você pode agendar o atendimento (presencial ou videoconferência), para a emissão do Certificado. Deixe tudo preparado e os documentos organizados."
                }
                img={"https://sinpejus.ctplus.com.br/images/ico_comprar2.png"}
              />
              <CardDefault
                title={"Instale"}
                text={
                  "O protocolo pode ser validado antes de 24 horas ou em até 72 horas. Após a liberação, um e-mail será enviado com as informações sobre a instalação."
                }
                img={"https://sinpejus.ctplus.com.br/images/ico_comprar3.png"}
              />
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <h2
                  style={{ color: `${fontPrimaryColor}` }}
                  className="section-title"
                >
                  {props.title}
                </h2>
              </div>
            </div>
          </div>
        </div>
      );
    case "cards":
      return (
        <div className="container pt-5" id={`${props.product}`}>
          <div>{callCategory()}</div>
        </div>
      );
    case "CTA":
      return (
        <div
          className="SectionsCTA"
          style={{
            background: `linear-gradient(90deg, ${primaryColor} 0, ${lightSecondaryColor})`,
          }}
        >
          <div className="container">
            <div className=" row justify-content-center">
              <h2
                style={{ color: `${fontSecondaryColor}` }}
                className="text-justify tituloCTA"
              >
                {props.title}
              </h2>
            </div>
          </div>
        </div>
      );
  }
  return <></>;
};

export default Section;
