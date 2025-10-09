import PhotographyClass from '@/templates/photographyClass/PhotographyClass'

function PublicSite({ subdomain }) {
  console.log("🚀 ~ PublicSite ~ subdomain:", subdomain)

  // fetch the website data with the subdomain prop

  return (
    // from switch case render corresponding Template Component through website.baseTemplate.templateName and pass website data
    <PhotographyClass />
  )
}

export default PublicSite
