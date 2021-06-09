import React from "react";

let CopySection = ({ heading, containerSize, isCentered }) => {
  let sectionClass = "copy-section";
  sectionClass = containerSize ? sectionClass + ` ${containerSize}` : null;
  sectionClass = isCentered ? sectionClass + " centered" : null;

  return (
    <section class={sectionClass}>
      <div class="content">{heading.length && <h1>{heading}</h1>}</div>
    </section>
  );
};

export default CopySection;
