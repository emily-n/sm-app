import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image} from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import { AuthContext } from '../context/auth';
import MyPopup from '../util/MyPopup';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='tiny'
                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <MyPopup content="Comment on post">
                    <Button labelPosition='right' size="mini" as={Link} to={`/posts/${id}`}>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color="blue" pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    );
}

export default PostCard;