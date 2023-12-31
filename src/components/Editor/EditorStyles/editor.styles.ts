import * as stylex from "@stylexjs/stylex";

export const editorStyles = stylex.create({
  container: {
    position: "relative",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  editor: {
    outline: "none",
  },
});

export const editorToolbarStyles = stylex.create({
  container: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderStyle: "solid",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },

  actionButton: {
    display: "inline-block",
    marginRight: 10,
    cursor: "pointer",
  },

  activeButton: {
    fontWeight: "bold",
  },
});

export const placeHolderStyle = stylex.create({
  container: {
    position: "absolute",
    top: 100,
    left: 24,
    color: "#777",
  },
});
