import Layout from "@/components/layout/Layout.jsx";
import PageMeta from "@/components/common/PageMeta.jsx";
import PageHero from "@/components/common/PageHero.jsx";
import Button from "@/components/common/Button.jsx";
import BtnRow from "@/components/common/BtnRow.jsx";

/** Not part of the original static site (every real page has a route) -
 * a plain 404 for anything else, styled with the same page-hero the rest
 * of the site uses rather than an unstyled browser default. */
export default function NotFound() {
  return (
    <Layout topbar="Now onboarding tax preparers for the upcoming filing season">
      <PageMeta title="Page not found - GHLevelUp" description="This page doesn't exist." noIndex />
      <PageHero crumb="Not found" title="That page doesn't exist" center lede="Let's get you back on track.">
        <BtnRow center style={{ marginTop: 32 }}>
          <Button to="/" variant="accent" icon="arrowRight">
            Back to home
          </Button>
        </BtnRow>
      </PageHero>
    </Layout>
  );
}
