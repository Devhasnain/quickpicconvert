import axios from "axios";

import { wpFetch } from "./wp";


export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
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
  getBlogBySlug: (slug: string) => `query GetPostBySlug{
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
  getToolPageBySlug: (slug: string) => `query GetToolPageBySlug{
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
    }
  }
}`,
  getLegalPageBySlug: (slug: string) => `query GetPageBySlug {
  legalPage(id: "${slug}", idType: SLUG) {
    title
    content
    date
  }
}
`
}

export const getBlogs = async (n: number): Promise<any[] | []> => {
  try {
    const data: any = await wpFetch(queries.getBlogs(n));
    return data?.posts?.nodes || []
  } catch (error) {
    return []
  }
}
export const getBlogSlugs = async ():Promise<{slug:string}[] | []> =>{
  try {
    const data: any = await wpFetch(queries.getBlogSlugs());
    return data?.posts?.nodes || []
  } catch (error) {
    return []
  }
} 
export const getBlogBySlug = async (slug: string) =>{
  try {
    const data: any = await wpFetch(queries.getBlogBySlug(slug));
    return data?.post || null
  } catch (error) {
    return null
  }
} 

export const getFaqs = async (): Promise<any[] | []> => {
  try {
    const data: any = await wpFetch(queries.getFaqs());
    return data?.faqs?.nodes || []
  } catch (error) {
    return []
  }
}
export const getToolPageBySlug = async (slug: string) => {
  try {
    const data: any = await wpFetch(queries.getToolPageBySlug(slug));
    return data?.toolPage || null
  } catch (error) {
    return null
  }
}
export const getLegalPageBySlug = async (slug: string) => {
  try {
    const data: any = await wpFetch(queries.getLegalPageBySlug(slug));
    return data?.legalPage || null
  } catch (error) {
    return null
  }
} 