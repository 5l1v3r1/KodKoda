import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { makeStyles } from "@material-ui/core/styles";
import PostAnswer from "./PostAnswer";
import containsUrl from "../../utils/utilFunctions";

//import fetch from 'isomorphic-unfetch';

const useStyles = makeStyles((theme) => ({
  answersContainer: {
    marginTop: 20,
    //minHeight: 200,
  },
}));

const PostAnswers = (props) => {
  const classes = useStyles();
  const { data } = props;
  return (
    <Grid
      container
      direction="row"
      spacing={1}
      className={classes.answersContainer}
    >
      <Grid item xs={3} md={1}></Grid>
      <Grid item container xs={12} md={9}>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          spacing={3}
          className={classes.answersContainer}
        >
          {data.map((e, i) => {
            return (
              <Grid key={i} item>
                <PostAnswer
                  data={e}
                  postId={e.id}
                  reaction={props.reaction[i]}
                  reactionUpvoteHandler={props.reactionUpvoteHandler}
                  index={i}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs md={2}></Grid>
    </Grid>
  );
};

export default PostAnswers;
