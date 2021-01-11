import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    function likePost() {
        console.log('Like post!');
    }
    function commentOnPost() {
        console.log('Comment on post!');
    }
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
                <Button as='div' labelPosition='right' size="mini" onClick={likePost}>
                    <Button color='red' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color="pink" pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' size="mini" onClick={commentOnPost}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color="blue" pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

export default PostCard;