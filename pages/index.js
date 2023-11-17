import Navbar from "../componets/Navbar";
import Slider from "../componets/Slider";
import Footer from "../componets/Footer";
import Cards from "../componets/Cards";
import WrapperModal from "../componets/WrapperModal";

const index = ({ posts }) => {
  return (
    <>
      <Navbar />
      <Slider />
      <Cards posts={posts} />
      <WrapperModal>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2419218.861768916!2d25.339369995513422!3d53.691207940621865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46da2584e2ad4881%3A0xa1d181ec8c10!2z0JHQtdC70LDRgNGD0YHRjA!5e0!3m2!1sru!2sus!4v1699991088679!5m2!1sru!2sus"
          width="100%"
          height="544px"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </WrapperModal>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${process.env.API_URL}`;
  const data = await fetch(url);
  const value = await data.json();

  return {
    props: {
      posts: value,
    },
  };
};

export default index;
