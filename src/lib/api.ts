import axios from "axios";


export const baseApi = axios.create({
  baseURL: "https://quickpic-cms.huefinds.store/graphql",
  headers: {
    'Content-Type': 'application/json',
  }
})

export const queries = {
  getBlogs: (first: number = 3) => `query GetPosts($first: Int = ${first}) {
    posts(first: $first) {
    nodes {
      title
      slug
      date
      excerpt

      featuredImage {
        node {
          sourceUrl
          altText
          title
          description
        }
      }
    }
  }
}`,
  getFaqs: () => `query GetFaqs($first: Int = 6) {
  faqs(first: $first) {
    nodes {
      title
      excerpt
    }
  }
}`,
  getBlogSlugs: () => `query GetAllPostSlugs {
  posts(first: 1000) {
    nodes {
      slug
    }
  }
}`,
  getBlogBySlug: (slug:string) => `query GetPostBySlug{
  post(id:"${slug}", idType: SLUG) {
   title
    slug
    date
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
        altText
        title
        description
      }
    }
    postMeta {
      metaTitle
      metaDescription
    }
  }
}`,
getToolPageSlugs:()=>`query GetToolPageSlugs{
  toolPages(first:100) {
   nodes {
      slug
    }
  }
}`,
getToolPageBySlug:(slug:string)=>`query GetToolPageBySlug{
  toolPage(id: "${slug}", idType: SLUG) {
     slug
    content
    featuredImage {
      node {
        sourceUrl
        altText
        title
      }
    }
    postMeta {
      metaTitle
      metaDescription
    }
    toolPageJsonSchema{
      faqs
      howToTitle
      howToDescription
      howTo
    }
  }
}`,
}

export const getBlogs = async (n: number) => await baseApi.post('', { query: queries.getBlogs(n) })
export const getBlogSlugs = async () => await baseApi.post('', { query: queries.getBlogSlugs() })
export const getBlogBySlug = async (slug:string) => await baseApi.post('', { query: queries.getBlogBySlug(slug) })
export const getFaqs = async () => await baseApi.post('', { query: queries.getFaqs() })
export const getToolPageSlugs = async () => await baseApi.post('', { query: queries.getToolPageSlugs() })
export const getToolPageBySlug = async (slug:string) => await baseApi.post('', { query: queries.getToolPageBySlug(slug) })