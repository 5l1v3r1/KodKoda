import React, { useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import { useFormik } from "formik";
import { EditorState, convertToRaw } from "draft-js";
import TextField from "@material-ui/core/TextField";
import { editorValidationSchema, editorValidations } from "../../../utils/form";

import BetterEditor from "./BetterEditor";
import FormatPopover from "./FormatPopover";
import Tags from "./LanguageSelector";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  error: {
    color: theme.palette.secondary.main
  },
  title: {
    fontSize: 36,
    fontFamily: "Hind, sans-serif",
    fontWeight: 700,
  },
  rightTitle: {
    lineHeight: "29px",
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  postContainer: {},
  postGridContainer: {
    marginTop: 20,
  },
  editorContainer: {
    minHeight: 200,
  },
  leftColumnContainer: {
    maxWidth: 120,
  },
  editorText: {
    marginTop: 5,
    fontSize: 18,
    lineHeight: 1.5,
  },
  buttons: {
    marginTop: -6,
    marginLeft: 4,
  },
  postButton: {
    //background: theme.palette.secondary.main, //'linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)',
    borderRadius: 3,
    boxShadow: "none",
    border: 0,
    fontSize: 20,
    fontWeight: 600,
    color: "white",
    height: 24,
    padding: 20,
  },
  postButtonGrid: {
    marginTop: 20,
  },
  languageButton: {
    background:
      "linear-gradient(45deg, var(--background-start) 30%, var(--background-end) 90%)",
    borderRadius: 3,
    boxShadow: "none",
    border: 0,
    fontSize: 14,
    fontWeight: 600,
    height: 24,
    padding: "0 10px",
  },
  textFieldItem: {
    marginBottom: 20,
  },
}));

const EditorArea = (props) => {
  const classes = useStyles();
  const editorRef = useRef(null);

  const onEditorSubmit = (values) => {
    const qData = {
      title: values.title,
      body: values.bodyText,
      languages: values.languages,
      userId: props.userId,
      userName: props.userName
    };
    // ADD CLIENT VALIDATIONS HERE WITH YUP
    
    fetch("/api/soru/post", {
      method: "POST",
      body: JSON.stringify(qData),
    }).then((res) => res.json());
    
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      bodyText: {blocks:[{text:""}]},
      languages: []
    },
    validationSchema: editorValidationSchema,
    onSubmit: onEditorSubmit,
  });

  const handleTagsChange = (evt, val) => {
    evt.preventDefault()
    console.log(val)
  }

  return (
    <Grid container direction="row" spacing={1} wrap="nowrap">
      <Grid
        item
        direction="column"
        alignItems="left"
        xs={12}
        md={1}
        className={classes.buttons}
      >
        <Grid item>
          <CreateIcon className={classes.voteMore} />
        </Grid>
        <Grid item>
          <Typography className={classes.voteCount}></Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="column"
            className={classes.editorContainer}
          >
            <Grid item className={classes.textFieldItem}>
              <TextField
                id="title"
                name="title"
                color="secondary"
                value={formik.values.title}
                placeholder={"Buraya başlığınızı yazın .."}
                onChange={formik.handleChange}
                inputProps={{ style: { fontSize: 20, fontWeight: 600 } }}
                fullWidth
              />
              {formik.errors.title ? <div className={classes.error}>{formik.errors.title}</div> : null}
            </Grid>
            <Grid item>
              <BetterEditor
                forwardRef={editorRef}
                label={"Buraya sorunuzu yazın..."}
                handleChange={formik.setFieldValue}
              />
              {formik.errors.bodyText ? (formik.errors.bodyText.blocks[0].text ? <div className={classes.error}>{formik.errors.bodyText.blocks[0].text}</div> : null) : null}
            </Grid>
            <Grid>
              <Tags values={formik.values.languages} handleChange={formik.setFieldValue}/>
              {formik.errors.languages? <div className={classes.error}>{formik.errors.languages}</div> : null}
            </Grid>
            <Grid item align="right" className={classes.postButtonGrid}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
                disabled={!formik.isValid}
                className={classes.postButton}
              >
                Paylaş
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12} md={2} className={classes.leftColumnContainer}>
        <Grid container direction="column">
          <Grid item>
            <FormatPopover />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditorArea;
