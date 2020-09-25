import Nav from "../components/nav";
import { getWhyNextReasons } from "../lib/api";

export default function IndexPage({ reasons }) {
  return (
    <div>
      <Nav />
      <div className="container mx-auto py-20 px-8">
        <h1 className="text-5xl text-center text-accent-1 mb-16">
          Why Next.js?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons
            .slice(0, reasons.length - 1)
            .map(({ title, description, href }) => (
              <a
                className="border border-grey-200 rounded p-4 hover:shadow-lg hover:border-transparent"
                key={title}
                href={href}
                target="_blank"
              >
                <h3 className="font-bold mb-2">{title}</h3>
                <div dangerouslySetInnerHTML={{ __html: description }} />
                <span className="text-blue-600 hover:text-blue-400 hover:underline mt-4 block">
                  Documentation →
                </span>
              </a>
            ))}
        </div>
        <div className="text-center mt-8">
          {reasons.slice(reasons.length - 1).map(({ title, description }) => (
            <div className="markdown inline-p">
              <strong>{title}</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const reasons = await getWhyNextReasons();

  return {
    props: {
      reasons,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
