import { copy, profile, stackGroups } from "@/data/profile";

export function StackSection() {
  return (
    <section className="stack-section content-section" id="skills" aria-labelledby="stack-title">
      <div className="section-shell stack-section__layout">
        <div className="stack-section__head">
          <div className="section-marker">
            <span className="section-marker__number">{copy.stackEyebrow.split(" /")[0]}</span>
            <span>{copy.stack}</span>
          </div>
          <div className="stack-section__heading">
            <p className="eyebrow">{copy.stackEyebrow}</p>
            <h2 id="stack-title">{copy.stackTitle}</h2>
          </div>
          <p className="stack-section__note">{profile.techSummary}<br />{profile.experienceYears} years in frontend</p>
        </div>

        <div className="stack-index" role="list" aria-label="Technologies and tools">
          {stackGroups.map((group, index) => (
            <div className="stack-index__row" key={group.id} role="listitem">
              <span className="stack-index__number" aria-hidden="true">0{index + 1}</span>
              <h3>{group.title}</h3>
              <ul className="stack-index__items">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
