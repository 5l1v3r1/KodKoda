import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import palette from "./palette";
import typography from "./typography";

// Create a theme instance.
const theme = createMuiTheme({
  shape: {
    borderRadius: 14,
  },
  overrides: {
    MUIRichTextEditor: {
      root: {
        color: palette.text.primary,
      },
      container: {
        margin: 0,
        padding: 0,
        borderRadius: 2,
        backgroundColor: "#333d69",
        toolbar: {},
      },
      editor: {
        //height: 200,
        minHeight: 200,
        padding: 10,
        lineHeight: 1.5,
        backgroundColor: "#333d69",
        borderBottom: "1px solid gray",
        fontSize: 18,
      },
      editorContainer: {
        height: "100%",
        margin: 0,
        padding: 10,
        '& div[class^="CodeBlock-root-"]': {
          color: palette.text.primary,
          borderRadius: 2,
          backgroundColor: "#4C5B9C",
        },
      },
      toolbar: {
        borderBottom: "1px solid #ccc",
        padding: "5px",
      },
    },
    MuiIconButton: {
      root: {
        color: "#fff",
        "&:hover": {
          color: "#ccc",
        },
      },
    },
  },
  palette,
  typography,
});

export default theme;
