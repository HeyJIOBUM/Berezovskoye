import TextWithLines from "@/components/TextWithLines";
import ProductDetails from "@/components/ProductDetails";
import {TestProducts} from "@/items/TestProducts";

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default async function Page({ params } : ProductPageProps) {
    const productId = (await params).id;
    const product = TestProducts()[+productId-1];

    return (
        <div className="flex w-full max-w-screen-lg flex-col gap-2 py-2 sm:gap-4 sm:py-4">
            <TextWithLines text={"Подробнее о товаре"}/>
            <ProductDetails product={product}/>
        </div>
    );
}