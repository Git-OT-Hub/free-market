import type { ItemType } from "../../types/stateType";
import ItemParts from "../ItemParts/ItemParts";
import { StyledContent } from "./StyledExhibitList";

type ExhibitListProps = {
    exhibitList: ItemType[],
};

const ExhibitList: React.FC<ExhibitListProps> = ({ exhibitList }) => {

    return (
        <StyledContent>
            {exhibitList.map((item) => {
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

export default ExhibitList;