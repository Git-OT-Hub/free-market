import type { Item } from "../../types/stateType";
import ItemParts from "../ItemParts/ItemParts";
import { StyledContent } from "./StyledRecommendation";

type RecommendationProps = {
    items: Item[],
};

const Recommendation: React.FC<RecommendationProps> = ({ items }) => {

    return (
        <StyledContent>
            {items.map((item) => {
                return (
                    <ItemParts
                        key={item.id}
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