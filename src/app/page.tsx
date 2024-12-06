import Image from "next/image";
import styles from "./page.module.css";
import Section from "./components/section";
import Footer from "./components/footer";
import ToTop from "./components/toTop";
import Header from "./components/header";

export default function Home() {
  const token = "Seu Certificado Digital";
  const state = "São Paulo";
  return (
    <div className={styles.page}>
      <Header />
          <Section
            style={{ background: "#000" }}
            type={"first"}
            textA="Garanta já o seu certificado com o preço mais baixo do mercado! Não perca essa oportunidade!"
            textD="O certificado é uma ferramenta indispensável para empresas que desejam realizar transações eletrônicas com segurança e agilidade. Com ele, você poderá assinar documentos digitalmente, emitir notas fiscais eletrônicas, acessar sistemas governamentais e muito mais."
            button={true}
            token={token}
          />
          <Section type={"cards"} />
          <Section
            style={{ background: "#000" }}
            type={"third"}
            button={false}
          />
          <Section
            style={{ background: "#000" }}
            type={"CTA"}
            title={"Fácil e rápido! Como adquirir um Certificado Digital"}
            button={false}
          />
          <Section
            style={{ background: "#000" }}
            type={"fourth"}
            title={
              "Pronto! Seu Certificado Digital estará disponível para uso."
            }
            button={false}
          />
          <Section
            style={{ background: "#000" }}
            type={"second"}
            state={state}
            button={true}
          />
          <Footer />
          <ToTop />
    </div>
  );
}
