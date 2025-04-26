export default function WpoPageTitle({ title, subtitle1, subtitle2 }) {
  const renderSubtitles = () => {
    if (!subtitle1 && !subtitle2) return null;

    return (
      <ol className="wpo-breadcumb-wrap">
        {subtitle1 && (
          <li>
            <span>{subtitle1}</span>
          </li>
        )}
        {subtitle2 && (
          <li>
            <span>{subtitle2}</span>
          </li>
        )}
      </ol>
    );
  };

  return (
    <section className="wpo-page-title">
      <div className="container">
        <div className="row">
          <div className="col col-xs-12">
            <div className="wpo-breadcumb-wrap">
              <h2>{title}</h2>
              {renderSubtitles()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
