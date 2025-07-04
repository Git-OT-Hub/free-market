import type { ItemType } from "../../types/stateType";
import ItemParts from "../ItemParts/ItemParts";
import { StyledContent } from "./StyledMyList";

type MyListProps = {
    myList: ItemType[],
};

const MyList: React.FC<MyListProps> = ({ myList }) => {

    return (
        <StyledContent>
            {myList.map((item) => {
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

export default MyList;