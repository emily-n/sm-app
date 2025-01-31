import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import { Button, Card, Grid, Image, Icon, Label, Form } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

function SinglePost(props) {
    const { user } = useContext(AuthContext);
    const postId = props.match.params.postId;
    const [comment, setComment] = useState('');
    const commentInputRef = useRef(null);

    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback() {
        props.history.push('/');
    }

    let postMarkup;

    if (!getPost) {
        postMarkup = <p>Loading post..</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row style={{margin:10}}>
                    <Grid.Column width={2}>
                        <Image
                            src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                            size="tiny"
                            float="right" />
                    </Grid.Column>
                    <Grid.Column width={12} className="border">
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <MyPopup content="Comment on post">
                                    <Button as="div" labelPosition="right" onClick={() => console.log("Comment on post")}>
                                        <Button basic color="blue">
                                            <Icon name='comments' />
                                        </Button>
                                        <Label basic color="blue" pointing='left'>{commentCount}</Label>
                                    </Button>
                                </MyPopup>
                                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input type="text" placeholder="Comment.." name="comment" value={comment}
                                                ref={commentInputRef} onChange={event => setComment(event.target.value)} />
                                            <button type="submit" className="ui button teal"
                                                disabled={comment.trim() === ''} onClick={submitComment}>
                                                Submit
                                    </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                    {user && user.username === comment.username &&
                                        <DeleteButton postId={id} commentId={comment.id} />}
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;

}

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;


const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

export default SinglePost;