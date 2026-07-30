import IceCreamCard from "../components/IceCreamCard";

const SAMPLE_ICE_CREAMS = [
  { name: "Caramel Pecan", emoji: "🌰", description: "Buttered pecans swirled into rich caramel ice cream." },
  { name: "Matcha Dream", emoji: "🍵", description: "Earthy matcha with a hint of white chocolate." },
  { name: "Strawberry Swirl", emoji: "🍓", description: "Fresh strawberry ribbons in a creamy vanilla base." },
  { name: "Choco Lava", emoji: "🍫", description: "Dark chocolate ice cream with a molten fudge center." },
  { name: "Mango Tango", emoji: "🥭", description: "Tropical mango sorbet with a citrus twist." },
  { name: "Blueberry Bliss", emoji: "🫐", description: "Wild blueberries blended into smooth cheesecake ice cream." },
  { name: "Mint Choco Chip", emoji: "🌿", description: "Cool mint ice cream loaded with chocolate chips." },
  { name: "Vanilla Bean", emoji: "🌼", description: "Classic Madagascar vanilla bean, simple and rich." },
];

function Dashboard() {
  return (
    <div className="flex flex-row flex-wrap">
      {SAMPLE_ICE_CREAMS.map((item) => (
        <div className="p-10" key={item.name}>
          <IceCreamCard {...item} />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
