import { StyledContent } from "./StyledTransactionList";
import type { TransactionType } from "../../types/stateType";
import ItemParts from "../ItemParts/ItemParts";

type TransactionListProps = {
    transactionList: TransactionType[];
};

const TransactionList: React.FC<TransactionListProps> = ({ transactionList }) => {

    return (
        <StyledContent>
            {transactionList.map((item) => {
                return (
                    <ItemParts
                        key={item.purchase.id}
                        url={`/transaction/${item.purchase.id}`}
                        name={item.name}
                        image={item.image}
                        sold_at={item.sold_at}
                        unread_count={item.unread_count}
                    />
                );
            })}
        </StyledContent>
    );
};

export default TransactionList;