import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Segment} from 'semantic-ui-react';
import PostCard from '../components/PostCard';

function Home() {
    const {
        loading,
        data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
    console.log(posts);

    return (
        <Grid columns={1} padded>
            <Grid.Row className="page-title">
                <h1 style={{paddingBottom: 20}}>
                    Recent Posts
                </h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading posts..</h1>
                ) : (
                        posts &&
                        posts.map((post) => (
                            <Grid.Column key={post.id} style={{ margin: 15, padding: 6}} color='grey'>
                                <PostCard post={post}/>
                            </Grid.Column>
                        ))
                    )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            username
            createdAt
            likeCount
            likes {
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default Home; 
