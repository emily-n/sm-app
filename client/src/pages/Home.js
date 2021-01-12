import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Grid, Segment} from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
    const { user } = useContext(AuthContext);
    const {
        loading,
        data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={1} padded>
            <Grid.Row className="page-title">
                <h1 style={{paddingBottom: 20}}>
                    Recent Posts
                </h1>
            </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
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
    );
}

export default Home; 
