import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
      <title>{postData.title}</title>
      </Head>
      <br />
      <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>    
      <Date dateString={postData.date}/>
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
   // Add the "await" keyword like this:
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

// Buscar API externa ou banco de dados de consulta
// Como getStaticProps, getStaticPathspode buscar dados de qualquer fonte de dados. Em nosso exemplo, getAllPostIds(que é usado por getStaticPaths) pode buscar de um endpoint de API externo:

// export async function getAllPostIds() {
//   // Instead of the file system,
//   // fetch post data from an external API endpoint
//   const res = await fetch('..');
//   const posts = await res.json();
//   return posts.map((post) => {
//     return {
//       params: {
//         id: post.id,
//       },
//     };
//   });
// }