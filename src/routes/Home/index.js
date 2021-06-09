import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import CopySection from "../../layouts/CopySection";
import CopyAssetSection from "../../layouts/CopyAssetSection";

let Home = ({}) => {
  return (
    <div className="route route-home">
      <CopySection heading="Hi, welcome to AudreyEnjoys!" containerSize="medium" isCentered={true}></CopySection>
      <CopyAssetSection
        assetUrl="./og-image.png"
        isCentered={true}
        paragraphs={[
          "My name is Audrey, and this is where I will be sharing my favorite hobbies. For right now, I will be sharing all of my favorite recipes here and on my Instagram.",
          "A little about me! My cooking journey has had a few influences. Growing up, my mom was a fantastic cook and is my mom's love language. Anytime there was a special event, she would make a fantastic dinner typically attended by 10 - 15 of our friends and neighbors. This has influenced me to love sharing my food with others today.",
          "Another influence on my cooking journey was my different dietary restrictions. When I was a young child I was diagnosed as lactose intolerant. In high school, I found out that I am gluten intolerant. Finally, in college, I started watching documentaries about plant-based diets. My favorite food is crab legs, which is why I decided a pescatarian diet would fit my lifestyle.",
          "In college, my diet was primarily plant-based, and gluten-free which can be expensive. This is when I started to dip my toes into the cooking world. I came up with a few recipes that I loved and started to roast many veggies. Once I had three dishes I could rotate, I did not push myself to continue growing my skills.",
          "The start of COVID-19 lockdown was when my journey started to progress a lot faster because I no longer was working. I had so much time, which I started making foods I had never attempted before. Cooking food became more of a hobby for me, that I also can eat. I also decided to add dairy back into my diet slowly, which made me even more excited about cooking at home.",
          "I can be contacted through email at me@audreyenjoys.com or DM me on my Instagram @audreyenjoys.",
        ]}
        mainCTA="/recipes"
      ></CopyAssetSection>
    </div>
  );
};

export default Home;
