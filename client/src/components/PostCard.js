import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const PostCard = ({
    post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) => {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton post={{ id, likes, likeCount }} user={user} />

                <Button as={Link} to={`/posts/${id}`} labelPosition="right">
                    <Button color="blue">
                        <Icon name="comments" style={{ margin: 0 }} />
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>

                {user && user.username === username && (
                    <Button
                        as="div"
                        color="red"
                        onClick={() => console.log("delete post")}
                        floated="right"
                    >
                        <Icon name="trash" style={{ margin: 0 }} />
                    </Button>
                )}
            </Card.Content>
        </Card>
    );
};

export default PostCard;
