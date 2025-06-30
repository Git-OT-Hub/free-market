import Link from "../Link/Link";
import { StyledContent, StyledImage, StyledName, StyledText } from "./StyledItemParts";

type ItemPartsProps = {
    id: number,
    name: string,
    image: string,
    sold_at: string,
};

const ItemParts: React.FC<ItemPartsProps> = ({ id, name, image, sold_at }) => {
    const imageUrl = "http://localhost:80/storage/";

    return (
        <StyledContent>
            <StyledImage>
                <img src={imageUrl + image} alt="item img" />
            </StyledImage>
            <StyledName>
                <Link
                    to={`/item/${id}`}
                    text={name}
                    $color="#000000"
                />
            </StyledName>
            {sold_at && (
                <StyledText>
                    <span>Sold</span>
                </StyledText>
            )}
        </StyledContent>
    );
};

export default ItemParts;