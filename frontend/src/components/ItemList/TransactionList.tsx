import { StyledContent } from "./StyledTransactionList";
import type { ItemType } from "../../types/stateType";
import ItemParts from "../ItemParts/ItemParts";

type TransactionListProps = {
    transactionList: ItemType[];
};

const TransactionList: React.FC<TransactionListProps> = ({ transactionList }) => {

    return (
        <StyledContent>
            {transactionList.map((item) => {
                return (
                    <ItemParts
                        key={item.id}
                        url={`/transaction/${item.id}`}
                        name={item.name}
                        image={item.image}
                        sold_at={item.sold_at}
                    />
                );
            })}
        </StyledContent>
    );
};

export default TransactionList;