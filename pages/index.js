import Layout from "../components/layout";
import Link from "next/link";
import { getSortedPostsData } from "../lib/library";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Home = ({ allPostsData }) => {
  return (
    <Layout>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/library/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small>
              <p>{date}</p>
            </small>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Home;
