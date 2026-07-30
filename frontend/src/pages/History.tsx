import IceCreamCard from "../components/IceCreamCard";

const SAMPLE_ICE_CREAMS = [
  { name: "Caramel Pecan", emoji: "🌰", description: "Buttered pecans swirled into rich caramel ice cream." },
  { name: "Mango Tango", emoji: "🥭", description: "Tropical mango sorbet with a citrus twist." },
  { name: "Blueberry Bliss", emoji: "🫐", description: "Wild blueberries blended into smooth cheesecake ice cream." },
];

function History() {
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

export default History;
