import type { ItemType } from "../../types/stateType";
import ItemParts from "../ItemParts/ItemParts";
import { StyledContent } from "./StyledPurchaseList";

type PurchaseListProps = {
    purchaseList: ItemType[],
};

const PurchaseList: React.FC<PurchaseListProps> = ({ purchaseList }) => {

    return (
        <StyledContent>
            {purchaseList.map((item) => {
                return (
                    <ItemParts
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        sold_at={item.sold_at}
                    />
                );
            })}
        </StyledContent>
    );
};

export default PurchaseList;