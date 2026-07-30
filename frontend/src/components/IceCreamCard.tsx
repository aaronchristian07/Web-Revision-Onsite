import { formatIDR } from "../lib/format";

type IceCreamCardProps = {
    name: string;
    description: string;
    price: number;
    emoji?: string;
    image?: string;
    onViewDetail?: () => void;
    onAddToCart?: () => void;
};

function IceCreamCard({ name, description, price, emoji = "🍦", image, onViewDetail, onAddToCart }: IceCreamCardProps) {
    return (
        <div className="group relative h-80 w-full perspective-[1000px]">
            <div className="absolute duration-1000 w-full h-full transform-3d group-hover:transform-[rotateX(180deg)]">
                <button
                    type="button"
                    onClick={onViewDetail}
                    className="absolute w-full h-full rounded-xl bg-linear-to-br from-pink-500 to-purple-500 p-6 text-white backface-hidden overflow-hidden text-left cursor-pointer"
                >
                    {image && (
                        <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover -z-10" />
                    )}
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start">
                            <div className="text-3xl font-bold">{name}</div>
                            <div className="text-5xl">{emoji}</div>
                        </div>
                        <div className="mt-auto">
                            <p className="text-lg font-semibold">{formatIDR(price)}</p>
                            <p className="text-sm opacity-75">Hover to flip!</p>
                        </div>
                    </div>
                </button>

                <div className="absolute w-full h-full rounded-xl bg-linear-to-br from-purple-500 to-purple-700 p-6 text-white transform-[rotateX(180deg)] backface-hidden">
                    <div className="flex flex-col h-full">
                        <div className="text-2xl font-bold mb-4">{name}</div>
                        <div className="grow">
                            <p className="text-lg">{description}</p>
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                            {onAddToCart ? (
                                <button
                                    type="button"
                                    onClick={onAddToCart}
                                    className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <span />
                            )}
                            <span className="text-3xl">✨</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IceCreamCard;
