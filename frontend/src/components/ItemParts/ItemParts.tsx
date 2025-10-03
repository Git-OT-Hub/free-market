import Link from "../Link/Link";
import { StyledContent, StyledImage, StyledName, StyledText, StyledUnreadCount } from "./StyledItemParts";

type ItemPartsProps = {
    url: string,
    name: string,
    image: string,
    sold_at: string,
    unread_count?: number,
};

const ItemParts: React.FC<ItemPartsProps> = ({ url, name, image, sold_at, unread_count }) => {
    const imageUrl = "http://localhost:80/storage/";

    return (
        <StyledContent>
            <StyledImage>
                <img src={imageUrl + image} alt="item img" />
                {unread_count !== undefined && unread_count > 0 && (
                    <StyledUnreadCount>
                        {unread_count}
                    </StyledUnreadCount>
                )}
            </StyledImage>
            <StyledName>
                <Link
                    to={url}
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