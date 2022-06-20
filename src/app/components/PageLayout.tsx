import PageHeader from "./PageHeader";
import PageTitle from "./PageTitle";

interface IPageLayout {
  component: React.ReactNode;
  title: string;
}

function PageLayout({ component, title }: IPageLayout) {
  return (
    <div className="page-layout">
      <div className="page-layout__header">
        <PageHeader />
        <PageTitle title={title} />
      </div>
      <div className="page-layout__content p-4">
        {component}
      </div>
      <div className="page-layout__footer">
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default PageLayout;
