import type { ItemType } from "../../types/stateType";
import ItemParts from "../ItemParts/ItemParts";
import { StyledContent } from "./StyledRecommendation";

type RecommendationProps = {
    items: ItemType[],
};

const Recommendation: React.FC<RecommendationProps> = ({ items }) => {

    return (
        <StyledContent>
            {items.map((item) => {
                return (
                    <ItemParts
                        key={item.id}
                        url={`/item/${item.id}`}
                        name={item.name}
                        image={item.image}
                        sold_at={item.sold_at}
                    />
                );
            })}
        </StyledContent>
    );
};

export default Recommendation;