import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { langState } from "../pages/menu";
import { styles } from "../public/js/styles";

export default function ContactUs() {
  const lang = useRecoilValue(langState);
  const dictionary = {
    problem: {
      en: "In case you faced a problem",
      ar: "في حال مواجهة أي مشكلة"
    },
    contact: { en: "Contact us", ar: "تواصل معنا" }
  };
  return (
    <>
      <div className="contactUs">
        <div className="problem">{dictionary.problem[lang]}</div>
        <Link href="https://wa.me/+96170097533?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C">
          <div className="contactbtn">
            <FaWhatsapp /> <span>{dictionary.contact[lang]}</span>
          </div>
        </Link>
      </div>
      <style jsx>{`
        .contactUs {
          color: ${styles.secondaryColor};
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin: 1rem 0;
          font-size: 0.9rem;
        }
        .problem {
          padding: 0.2rem;
        }
        .contactbtn {
          background: ${styles.primaryColorLight};
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
}
